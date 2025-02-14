export const mockData: TDataNode[] = [
  {
    id: '0194ef54-c39e-7a40-8dd4-0aaea4fa9051',
    item: {
      name: 'BUSINESS MODEL',
      type: 'anchor',
      href: '#',
    },
    children: [
      {
        id: '0194ef54-c39e-7a40-8dd4-0aaea4fa9052',
        item: {
          name: 'Элемент второго уровня 1',
          type: 'plain',
        },
        children: [
          {
            id: '0194ef54-c39e-7a40-8dd4-0aaea4fa9055',
            item: {
              name: 'Элемент третьего уровня 1',
              type: 'plain',
            },
          },
        ],
        category: {
          isExpanded: false,
        },
      },
      {
        id: '0194ef54-c39e-7a40-8dd4-0aaea4fa9053',
        item: {
          name: 'Элемент второго уровня 2',
          type: 'checkbox',
        },
        children: [
          {
            id: '0194ef54-c39e-7a40-8dd4-0aaea4fa9055',
            item: {
              name: 'Элемент третьего уровня 2_0',
              type: 'checkbox',
            },
          },
          {
            id: '0194ef54-c39e-7a40-8dd4-0aaea4fa9055',
            item: {
              name: 'Элемент третьего уровня 2_1',
              type: 'checkbox',
            },
          },
        ],
        category: {
          isExpanded: false,
        },
      },
    ],
  },
  {
    id: '0194ef55-9d98-7905-8055-2d4e1860ca08',
    item: {
      name: 'SUPPLY',
      type: 'checkbox',
    },
  },
  {
    id: '0194ef55-9d98-7905-8055-2d4e1860ca08',
    item: {
      name: 'SUPPLY2',
      type: 'anchor',
      href: '#',
    },
  },
]
