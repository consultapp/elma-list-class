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
    wrapper.innerHTML = `
    <ul class="${this.className}">
      <style>
        ul, li{
          list-style: disc;
        }
      </style>
    </li>`
    return wrapper.children[0] as HTMLLIElement
  }

  render(root: Element | undefined | null) {
    this.appendChildren()
    if (!root) throw new Error('root is not exist.')
    if (this.element) root.append(this.element)
  }

  buildTreeNodeFromData(data: TDataNode): TTreeNode {
    Object.assign(data, { _isCategory: this.getIsCategory(data) })
    data.children?.forEach((item) => {
      this.buildTreeNodeFromData(item)
    })

    return data as TTreeNode
  }

  getIsCategory(item: TDataNode) {
    return 'children' in item
  }

  appendChildren() {
    this.element?.append(...this.rootNodes.map((r) => r.element ?? ''))
  }

  remove() {
    if (this.element) {
      this.element.remove()
    }
  }
}
