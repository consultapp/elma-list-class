import { ElmaListItem } from './ElmaListtem'

export class ElmaListNode {
  public element: HTMLLIElement | undefined
  protected item: ElmaListItem | undefined
  constructor(protected root: ElmaListNode | null, protected node: TTreeNode) {
    this.createDomElement()
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

  createDomElement() {
    this.getItem()
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `<li class="nodeRoot"></li>`
    this.element = wrapper.children[0] as HTMLLIElement
    this.element.append(this.item?.element ?? '')
  }

  getItem() {
    this.item = ElmaListItem.getItem(this.node.item)
  }

  remove() {
    if (this.element) {
      this.element.remove()
    }
  }
}

export class ElmaListNodeCategory extends ElmaListNode {
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

  createDomElement() {
    if (this.element) this.element.remove()
    this.getItem()

    const wrapper = document.createElement('div')
    wrapper.innerHTML = `
      <li class="nodeRoot">
          <details ${this.node.category?.isExpanded ? 'open' : ''}>
            <summary></summary>
            <ul class="category" data-childrenWrapper="true"></ul>
          </details>
        </li>
      `
    this.element = wrapper.children[0] as HTMLLIElement
    this.element.querySelector('summary')?.append(this.item?.element ?? '')
  }

  remove() {
    if (this.element) {
      this.element.remove()
      this.children?.forEach((c) => c.remove())
    }
  }
}
