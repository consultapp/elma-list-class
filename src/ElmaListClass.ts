import { ElmaListNode, ElmaListNodeCategory } from './ElmaListNode'

export type Props = {
  marker?: {
    open: string
    closed: string
  }
}

export class ElmaListClass {
  tree: TTreeNode[]
  element = this.createDomElement()
  rootNodes: ElmaListNode[]

  constructor(
    public data: TDataNode[],
    private className: string = 'nodeRoot',
    public props: Props = {
      marker: {
        open: '➕',
        closed: '➖',
      },
    }
  ) {
    this.data.forEach((d) => this.buildTreeNodeFromData(d))
    this.tree = this.data as TTreeNode[]
    this.rootNodes = this.tree.map((t) =>
      t._isCategory
        ? new ElmaListNodeCategory(null, t, props)
        : new ElmaListNode(null, t, props)
    )
  }

  createDomElement() {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = this.template
    return wrapper.children[0] as HTMLLIElement
  }

  render(root: Element): void {
    if (!(root instanceof Element)) {
      throw new Error('Invalid root element')
    }

    this.appendChildren()
    root.append(this.element)
  }

  buildTreeNodeFromData(data: TDataNode): TTreeNode {
    Object.assign(data, { _isCategory: this.isCategory(data) })
    data.children?.forEach((item) => {
      this.buildTreeNodeFromData(item)
    })

    return data as TTreeNode
  }

  private isCategory(item: TDataNode): boolean {
    return Array.isArray(item.children) && item.children.length > 0
  }

  private appendChildren(): void {
    const validElements = this.rootNodes
      .map((r) => r.element)
      .filter((el): el is HTMLLIElement => el !== undefined)

    if (validElements.length > 0) {
      this.element.append(...validElements)
    }
  }

  get template() {
    return `
    <ul class="${this.className}">
      <style>
        .${this.className} ul, li{
          list-style: none;
          margin:0;
        }
        .${this.className} details summary, 
        .${this.className} details summary::-webkit-details-marker {
          list-style: none;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .${this.className}  details > summary::before {
          content: "${this.props?.marker?.closed ?? '➕'}";
          margin-right: 8px;
        }
        .${this.className} details[open] > summary::before {
          content: "${this.props?.marker?.closed ?? '➖'}";

        }
        .${this.className} .nodeRoot__single{
          margin-left: 24px;
        }
        .${this.className} input {
          margin:0;
          cursor: pointer;
        }
      </style>
    </li>`
  }

  getChecked() {
    return this.tree.map((r) => ElmaListClass.getRecursiveChecked(r)).flat()
  }

  static getRecursiveChecked(node: TTreeNode): string[] {
    const result: string[] = []
    if (node.item.type === 'checkbox' && node.item.checked) {
      result.push(node.id)
    }

    if (node._isCategory) {
      node.children?.forEach((c) =>
        result.push(...ElmaListClass.getRecursiveChecked(c as TTreeNode))
      )
    }
    return result
  }

  remove() {
    this.element?.remove()
    this.element = null!
    this.rootNodes.forEach((n) => n.remove())
  }

  destroy(): void {
    this.rootNodes.forEach((node) => node.destroy())
    this.element.remove()
    this.tree = []
    this.rootNodes = []
  }
}
