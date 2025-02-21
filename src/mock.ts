export const mockData: TDataNode[] = [
  {
    id: '1',
    item: {
      name: '1 Lorem....',
      type: 'plain',
    },
  },
  {
    id: '2',
    category: { isExpanded: true },
    item: {
      name: '2 BUSINESS MODEL',
      type: 'anchor',
      href: '#',
    },
    children: [
      {
        id: '2_0',
        item: {
          name: '2_0 Элемент второго уровня 1',
          type: 'plain',
        },
        children: [
          {
            id: '2_0_0',
            item: {
              name: '2_0_0 Элемент третьего уровня 1',
              type: 'plain',
            },
          },
        ],
      },
      {
        id: '2_1',
        item: {
          name: '2_1 Элемент второго уровня 2',
          type: 'checkbox',
        },
        children: [
          {
            id: '2_1_0',
            item: {
              name: '2_1_0 Элемент третьего уровня 2_0',
              type: 'checkbox',
            },
          },
          {
            id: '2_1_1',
            item: {
              name: '2_1_1 Элемент третьего уровня 2_1',
              type: 'checkbox',
            },
          },
        ],
        category: {
          isExpanded: true,
        },
      },
    ],
  },
  {
    id: '3',
    item: {
      name: '3 SUPPLY',
      type: 'checkbox',
    },
    category: {
      isExpanded: true,
    },
    children: [
      {
        id: '3_0',
        item: {
          name: '3_0 Элемент 3_0',
          type: 'checkbox',
        },
        category: {
          isExpanded: true,
        },
        children: [
          {
            id: '3_0_0',
            item: {
              name: '3_0_0 Элемент 3_1',
              type: 'checkbox',
            },
          },
          {
            id: '3_0_1',
            item: {
              name: '3_0_1 Элемент уровня 3_2',
              type: 'checkbox',
            },
          },
        ],
      },
      {
        id: '3_1',
        item: {
          name: '3_1 Элемент уровня 4_0',
          type: 'checkbox',
        },
      },
    ],
  },
  {
    id: '4',
    item: {
      name: '4 SUPPLY2',
      type: 'anchor',
      href: '#',
    },
  },
]
