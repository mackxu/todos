import { atom, selector } from 'recoil'
import { FilterType } from './util'

export const todoListState = atom({
  key: 'todoListState',
  default: [],
})

export const filterState = atom({
  key: 'todoListFilterState',
  default: FilterType.ALL,
})

// 分类过滤器
export const filteredTodoListState = selector({
  key: 'filteredTodoListState',
  get: ({ get }) => {
    const fType = get(filterState)
    const list = get(todoListState)

    switch (fType) {
      case FilterType.COMPLETED:
        return list.filter(item => item.isComplete)
      case FilterType.UNCOMPLETED:
        return list.filter(item => !item.isComplete)
      default:
        return list
    }
  },
})

// 统计信息
export const todoListStatsState = selector({
  key: 'todoListStatsState',
  get: ({get}) => {
    const todoList = get(todoListState)
    const totalNum = todoList.length
    const totalCompletedNum = todoList.filter(todo => todo.isComplete).length
    const totalUncompletedNum = totalNum - totalCompletedNum
    const percentCompleted = totalNum === 0 ? 0 : totalCompletedNum / totalNum * 100
    return {
      totalNum,
      totalCompletedNum,
      totalUncompletedNum,
      percentCompleted,
    }
  },
})