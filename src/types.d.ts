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
  href?: string
  target?: TTarget
}

interface AnchorItem extends BaseCommonItem {
  href: string
  target?: TTarget
}

type TTarget = '_blank' | '_self' | '_parent' | '_top' | string
