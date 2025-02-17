import { ElmaListItem, ElmaListItemCheckbox } from './ElmaListItem.ts'

export class ElmaListNode {
  public element: HTMLLIElement | undefined
  public item: ElmaListItem<TListItem> | undefined
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

  onCheckboxChange = () => {
    // обновляем состояние родителей
    if (this.root instanceof ElmaListNodeCategory) {
      console.log('onCheckboxChange parents')

      this.root.updateCheckboxState()
    }

    // обновляем состояние детей
    if (this instanceof ElmaListNodeCategory) {
      // console.log('onCheckboxChange childs', this.item?.itemData.checked)
      // this.recursiveStateUpdate(
      //   Boolean((this.item?.itemData as CheckboxItem).checked)
      // )
    }
  }

  getItem() {
    this.item = ElmaListItem.getItem(this.node.item, this.onCheckboxChange)
  }

  get template() {
    return `<li class="nodeRoot"></li>`
  }

  get _data() {
    return this.node
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

  updateCheckboxState() {
    console.log('updateCheckboxState')
    if (this.item instanceof ElmaListItemCheckbox) {
      const checkboxes = this.getChildCheckboxItems()
      const checkedCount = checkboxes.filter((c) => c.itemData.checked).length
      const total = checkboxes.length
      console.log('first', total, checkedCount, checkboxes)

      this.item.setAnalizedState(checkedCount, total)

      if (this.root instanceof ElmaListNodeCategory) {
        this.root.updateCheckboxState()
      }
    }
  }
  recursiveStateUpdate(checked: boolean) {
    // const checkboxes = this.getChildCheckboxes()
  }

  private getChildCheckboxItems(): ElmaListItemCheckbox[] {
    const checkboxes: ElmaListItemCheckbox[] = []
    this.children.forEach((child) => {
      if (child instanceof ElmaListNodeCategory) {
        checkboxes.push(...child.getChildCheckboxItems())
      } else if (child.item instanceof ElmaListItemCheckbox) {
        checkboxes.push(child.item)
      }
    })
    console.log('checkboxes', checkboxes)
    return checkboxes
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
