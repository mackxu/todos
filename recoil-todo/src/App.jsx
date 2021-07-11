import React, { useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { FilterType, getId, removeItemAtIndex, replaceItemAtIndex } from './util'
import { todoListState, todoListStatsState, filteredTodoListState, filterState } from './store'
import './App.css'

function TodoItem({ item }) {
  const [todoList, setTodoList] = useRecoilState(todoListState)
  const idx = todoList.findIndex(todoItem => todoItem === item)
  const toggleItemCompletion = () => {
    const newList = replaceItemAtIndex(todoList, idx, {
      ...item,
      isComplete: !item.isComplete,
    })
    setTodoList(newList)
  }
  const editItemText = ({ target: { value } }) => {
    const newList = replaceItemAtIndex(todoList, idx, {
      ...item,
      text: value.trim(),
    })
    setTodoList(newList)
  }
  const deleteItem = () => {
    const newList = removeItemAtIndex(todoList, idx)
    setTodoList(newList)
  }
  return (
    <div className="todo">
      <input
        type="checkbox"
        checked={item.isComplete}
        onChange={toggleItemCompletion}
      />
      <input
        type="text"
        value={item.text}
        onChange={editItemText}
        autoComplete="off"
      />
      <button onClick={deleteItem}>X</button>
    </div>
  )
}

function TodoListStats() {
  const {
    totalNum,
    totalCompletedNum,
    totalUncompletedNum,
    percentCompleted,
  } = useRecoilValue(todoListStatsState)
  const formattedPercentCompleted = Math.round(percentCompleted)
  return (
    <ul>
      <li>总数: {totalNum}</li>
      <li>已完成: {totalCompletedNum}</li>
      <li>未完成: {totalUncompletedNum}</li>
      {totalNum ? <li>进度: {formattedPercentCompleted}%</li> : null}
    </ul>
  )
}

function TodoListFilterSelect() {
  const [filter, setFilter] = useRecoilState(filterState)
  const onChange = ({ target: { value } }) => setFilter(value)
  console.log('TodoListFilterSelect')
  return (
    <div>
      筛选:
      <select
        value={filter}
        onChange={onChange}
      >
        <option value={FilterType.ALL}>All</option>
        <option value={FilterType.COMPLETED}>Completed</option>
        <option value={FilterType.UNCOMPLETED}>Uncompleted</option>
      </select>
    </div>
  )
}

function TodoItemCreator() {
  const [inputValue, setInputValue] = useState('')
  // useSetRecoilState
  const setTodoList = useSetRecoilState(todoListState)
  const onChange = ({ target: { value } }) => {
    setInputValue(value)
  }
  const onKeyDown = ev => {
    if (ev.keyCode === 13) {
      addItem()
    }
  }
  const addItem = () => {
    setTodoList(list => [
      ...list,
      {
        id: getId(),
        text: inputValue,
        isComplete: false,
      },
    ])
    setInputValue('')
  }
  return (
    <div className="add-todo">
      <input
        type="text"
        name="input"
        value={inputValue}
        onChange={onChange}
        autoComplete="off"
        onKeyDown={onKeyDown}
      />
      <button onClick={addItem}>Add</button>
    </div>
  )
}

function App() {
  // useRecoilValue
  const todoList = useRecoilValue(filteredTodoListState)
  return (
    <div className="app">
      <header>
        <TodoListFilterSelect />
        <TodoListStats />
      </header>
      <TodoItemCreator />
      <div>待办列表:</div>
      {
        todoList.map(todo => (
          <TodoItem
            key={todo.id}
            item={todo}
          ></TodoItem>
        ))
      }
    </div>
  )
}

export default App
