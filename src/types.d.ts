type ID = string

type TDataNode = {
  id: ID
  item: TListItem
  category?: TCategory
  children?: TDataNode[]
}

type TTreeNode = TDataNode & {
  _isCategory: boolean
}

type TCategory = {
  isExpanded?: boolean
}

type TListItem =
  | (PlainItem & { type: 'plain' })
  | (CheckboxItem & { type: 'checkbox' })
  | (AnchorItem & { type: 'anchor' })

interface BaseItem {
  label: string
}

type ItemListType = 'plain' | 'checkbox' | 'anchor'

interface PlainItem extends BaseItem {}

interface CheckboxItem extends BaseItem {
  checked?: boolean
  indeterminate?: boolean
}

interface AnchorItem extends BaseItem {
  href: string
}
