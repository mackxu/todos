import { useReducer } from 'react'
import { createContainer } from 'react-tracked'

export enum Filter {
  ALL,
  COMPLETED,
  UNCOMPLETED
}

export interface ITodo {
  id: number,
  title: string,
  completed?: boolean,
}

type State = {
  todos: ITodo[];
  query: string;
  filterType: Filter;
}

type Action =
  | { type: 'ADD_TODO', title: string }
  | { type: 'UPDATE_TODO', title: string }
  | { type: 'DELETE_TODO', id: number }
  | { type: 'TOGGLE_TODO', id: number }
  | { type: 'SET_QUERY', query: string }
  | { type: 'SET_FILTER', filter: Filter }

const initialState: State = {
  todos: [],
  query: '',
  filterType: Filter.ALL,
}

let nextId = 0

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_QUERY':
      return { ...state, query: action.query }
    case 'SET_FILTER':
      return { ...state, filterType: action.filter }
    case 'ADD_TODO':
      return {
        ...state,
        todos: [{ id: nextId++, title: action.title }, ...state.todos],
      }
    case 'DELETE_TODO':
      return {
        ...state,
        todos: state.todos.filter(todo => todo.id !== action.id),
      }
    case 'TOGGLE_TODO':
      return {
        ...state,
        todos: state.todos.map(todo => todo.id === action.id ? { ...todo, completed: !todo.completed } : todo),
      }
    default:
      return state
  }
}

const useValue = () => useReducer(reducer, initialState)

export const {
  Provider,
  useTrackedState,
  useUpdate: useDispatch,
} = createContainer(useValue)