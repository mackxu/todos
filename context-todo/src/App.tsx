import './App.css'
import React, { ChangeEvent, FC, useState, KeyboardEvent } from 'react'
import { Provider, ITodo, useDispatch, useTrackedState, Filter } from './store'

const TodoListStats: FC = () => {
  const { todos } = useTrackedState()
  const totalNum = todos.length
  const totalCompletedNum = todos.filter(todo => todo.completed).length
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

const TodoListFilterSelect: FC = () => {
  const { filterType } = useTrackedState()
  const dispatch = useDispatch()
  return (
    <div>
      筛选:
      <select
        value={ filterType }
        onChange={ (e) => dispatch({ type: 'SET_FILTER', filter: +e.target.value }) }
      >
        <option value={ Filter.ALL }>所有</option>
        <option value={ Filter.COMPLETED }>已完成</option>
        <option value={ Filter.UNCOMPLETED }>未完成</option>
      </select>
    </div>
  )
}

const TodoItemCreator: FC = () => {
  const dispatch = useDispatch()
  const [text, setText] = useState('')
  const addTodo = () => {
    dispatch({ type: 'ADD_TODO', title: text })
    setText('')
  }
  const onkeydown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.code === 'Enter') addTodo()
  }
  return (
    <div className="add-todo">
      <input
        type="text"
        value={ text }
        onChange={ (e) => setText(e.target.value) }
        onKeyDown={ onkeydown }
      />
      <button onClick={ addTodo }>添加</button>
    </div>
  )
}

// 查询功能暂时不添加
const renderHighlight = (title: string, query: string) => {
  if (!query) return title
  const index = title.indexOf(query)
  if (index < 0) return title
  return (
    <>
      { title.slice(0, index) }
      <b>{ query }</b>
      { title.slice(index + query.length) }
    </>
  )
}

const TodoItem: FC<ITodo> = ({ id, title, completed }) => {
  const dispatch = useDispatch()
  return (
    <div className="todo">
      <input
        type="checkbox"
        checked={ completed }
        onChange={ () => dispatch({ type: 'TOGGLE_TODO', id }) }
      />
      <input
        type="text"
        autoComplete="off"
        value={ title }
        onChange={ (e) => dispatch({ type: 'UPDATE_TODO', title: e.target.value }) }
      />
      <button onClick={ () => dispatch({ type: 'DELETE_TODO', id }) }>X</button>
    </div>
  )
}

function filterTodos(todos: ITodo[], filterType: Filter) {
  switch (filterType) {
    case Filter.COMPLETED:
      return todos.filter(todo => todo.completed)
    case Filter.UNCOMPLETED:
      return todos.filter(todo => !todo.completed)
    default:
      return todos
  }
}

const Todos: FC = () => {
  const dispatch = useDispatch()
  const { todos, filterType, query } = useTrackedState()
  const filteredTodos = filterTodos(todos, filterType)
  const setQuery = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: 'SET_QUERY', query: e.target.value.trim() })
  }
  return (
    <>
      <header>
        <TodoListFilterSelect />
        <TodoListStats />
      </header>
      <TodoItemCreator />
      <div>待办列表：</div>
      {
        filteredTodos.map(({ id, title, completed }) => (
          <TodoItem
            key={ id }
            id={ id }
            title={ title }
            completed={ completed }
          ></TodoItem>
        ))
      }
      <div>
        搜索：
        <input
          value={ query }
          onChange={ setQuery }
        />
      </div>
    </>
  )
}

function App() {
  return (
    <Provider>
      <div className="app">
        <Todos />
      </div>
    </Provider>
  )
}

export default App
