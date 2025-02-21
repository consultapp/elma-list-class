import { Props } from './ElmaListClass.ts'
import { ElmaListItem, ElmaListItemCheckbox } from './ElmaListItem.ts'

export class ElmaListNode {
  public element: HTMLLIElement | undefined
  public item: ElmaListItem<TListItem> | undefined
  constructor(
    protected root: ElmaListNode | null,
    protected node: TTreeNode,
    protected props: Props = {
      marker: {
        open: '+',
        closed: '-',
      },
    }
  ) {
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
    // обновляем состояние детей
    if (
      this instanceof ElmaListNodeCategory &&
      this.item instanceof ElmaListItemCheckbox
    ) {
      console.log('onCheckboxChange childs', this.item?.itemData.checked)
      this.recursiveStateUpdate(
        Boolean((this.item?.itemData as CheckboxItem).checked)
      )
    }

    // обновляем состояние родителей
    if (this.root instanceof ElmaListNodeCategory) {
      console.log('onCheckboxChange parents')

      this.root.updateCheckboxState()
    }
  }

  getItem() {
    this.item = ElmaListItem.getItem(this.node.item, this.onCheckboxChange)
  }

  get template() {
    return `<li class="nodeRoot nodeRoot__single"></li>`
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

  constructor(
    protected root: ElmaListNode | null,
    protected node: TTreeNode,
    protected props: Props
  ) {
    super(root, node, props)
    this.createChildrenNodes()
    this.render()
  }

  updateCheckboxState() {
    console.log('updateCheckboxState', this.node.item.name)
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
    const checkboxes = this.getChildCheckboxItems()
    console.log('recursiveStateUpdate:', checked, checkboxes)
    checkboxes.forEach((c) => c.setState(checked))
  }

  private getChildCheckboxItems(): ElmaListItemCheckbox[] {
    const checkboxes: ElmaListItemCheckbox[] = []
    if (
      this.item instanceof ElmaListItemCheckbox &&
      this.item.checkbox?.checked
    ) {
      checkboxes.push(this.item)
    }
    this.children.forEach((child) => {
      if (child instanceof ElmaListNodeCategory) {
        checkboxes.push(...child.getChildCheckboxItems())
      } else if (child.item instanceof ElmaListItemCheckbox) {
        checkboxes.push(child.item)
      }
    })
    console.log('-->checkboxes', this.node.item.name, checkboxes)
    return checkboxes
  }

  createChildrenNodes() {
    const children = this.node.children ?? []
    this.children = (children as TTreeNode[]).map((t) =>
      t._isCategory
        ? new ElmaListNodeCategory(this, t, this.props)
        : new ElmaListNode(this, t, this.props)
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

    const detailsElement = this.element.querySelector('details')
    if (detailsElement) {
      detailsElement.open = this.node.category?.isExpanded ?? true
    }
  }

  get template() {
    return `
      <li class="nodeRoot">
          <details >
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
