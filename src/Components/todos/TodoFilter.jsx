import React from 'react'
// import { TODO_CATEGORY_ICON } from '/Users/kangwonseo/Desktop/react/imjangdan-front-f/src/constants/icon.jsx'
import { TODO_CATEGORY_ICON } from '../../constants/icon'


const TodoFilter = () => {
  return (
    <select className="p-2 text-gray-800 bg-gray-200 rounded"
            data-cy="todo-filter"
            >
      {/* defaultValue? - https://react.dev/reference/react-dom/components/select */}
      <option value="all" defaultValue={'1'}>All</option>
      <option value="TODO">{TODO_CATEGORY_ICON.TODO} Good</option>
      <option value="PROGRESS">{TODO_CATEGORY_ICON.PROGRESS} SoSo</option>
      <option value="DONE">{TODO_CATEGORY_ICON.DONE} Bad</option>
  </select>
  )
}

export default TodoFilter