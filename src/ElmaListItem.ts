export class ElmaListItem<T extends TListItem> {
  public element: HTMLElement | undefined

  constructor(protected data: T) {
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

  static getItem(data: TListItem): ElmaListItem<TListItem> {
    switch (data.type) {
      case 'plain':
        return new ElmaListItem(data)
      case 'checkbox':
        return new ElmaListItemCheckbox(data)
      case 'anchor':
        return new ElmaListItemAnchor(data)
      default:
        return new ElmaListItem(data)
    }
  }
}

class ElmaListItemCheckbox extends ElmaListItem<CheckboxItem> {
  private checkbox: HTMLInputElement | null = null

  createDomElement() {
    super.createDomElement()
    this.checkbox =
      this.element?.querySelector('input[type="checkbox"]') || null
    this.checkbox?.addEventListener('change', () => this.toggle())
  }

  toggle() {
    if (this.checkbox) {
      this.data.checked = this.checkbox.checked
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
    return `<a>${this.data.name}</a>`
  }
}
