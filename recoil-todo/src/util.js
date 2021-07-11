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

export function replaceItemAtIndex(arr, index, newValue) {
  return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)]
}

export function removeItemAtIndex(arr, index) {
  return [...arr.slice(0, index), ...arr.slice(index + 1)]
}