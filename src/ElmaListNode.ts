import { ElmaListItem } from './ElmaListItem.ts'

export class ElmaListNode {
  public element: HTMLLIElement | undefined
  protected item: ElmaListItem<TListItem> | undefined
  constructor(protected root: ElmaListNode | null, protected node: TTreeNode) {
    this.createDomElement()
    if (!this.node._isCategory) this.render()
  }

  render() {
    this.appendToRoot()
  }

  append(_: Element) {
    console.error('Метод append вызывается не на категории.')
  }

  appendToRoot() {
    if (this.root && this.element) this.root.append(this.element)
  }

  createDomElement() {
    this.getItem()
    const wrapper = document.createElement('div')
    wrapper.innerHTML = this.template
    this.element = wrapper.children[0] as HTMLLIElement
    this.element.append(this.item?.element ?? '')
  }

  getItem() {
    this.item = ElmaListItem.getItem(this.node.item)
  }

  get template() {
    return `<li class="nodeRoot"></li>`
  }

  remove() {
    if (this.element) {
      this.element.remove()
    }
  }

  destroy() {
    this.remove()
    this.element = undefined
    this.item = undefined
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
    const children = this.node.children ?? []
    this.children = (children as TTreeNode[]).map((t) =>
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
    this.getItem()

    const wrapper = document.createElement('div')
    wrapper.innerHTML = this.template
    this.element = wrapper.children[0] as HTMLLIElement
    this.element.querySelector('summary')?.append(this.item?.element ?? '')
  }

  get template() {
    return `
      <li class="nodeRoot">
          <details ${this.node.category?.isExpanded ? 'open' : ''}>
            <summary></summary>
            <ul class="category" data-childrenWrapper="true"></ul>
          </details>
        </li>
      `
  }

  remove() {
    if (this.element) {
      this.element.remove()
      this.children?.forEach((c) => c.remove())
    }
  }

  destroy() {
    this.remove()
    this.children.forEach((child) => child.destroy())
    this.children = []
    super.destroy()
  }
}
