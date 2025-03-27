import { mockData } from './mock'
import { ProactorListClass } from './ProactorListClass'

const paListClass = new ProactorListClass(mockData)

paListClass.render(document.body)

document.querySelector('#getChecked')?.addEventListener('click', () => {
  console.log('paListClass.', paListClass.getChecked())
})
