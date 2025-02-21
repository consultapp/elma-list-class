export class ElmaListItem<T extends TListItem> {
  public element: HTMLElement | undefined

  constructor(protected data: T, protected onCheckboxChange?: () => void) {
    this.createDomElement()
  }

  createDomElement() {
    if (this.element) this.element.remove()
    const wrapper = document.createElement('div')
    wrapper.innerHTML = this.template
    this.element = wrapper.children[0] as HTMLElement
  }

  get template(): string {
    return `<span>${this.data.name}</span>`
  }

  get itemData(): T {
    return this.data
  }

  static getItem(
    data: TListItem,
    onCheckboxChange?: () => void
  ): ElmaListItem<TListItem> {
    switch (data.type) {
      case 'plain':
        return new ElmaListItem(data, onCheckboxChange)
      case 'checkbox':
        return new ElmaListItemCheckbox(data, onCheckboxChange)
      case 'anchor':
        return new ElmaListItemAnchor(data, onCheckboxChange)
      default:
        return new ElmaListItem(data, onCheckboxChange)
    }
  }
}

export class ElmaListItemCheckbox extends ElmaListItem<CheckboxItem> {
  constructor(data: CheckboxItem, protected onCheckboxChange?: () => void) {
    super(data, onCheckboxChange)
  }

  createDomElement() {
    super.createDomElement()
    this.checkbox?.addEventListener('change', () => {
      this.toggle()
    })
  }

  toggle() {
    if (this.checkbox && 'checked' in this.checkbox) {
      this.data.checked = Boolean(this.checkbox.checked)
    }
    this.onCheckboxChange?.()
  }

  setAnalizedState(checkedCount: number, total: number) {
    this.data.checked = checkedCount === total
    this.data.indeterminate = checkedCount > 0 && checkedCount < total

    if (this.checkbox) {
      this.checkbox.checked = this.data.checked
      this.checkbox.indeterminate = this.data.indeterminate
    }
  }
  setState(checked: boolean) {
    this.data.checked = checked
    this.data.indeterminate = false

    if (this.checkbox) {
      this.checkbox.checked = this.data.checked
      this.checkbox.indeterminate = this.data.indeterminate
    }
  }

  get template(): string {
    return `
      <label>
        <input type="checkbox" ${this.data.checked ? 'checked' : ''} />
        ${this.data.name}
      </label>
    `
  }

  get checkbox(): HTMLInputElement | null {
    return (this.element?.children[0] as HTMLInputElement) ?? null
  }
}

class ElmaListItemAnchor extends ElmaListItem<AnchorItem> {
  createDomElement() {
    super.createDomElement()
    const anchor = this.element?.querySelector('a')
    if (anchor) {
      anchor.href = this.data.href
    }
  }

  get template(): string {
    return `<a href=" ${this.data.href}">${this.data.name}</a>`
  }
}
