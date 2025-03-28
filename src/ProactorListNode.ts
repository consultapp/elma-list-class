type NodeProps = {
  item: TListItem
}

export class ProactorListNode {
  label: string
  checked: boolean = false
  indeterminate: boolean
  parent: ProactorListNode | null
  private element: HTMLLIElement = document.createElement('li')
  private checkboxElement: HTMLInputElement | null = null
  private details: HTMLDetailsElement = document.createElement('details')
  private summary = document.createElement('summary')
  private abortController: AbortController | null = null

  constructor(
    public id: string,
    public props: NodeProps,
    public children: ProactorListNode[] = [],
    private isExpanded: boolean = false
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
    this.#renderCategory()
    this.#renderItem()
    this.#renderChilds()

    this.updateElementState()
    return this.element
  }

  #renderChilds() {
    if (this.children.length > 0) {
      const ul = document.createElement('ul')
      this.children.forEach((child) => ul.appendChild(child.render()))
      const mountPoint = this.isCategory() ? this.details : this.element
      mountPoint.appendChild(ul)
    }
  }

  #renderCategory() {
    if (this.isCategory()) {
      this.details.open = this.isExpanded ?? true
      this.details.appendChild(this.summary)
      this.element.appendChild(this.details)
    }
  }

  #renderItem() {
    if (this.props.item.type === 'checkbox') this.#renderCheckbox()
    else if (this.props.item.type === 'anchor') this.#renderAnchor()
    else if (this.props.item.type === 'plain') this.#renderPlain()
  }

  #renderCheckbox() {
    if (this.element && this.props.item.type === 'checkbox') {
      this.checkboxElement = document.createElement('input')
      this.checkboxElement.className = 'elma_empty_fix'

      this.checkboxElement.type = 'checkbox'
      this.checkboxElement.id = this.id

      this.abortController = new AbortController()
      this.checkboxElement.addEventListener(
        'change',
        () => {
          this.toggle()
        },
        { signal: this.abortController.signal }
      )

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
      anchor.href = this.props.item.href ?? ''
      anchor.target = this.props.item.target ?? ''

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

  public uncheckAll(): void {
    this.traverse((node) => {
      node.checked = false
      node.indeterminate = false
      node.updateElementState()
    })

    this.traverse((node) => {
      node.#updateParentState()
    })
  }

  public checkAll(): void {
    this.traverse((node) => {
      node.checked = true
      node.indeterminate = false
      node.updateElementState()
    })

    this.traverse((node) => {
      node.#updateParentState()
    })
  }

  private traverse(callback: (node: ProactorListNode) => void): void {
    callback(this)
    for (const child of this.children) {
      child.traverse(callback)
    }
  }

  destroy() {
    if (this.abortController) this.abortController.abort()

    this.element.remove()
    this.details.remove()
    this.summary.remove()

    this.children.forEach((child) => child.destroy())

    this.element = null!
    this.checkboxElement = null
    this.details = null!
    this.summary = null!
    this.parent = null
    this.children = []
  }
}
