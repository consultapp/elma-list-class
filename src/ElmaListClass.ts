export class ElmaListClass {
  tree: TTreeNode[]
  element = document.createElement('ul')
  rootNodes: ElmaListNode[]

  constructor(private data: TDataNode[]) {
    this.data.forEach((d) => this.buildTreeNodeFromData(d))
    this.tree = this.data as TTreeNode[]
    this.rootNodes = this.tree.map((t) =>
      t._isCategory
        ? new ElmaListNodeCategory(null, t)
        : new ElmaListNode(null, t)
    )
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

class ElmaListNode {
  public element: HTMLLIElement | undefined
  constructor(protected root: ElmaListNode | null, protected node: TTreeNode) {
    this.createDom()
    if (!this.node._isCategory) this.render()
  }

  render() {
    this.appendToRoot()
  }

  append(element: Element) {
    if (this.element) this.element.children[0].append(element)
  }

  appendToRoot() {
    if (this.root && this.element) this.root.append(this.element)
  }

  createDom() {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `
    <li class="nodeRoot">
          <div class="itemRoot" data-childrenWrapper="true">${this.node.name}</div>
      </li>
    `
    this.element = wrapper.children[0] as HTMLLIElement
  }

  remove() {
    if (this.element) {
      this.element.remove()
    }
  }
}

class ElmaListNodeCategory extends ElmaListNode {
  public children: ElmaListNode[] = []
  protected childrenWrapper: Element | undefined | null

  constructor(protected root: ElmaListNode | null, protected node: TTreeNode) {
    super(root, node)
    this.createChildrenNodes()
    this.render()
  }

  createChildrenNodes() {
    this.children = (this.node.children as TTreeNode[]).map((t) =>
      t._isCategory
        ? new ElmaListNodeCategory(this, t)
        : new ElmaListNode(this, t)
    )
  }

  append(element: Element) {
    if (this.element) {
      if (!this.childrenWrapper)
        this.childrenWrapper = this.element.querySelector(
          '[data-childrenWrapper="true"]'
        )
      this.childrenWrapper?.append(element)
    }
  }

  createDom() {
    if (this.element) this.element.remove()

    const wrapper = document.createElement('div')
    wrapper.innerHTML = `
    <li class="nodeRoot">
        <details>
          <summary> <checkbox>+/-</checkbox> ${this.node.name}</summary>
          <ul class="category" data-childrenWrapper="true"></ul>
        </details>
      </li>
    `
    this.element = wrapper.children[0] as HTMLLIElement
  }

  remove() {
    if (this.element) {
      this.element.remove()
      this.children?.forEach((c) => c.remove())
    }
  }
}
