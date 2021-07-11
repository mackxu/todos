import { useState } from 'react'
import { replaceItemAtIndex, ITodo, removeItemAtIndex } from '../util'

export default function TodoList() {
  const [todoList, setTodoList] = useState<ITodo[]>([])
  return {
    todoList,
    toggleItemCompletion(idx: number) {
      const item = todoList[idx]
      const newList = replaceItemAtIndex(todoList, idx, {
        ...item,
        isComplete: !item.isComplete,
      })
      setTodoList(newList)
    },
    editItemText(idx: number, text: string) {
      const item = todoList[idx]
      const newList = replaceItemAtIndex(todoList, idx, {
        ...item,
        text,
      })
      setTodoList(newList)
    },
    deleteItem(idx: number) {
      const newList = removeItemAtIndex(todoList, idx)
      setTodoList(newList)
    },
    addItem(item: ITodo) {
      setTodoList([item, ...todoList])
    },
  }
}