export class ElmaListNode {
  public element: HTMLLIElement | undefined
  protected item: ListItem | undefined
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
    this.item = ListItem.getItem(this.node.item)
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
          <details open>
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

class ListItem {
  public element: Element | undefined
  constructor(protected data: TListItem) {
    this.createDomElement()
  }

  createDomElement() {
    if (this.element) this.element.remove()
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `<span> ${this.data.name}<span>`
    this.element = wrapper.children[0] as HTMLLIElement
  }

  static getItem(data: TListItem) {
    switch (data.type) {
      case 'plain':
        return new ListItem(data)
      case 'checkbox':
        return new ListItemCheckbox(data)
      case 'anchor':
        return new ListItemAnchor(data)
      default:
        return new ListItem(data)
    }
  }
}

class ListItemCheckbox extends ListItem {
  createDomElement() {
    if (this.element) this.element.remove()
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `<label><input type="checkbox"  /> ${this.data.name}</label>`
    this.element = wrapper.children[0] as HTMLLIElement
  }
}

class ListItemAnchor extends ListItem {
  createDomElement() {
    const data = this.data as TAnchorItem
    if (this.element) this.element.remove()
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `<a href="${data.href}"> ${data.name}</a>`
    this.element = wrapper.children[0] as HTMLLIElement
  }
}
