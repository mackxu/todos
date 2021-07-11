import { useStore } from 'reto'
import TodoList from './TodoList'
import FilterStore from './FilterStore'
import { FilterType } from '../util'

// 等价于自定义hook: useTodos
export default function FilteredTodoList() {
  const todos = useStore(TodoList)
  const type = useStore(FilterStore)
  const list = todos.todoList
  if (type.state === FilterType.COMPLETED) {
    return list.filter(item => item.isComplete)
  }
  if (type.state === FilterType.UNCOMPLETED) {
    return list.filter(item => !item.isComplete)
  }
  return list
}

/**
 function useTodos() {
  const todos = useStore(TodoList)
  const type = useStore(FilterStore)
  const list = todos.todoList
  if (type.state === FilterType.COMPLETED) {
    return list.filter(item => item.isComplete)
  }
  if (type.state === FilterType.UNCOMPLETED) {
    return list.filter(item => !item.isComplete)
  }
  return list
 }
 */