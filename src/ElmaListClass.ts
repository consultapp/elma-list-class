export class ElmaListClass {
  tree: TTreeNode[]
  element: HTMLElement | undefined
  rootNodes: ElmaListNode[] | undefined

  constructor(private root: Element | null, private data: TDataNode[]) {
    this.data.forEach((d) => this.buildTreeNodeFromDataNode(d))
    this.tree = this.data as TTreeNode[]
    this.element = document.createElement('div')
    this.rootNodes = this.tree.map((t) => new ElmaListNode(null, t))
    console.log('this.tree', this.tree)
  }
  render() {
    if (!this.root) throw new Error('root is not exist.')
    if (!this.rootNodes) throw new Error('rootNode is not exist.')
    if (this.element) this.root.append()
  }

  buildTreeNodeFromDataNode(data: TDataNode): TTreeNode {
    Object.assign(data, { isExpanded: false, type: this.getItemType(data) })
    console.log('data', data)
    data.children?.forEach((item) => {
      this.buildTreeNodeFromDataNode(item)
    })

    return data as TTreeNode
  }

  getItemType(item: TDataNode): TItemType {
    return 'children' in item ? 'category' : 'item'
  }

  remove() {
    if (this.element) {
      this.element.remove()
      delete this.element
    }
  }
}

class ElmaListNode {
  public element: HTMLUListElement | HTMLLIElement | undefined
  constructor(private root: ElmaListNode | null, private node: TTreeNode) {
    console.log('typeof root', typeof root)
  }
  render() {}
}
