import React, { ChangeEvent, useState, KeyboardEvent } from 'react'
import './App.css'
import { Provider, useStore } from 'reto'
import { ITodo, getId, FilterType } from './util'
import TodoList from './store/TodoList'
import FilterStore from './store/FilterStore'
import FilteredTodoList from './store/FilteredTodoList'

function TodoItem({ item }: { item: ITodo }) {
  const todos = useStore(TodoList)
  const idx = todos.todoList.findIndex(todoItem => todoItem === item)
  return (
    <div className="todo">
      <input
        type="checkbox"
        checked={ item.isComplete }
        onChange={ (ev) => todos.toggleItemCompletion(idx) }
      />
      <input
        type="text"
        value={ item.text }
        onChange={ (ev) => todos.editItemText(idx, ev.target.value) }
        autoComplete="off"
      />
      <button onClick={ () => todos.deleteItem(idx) }>X</button>
    </div>
  )
}

function TodoListStats() {
  const { todoList } = useStore(TodoList)
  const totalNum = todoList.length
  const totalCompletedNum = todoList.filter(todo => todo.isComplete).length
  const totalUncompletedNum = totalNum - totalCompletedNum
  const formattedPercentCompleted = totalNum ? Math.round(totalCompletedNum / totalNum * 100) : 0
  return (
    <ul>
      <li>总数: { totalNum }</li>
      <li>已完成: { totalCompletedNum }</li>
      <li>未完成: { totalUncompletedNum }</li>
      <li>进度: { formattedPercentCompleted }%</li>
    </ul>
  )
}

function TodoListFilterSelect() {
  const filter = useStore(FilterStore)
  const onChange = (ev: ChangeEvent<HTMLSelectElement>) => {
    filter.setState(ev.target.value)
  }
  return (
    <div>
      筛选:
      <select
        value={ filter.state }
        onChange={ onChange }
      >
        <option value={ FilterType.ALL }>所有</option>
        <option value={ FilterType.COMPLETED }>已完成</option>
        <option value={ FilterType.UNCOMPLETED }>未完成</option>
      </select>
    </div>
  )
}

function TodoItemCreator() {
  const todos = useStore(TodoList)
  const [inputValue, setInputValue] = useState('')
  const onChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) => {
    setInputValue(value)
  }
  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') {
      addItem()
    }
  }
  const addItem = () => {
    todos.addItem({
      id: getId(),
      text: inputValue,
      isComplete: false,
    })
    // 清空输入的文字
    setInputValue('')
  }
  return (
    <div className="add-todo">
      <input
        type="text"
        name="input"
        value={ inputValue }
        onChange={ onChange }
        autoComplete="off"
        onKeyDown={ onKeyDown }
      />
      <button onClick={ addItem }>Add</button>
    </div>
  )
}

function Todos() {
  const todos = useStore(FilteredTodoList)
  return (
    <>
      <header>
        <TodoListFilterSelect />
        <TodoListStats />
      </header>
      <TodoItemCreator />
      <div>待办列表:</div>
      {
        todos.map(todo => (
          <TodoItem
            key={ todo.id }
            item={ todo }
          ></TodoItem>
        ))
      }
    </>
  )
}

function App() {
  return (
    <Provider of={ TodoList }>
      <Provider of={ FilterStore }>
        <Provider of={ FilteredTodoList }>
          <div className="app">
            <Todos></Todos>
          </div>
        </Provider>
      </Provider>
    </Provider>
  )
}

export default App
