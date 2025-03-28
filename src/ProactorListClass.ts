import { ProactorListNode } from './ProactorListNode'

export type Props = {
  marker?: {
    open: string
    closed: string
  }
}

export class ProactorListClass {
  public element
  private rootNodes: ProactorListNode[]

  constructor(
    public data: TDataNode[],
    private className: string = 'nodeRoot',
    private props: Props = {
      marker: {
        open: '▶',
        closed: '▼',
      },
    }
  ) {
    this.element = this.createDomElement()
    this.rootNodes = this.convertHierarchy(data)
  }

  createDomElement() {
    const wrapper = document.createElement('div')
    wrapper.innerHTML = this.template
    const element = wrapper.children[0]
    if (!element || element.tagName !== 'UL') {
      throw new Error('Ошибка создания элемента')
    }
    return element as HTMLUListElement
  }

  render(root: Element): void {
    if (this.element && this.element.parentNode) {
      this.element.parentNode.removeChild(this.element)
    }

    if (!(root instanceof Element)) {
      throw new Error('Invalid root element')
    }

    this.appendChildren()
    root.append(this.element)
  }

  private appendChildren(): void {
    this.rootNodes.forEach((r) => {
      this.element.appendChild(r.render())
    })
  }

  get template() {
    return `
    <ul class="${this.className}">
      <style>
        .${this.className} ul, li{
          list-style: none;
          margin:0;
        }

        .${this.className} input[type="checkbox"]:checked {
          accent-color:rgb(161, 228, 162); 
          background: rgb(161, 228, 162); 
          border-color: rgb(161, 228, 162); 
        }

        .${this.className} input[type="checkbox"]:not(:checked) {
          filter: hue-rotate(150deg); 
          opacity: 0.8; 
        }

        .${this.className} li.no_children_item {
          margin-left: 24px;
        }

        .${this.className} details summary{
          min-height:1.5rem;
        }
        .${this.className} details summary,
        .${this.className} details summary::-webkit-details-marker {
          list-style: none;
          cursor: pointer;
          display: flex;
          align-items: center;
        }
        .${this.className}  details > summary::before {
          content: "${this.props?.marker?.open ?? '➕'}";
          margin-right: 8px;
          color:rgb(175, 207, 211);
        }
        .${this.className} details[open] > summary::before {
          content: "${this.props?.marker?.closed ?? '➖'}";

        }
        .${this.className} .nodeRoot__single{
          margin-left: 24px;
        }
        .${this.className} input {
          margin:0;
          margin-right:5px;
          cursor: pointer;
        }
      </style>
    </ul>`
  }

  convertHierarchy(nodes: TDataNode[]): ProactorListNode[] {
    return nodes.map((node) => {
      const props = {
        item: {
          ...node.item,
          ...(node.item.type === 'checkbox' && {
            checked: node.item.checked ?? false,
          }),
          ...(node.item.type === 'anchor' && { target: '_blank' }),
        },
      }

      return new ProactorListNode(
        node.id,
        props,
        node.children ? this.convertHierarchy(node.children) : [],
        node.category?.isExpanded
      )
    })
  }

  getChecked(nodes: ProactorListNode[] = this.rootNodes): string[] {
    return nodes.reduce((acc: string[], node) => {
      const isCheckedCheckbox =
        node.props.item.type === 'checkbox' && node.checked === true

      if (isCheckedCheckbox) {
        acc.push(node.id)
      }

      if (node.children.length > 0) {
        acc.push(...this.getChecked(node.children))
      }

      return acc
    }, [])
  }

  uncheckAll() {
    this.rootNodes.forEach((n) => n.uncheckAll())
  }

  checkAll() {
    this.rootNodes.forEach((n) => n.checkAll())
  }

  remove() {
    this.element?.remove()
    this.element = null!
    this.rootNodes.forEach((n) => n.destroy())
  }

  destroy(): void {
    if (this.element) {
      this.element.remove()
      this.element = null!
    }
    this.rootNodes.forEach((node) => node.destroy())
    this.rootNodes = []
  }
}
