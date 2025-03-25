import { CheckboxNode } from './CheckBoxList'

const root = new CheckboxNode(
  'root',

  { item: { label: 'Root', type: 'checkbox', checked: true } },
  [
    new CheckboxNode(
      'child1',
      { item: { label: 'Child 1', type: 'checkbox', checked: true } },
      [
        new CheckboxNode('leaf1', {
          item: { label: 'Leaf 1', type: 'checkbox', checked: true },
        }),
        new CheckboxNode('leaf2', {
          item: { label: 'Leaf 2', type: 'checkbox', checked: true },
        }),
      ]
    ),
    new CheckboxNode(
      'child2',
      { item: { label: 'Child 2', type: 'checkbox', checked: true } },
      [
        new CheckboxNode(
          'child_2_1',
          { item: { label: 'Child 2_1', type: 'checkbox', checked: true } },
          [
            new CheckboxNode(
              'leaf4',
              {
                item: { label: 'Leaf 4', type: 'plain' },
              },
              [
                new CheckboxNode('leaf4', {
                  item: { label: 'Leaf 4', type: 'plain' },
                }),
                new CheckboxNode('leaf2', {
                  item: { label: 'Leaf 2', type: 'checkbox', checked: true },
                }),
              ]
            ),
            new CheckboxNode('leaf2', {
              item: { label: 'Leaf 2', type: 'checkbox', checked: true },
            }),
          ]
        ),
        new CheckboxNode('child_2_2', {
          item: { label: 'Child 2_2', type: 'checkbox', checked: true },
        }),
      ]
    ),
  ]
)

const container = document.createElement('ul')
container.appendChild(root.render())
document.body.appendChild(container)
