type ID = string

type TDataNode = {
  id: ID
  // ... props ...
  name: string
  data?: TCheckBox | TAnchorItem | TPlainItem
  category?: TCategory
  children?: TDataNode[]
}

type TTreeNode = TDataNode & {
  _isCategory?: boolean
}

type TItemType = 'checkbox' | 'plain' | 'ahchor'

type TCategory = {
  isExpanded?: boolean
  // ... some data for category
}

type TCheckBoxItem = {
  type: TItemType['checkbox']
  selected: boolean
  indeterminate: boolean
}

type TPlainItem = {
  type: TItemType['plain']
}

type TAnchorItem = {
  type: TItemType['ahchor']
  href: string
  target?: '_blank'
}
