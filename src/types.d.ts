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

type TListItem = PlainItem | CheckboxItem | AnchorItem

interface BaseItem {
  type: string
  name: string
}

interface PlainItem extends BaseItem {
  type: 'plain'
}

interface CheckboxItem extends BaseItem {
  type: 'checkbox'
  checked?: boolean
  indeterminate?: boolean
}

interface AnchorItem extends BaseItem {
  type: 'anchor'
  href: string
}
