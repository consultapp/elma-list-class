import { ProactorListNode } from './ProactorListNode'

const root = new ProactorListNode(
  'root',

  { item: { label: 'Root', type: 'checkbox', checked: true } },
  [
    new ProactorListNode(
      'child1',
      { item: { label: 'Child 1', type: 'checkbox', checked: true } },
      [
        new ProactorListNode('leaf1', {
          item: { label: 'Leaf 1', type: 'checkbox', checked: true },
        }),
        new ProactorListNode('leaf2', {
          item: { label: 'Leaf 2', type: 'checkbox', checked: true },
        }),
      ]
    ),
    new ProactorListNode(
      'child2',
      { item: { label: 'Child 2', type: 'checkbox', checked: true } },
      [
        new ProactorListNode(
          'child_2_1',
          { item: { label: 'Child 2_1', type: 'checkbox', checked: true } },
          [
            new ProactorListNode(
              'leaf4',
              {
                item: { label: 'Leaf 4', type: 'plain' },
              },
              [
                new ProactorListNode('leaf4', {
                  item: { label: 'Leaf 4', type: 'plain' },
                }),
                new ProactorListNode('leaf2', {
                  item: { label: 'Leaf 2', type: 'checkbox', checked: true },
                }),
              ]
            ),
            new ProactorListNode('leaf2', {
              item: { label: 'Leaf 2', type: 'checkbox', checked: true },
            }),
          ]
        ),
        new ProactorListNode('child_2_2', {
          item: { label: 'Child 2_2', type: 'checkbox', checked: true },
        }),
      ]
    ),
  ]
)

const container = document.createElement('ul')
container.appendChild(root.render())
document.body.appendChild(container)
