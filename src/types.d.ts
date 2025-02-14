type ID = string

type TDataNode = {
  id: ID
  item: TListItem
  category?: TCategory
  children?: TDataNode[]
}

type TTreeNode = TDataNode & {
  _isCategory?: boolean
}

type TCategory = {
  isExpanded?: boolean
}

type TListItem = TCheckBoxItem | TAnchorItem | TPlainItem

type TItemType = 'checkbox' | 'plain' | 'anchor'

type TCheckBoxItem = {
  type: 'checkbox'
  name: string
  selected?: boolean
  indeterminate?: boolean
}

type TPlainItem = {
  type: 'plain'
  name: string
}

type TAnchorItem = {
  type: 'anchor'
  name: string
  href: string
  target?: '_blank'
}
