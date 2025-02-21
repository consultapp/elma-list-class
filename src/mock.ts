export const mockData: TDataNode[] = [
  {
    id: '1',
    item: {
      name: '1 element',
      type: 'plain',
    },
  },
  {
    id: '2',
    category: { isExpanded: true },
    item: {
      name: '2 element',
      type: 'anchor',
      href: '#',
    },
    children: [
      {
        id: '2_0',
        item: {
          name: '2_0 element',
          type: 'plain',
        },
        children: [
          {
            id: '2_0_0',
            item: {
              name: '2_0_0 element',
              type: 'plain',
            },
          },
        ],
      },
      {
        id: '2_1',
        item: {
          name: '2_1 element',
          type: 'checkbox',
        },
        children: [
          {
            id: '2_1_0',
            item: {
              name: '2_1_0 element',
              type: 'checkbox',
            },
          },
          {
            id: '2_1_1',
            item: {
              name: '2_1_1 element',
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
      name: '3 element',
      type: 'checkbox',
    },
    category: {
      isExpanded: true,
    },
    children: [
      {
        id: '3_0',
        item: {
          name: '3_0 element',
          type: 'checkbox',
        },
        category: {
          isExpanded: true,
        },
        children: [
          {
            id: '3_0_0',
            item: {
              name: '3_0_0 element',
              type: 'checkbox',
            },
          },
          {
            id: '3_0_1',
            item: {
              name: '3_0_1 element',
              type: 'checkbox',
            },
          },
        ],
      },
      {
        id: '3_1',
        item: {
          name: '3_1 element',
          type: 'checkbox',
        },
      },
    ],
  },
  {
    id: '4',
    item: {
      name: '4 element',
      type: 'anchor',
      href: '#',
    },
  },
]
