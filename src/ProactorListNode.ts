type NodeProps = {
  item: TListItem
}

export class ProactorListNode {
  // id: string
  label: string
  checked: boolean = false
  indeterminate: boolean
  parent: ProactorListNode | null
  private element: HTMLLIElement = document.createElement('li')
  private checkboxElement: HTMLInputElement | null = null
  private details: HTMLDetailsElement = document.createElement('details')
  private summary = document.createElement('summary')

  constructor(
    public id: string,
    public props: NodeProps,
    public children: ProactorListNode[] = []
  ) {
    this.id = id
    this.label = props.item.label
    this.indeterminate = false
    this.children = children
    this.parent = null

    if (props.item.type === 'checkbox')
      this.checked = props.item.checked ?? true

    for (const child of children) {
      child.parent = this
    }
  }

  isCategory() {
    return Boolean(this.children.length)
  }

  render(): HTMLLIElement {
    if (this.isCategory()) {
      this.details.open = true
      this.details.appendChild(this.summary)
      this.element.appendChild(this.details)
    }

    if (this.props.item.type === 'checkbox') this.#renderCheckbox()
    else if (this.props.item.type === 'anchor') this.#renderAnchor()
    else if (this.props.item.type === 'plain') this.#renderPlain()

    // Рендерим детей
    if (this.children.length > 0) {
      const ul = document.createElement('ul')
      this.children.forEach((child) => ul.appendChild(child.render()))

      const mountPoint = this.isCategory() ? this.details : this.element
      mountPoint.appendChild(ul)
    }

    this.updateElementState()
    return this.element
  }

  #renderCheckbox() {
    if (this.element && this.props.item.type === 'checkbox') {
      this.checkboxElement = document.createElement('input')

      // Создаем элементы
      this.checkboxElement.type = 'checkbox'
      this.checkboxElement.id = this.id
      this.checkboxElement.addEventListener('change', () => {
        this.toggle()
        console.log('this', this)
      })

      const label = document.createElement('label')
      label.htmlFor = this.id
      label.textContent = this.label

      const mountPoint = this.isCategory() ? this.summary : this.element
      mountPoint.appendChild(this.checkboxElement)
      mountPoint.appendChild(label)
    }
  }
  #renderPlain() {
    if (this.element && this.props.item.type === 'plain') {
      const label = document.createElement('label')
      label.htmlFor = this.id
      label.textContent = this.label

      const mountPoint = this.isCategory() ? this.summary : this.element
      mountPoint.appendChild(label)
    }
  }

  #renderAnchor() {
    if (this.element && this.props.item.type === 'anchor') {
      const anchor = document.createElement('a')
      anchor.textContent = this.label
      anchor.href = anchor.href = this.props.item.href ?? ''
      anchor.target = anchor.href = this.props.item.target ?? ''

      const mountPoint = this.isCategory() ? this.summary : this.element
      mountPoint.appendChild(anchor)
    }
  }

  private updateElementState() {
    if (this.checkboxElement) {
      this.checkboxElement.checked = this.checked
      this.checkboxElement.indeterminate = this.indeterminate
    }
  }

  toggle() {
    if (this.children.length > 0) {
      const newState = !this.checked
      this.#setState(newState)
      this.#propagateToChildren(newState)
    } else {
      this.#setState(!this.checked)
    }
    this.#updateParentState()
    this.updateElementState()
  }

  #setState(newState: boolean) {
    this.checked = newState
    this.indeterminate = false
  }

  #propagateToChildren(state: boolean) {
    this.children.forEach((child) => {
      child.#setState(state)
      child.#propagateToChildren(state)
      child.updateElementState()
    })
  }

  #updateParentState() {
    let currentParent = this.parent
    while (currentParent) {
      const childrenStates = currentParent.children.map((child) => ({
        checked: child.checked,
        indeterminate: child.indeterminate,
      }))

      const allChecked = childrenStates.every(
        (s) => s.checked && !s.indeterminate
      )
      const anyChecked = childrenStates.some(
        (s) => s.checked || s.indeterminate
      )

      currentParent.checked = allChecked
      currentParent.indeterminate = !allChecked && anyChecked
      currentParent.updateElementState()

      currentParent = currentParent.parent
    }
  }
}
