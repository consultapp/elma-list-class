export const mockData: TDataNode[] = [
  {
    id: '1',
    item: {
      label: '1 element',
      type: 'plain',
    },
  },
  {
    id: '2',
    category: { isExpanded: true },
    item: {
      label: '2 element',
      type: 'anchor',
      href: '#',
    },
    children: [
      {
        id: '2_0',
        item: {
          label: '2_0 element',
          type: 'plain',
        },
        children: [
          {
            id: '2_0_0',
            item: {
              label: '2_0_0 element',
              type: 'plain',
            },
          },
        ],
      },
      {
        id: '2_1',
        item: {
          label: '2_1 element',
          type: 'checkbox',
          href: '#',
          target: '_blank',
          checked: true,
        },
        children: [
          {
            id: '2_1_0',
            item: {
              label: '2_1_0 element',
              type: 'checkbox',
              checked: true,
            },
          },
          {
            id: '2_1_1',
            item: {
              label: '2_1_1 element',
              type: 'checkbox',
              checked: true,
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
      label: '3 element',
      type: 'checkbox',
    },
    category: {
      isExpanded: true,
    },
    children: [
      {
        id: '3_0',
        item: {
          label: '3_0 element',
          type: 'checkbox',
        },
        category: {
          isExpanded: true,
        },
        children: [
          {
            id: '3_0_0',
            item: {
              label: '3_0_0 element',
              type: 'plain',
            },
            category: {
              isExpanded: true,
            },
            children: [
              {
                id: '3_0_0_0',
                item: {
                  label: '3_0_0_0 element',
                  type: 'checkbox',
                },
              },
              {
                id: '3_0_0_1',
                item: {
                  label: '3_0_0_1 element',
                  type: 'checkbox',
                },
              },
            ],
          },
        ],
      },
      {
        id: '3_1',
        item: {
          label: '3_1 element',
          type: 'checkbox',
          checked: true,
        },
      },
    ],
  },
  {
    id: '4',
    item: {
      label: '4 element',
      type: 'anchor',
      href: '#',
    },
  },
]
