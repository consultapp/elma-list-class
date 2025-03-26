type ID = string

type TDataNode = {
  id: ID
  item: TListItem
  category?: TItemCategory
  children?: TDataNode[]
}

type TTreeNode = TDataNode & {
  _isCategory: boolean
}

type TItemCategory = {
  isExpanded?: boolean
}

type TListItem =
  | (PlainItem & { type: 'plain' })
  | (CheckboxItem & { type: 'checkbox' })
  | (AnchorItem & { type: 'anchor' })

interface BaseCommonItem {
  label: string
}

type ItemListType = 'plain' | 'checkbox' | 'anchor'

interface PlainItem extends BaseCommonItem {}

interface CheckboxItem extends BaseCommonItem {
  checked?: boolean
  indeterminate?: boolean
}

interface AnchorItem extends BaseCommonItem {
  href: string
  target?: string
}
