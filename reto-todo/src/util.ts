export const FilterType = {
  ALL: 'Show All',
  COMPLETED: 'Show Completed',
  UNCOMPLETED: 'Show Uncompleted',
}
let id = 0

export function getId() {
  id += 1
  return id
}

export interface ITodo {
  id: number,
  isComplete: boolean,
  text: string,
}

export function replaceItemAtIndex(arr: ITodo[], index: number, newValue: ITodo): ITodo[]{
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)]
}

export function removeItemAtIndex(arr: ITodo[], index: number): ITodo[] {
  return [...arr.slice(0, index), ...arr.slice(index + 1)]
}