# ElmaListClass

Иерархический список по типу дерева. С возможностью использования узлов разных типов.

- anchor
- checkbox
- plain

<!-- markdownlint-disable MD033 -->
<div style="text-align: center;">
  <img src="/public/screen3.png" height="300px" alt="mockData" />
</div>
<!-- markdownlint-enable MD033 -->

## Подключение

```ts
const list = new ElmaListClass(mockData)
list.render(document.querySelector('#root')!)
```

## Получение массива id, отмеченных чекбоксов

Доступен метод `getChecked()`

```ts
ElmaListClass.getChecked(): string[]
```

```ts
console.log(list.getChecked())
// [
//     "2_1_1",
//     "3_0_1",
//     "3_1"
// ]
```
