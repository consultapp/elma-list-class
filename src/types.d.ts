type ID = string

type TDataNode = {
  id: ID
  // ... props ...
  name: string
  children?: TDataNode[]
}

type TTreeNode = TDataNode & {
  type: TItemType
  data?: TCheckBox
  isExpanded?: boolean
}

type TItemType = 'checkbox' | 'item' | 'category'

type TCheckBox = {
  selected: boolean
}
