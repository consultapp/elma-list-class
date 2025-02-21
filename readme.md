# ElmaListClass

Иерархический список по типу дерева. С возможностью использования узлов разных типов.

- anchor
- checkbox
- plain

<!-- markdownlint-disable MD033 -->
<div style="text-align: center;">
  <img src="/public/screen2.png" height="300px" alt="mockData" />
</div>
<!-- markdownlint-enable MD033 -->

## Подключение

```ts
const list = new ElmaListClass(mockData)
list.render(document.querySelector('#root')!)
```
