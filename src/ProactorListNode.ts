type NodeProps = {
  item: TListItem
}

export class ProactorListNode {
  // id: string
  label: string
  checked: boolean = false
  indeterminate: boolean
  parent: ProactorListNode | null
  private element: HTMLLIElement | null = null
  private checkboxElement: HTMLInputElement | null = null

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

  render(): HTMLLIElement {
    if (!this.element) {
      this.element = document.createElement('li')
      if (this.props.item.type === 'checkbox') this.#renderCheckbox()
      else if (this.props.item.type === 'plain') this.#renderPlain()

      // Рендерим детей
      if (this.children.length > 0) {
        const ul = document.createElement('ul')
        this.children.forEach((child) => ul.appendChild(child.render()))
        this.element.appendChild(ul)
      }
    }

    this.updateElementState()
    return this.element
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

  #renderCheckbox() {
    if (this.element) {
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

      // Собираем структуру
      this.element.appendChild(this.checkboxElement)
      this.element.appendChild(label)
    }
  }
  #renderPlain() {
    if (this.element) {
      const label = document.createElement('label')
      label.htmlFor = this.id
      label.textContent = this.label
      this.element.appendChild(label)
    }
  }
}
