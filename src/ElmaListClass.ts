import { ElmaListNode, ElmaListNodeCategory } from './ElmaListNode'

export class ElmaListClass {
  tree: TTreeNode[]
  element = this.createDomElement()
  rootNodes: ElmaListNode[]

  constructor(
    private data: TDataNode[],
    private className: string = 'nodeRoot'
  ) {
    this.data.forEach((d) => this.buildTreeNodeFromData(d))
    this.tree = this.data as TTreeNode[]
    this.rootNodes = this.tree.map((t) =>
      t._isCategory
        ? new ElmaListNodeCategory(null, t)
        : new ElmaListNode(null, t)
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
          list-style: disc;
        }
        .${this.className} details > summary {
          cursor: pointer;
        }
      </style>
    </li>`
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
