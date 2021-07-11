import { useState } from 'react'
import { FilterType } from '../util'

export default function FilterStore() {
  const [state, setState] = useState<string>(FilterType.UNCOMPLETED)
  return {
    state,
    setState,
  }
}