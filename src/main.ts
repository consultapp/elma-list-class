import { ElmaListClass } from './ElmaListClass'
import { mockData } from './mock'

const list = new ElmaListClass(mockData)
list.render(document.querySelector('#app'))
