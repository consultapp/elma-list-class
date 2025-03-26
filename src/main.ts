import { mockData } from './mock'
import { ProactorListNode } from './ProactorListNode'

function convertHierarchy(nodes: TDataNode[]): ProactorListNode[] {
  return nodes.map((node) => {
    const props = {
      item: {
        ...node.item,
        ...(node.item.type === 'checkbox' && { checked: true }),
        ...(node.item.type === 'anchor' && { target: '_blank' }), // Пример автоматического добавления target
      },
    }

    const children = node.children ? convertHierarchy(node.children) : []

    return new ProactorListNode(
      node.id,
      props,
      children,
      node.category?.isExpanded
    )
  })
}

const proactorNodes: ProactorListNode[] = convertHierarchy(mockData)
const container = document.createElement('ul')
proactorNodes.forEach((r) => {
  container.appendChild(r.render())
})

document.body.appendChild(container)
