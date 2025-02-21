import { ElmaListClass } from './ElmaListClass'
import { mockData } from './mock'

const list = new ElmaListClass(mockData)
list.render(document.querySelector('#app')!)
document.querySelector('#getChecked')?.addEventListener('click', () => {
  console.log('mockData', mockData)
  console.log('list.getChecked()', list.getChecked())
})
