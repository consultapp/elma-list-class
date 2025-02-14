export class ElmaListItem {
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

class ElmaListItemCheckbox extends ElmaListItem {
  createDomElement() {
    if (this.element) this.element.remove()
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `<label><input type="checkbox"  /> ${this.data.name}</label>`
    this.element = wrapper.children[0] as HTMLLIElement
  }
}

class ElmaListItemAnchor extends ElmaListItem {
  createDomElement() {
    const data = this.data as TAnchorItem
    if (this.element) this.element.remove()
    const wrapper = document.createElement('div')
    wrapper.innerHTML = `<a href="${data.href}"> ${data.name}</a>`
    this.element = wrapper.children[0] as HTMLLIElement
  }
}
