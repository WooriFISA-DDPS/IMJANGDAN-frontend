import React from 'react'
// import { TODO_CATEGORY_ICON } from '/Users/kangwonseo/Desktop/react/imjangdan-front-f/src/constants/icon.jsx'
import { TODO_CATEGORY_ICON } from '../../constants/icon'


const TodoFilter = () => {
  const [selectedOption, setSelectedOption] = React.useState('all'); // Initial value is 'all'

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };
  
  return (
    <select 
      className="p-2 text-gray-800 bg-gray-100 rounded"
      data-cy="todo-filter"
      onChange={handleChange}
      value={selectedOption} 
    >
      {/* defaultValue? - https://react.dev/reference/react-dom/components/select */}
      <option value="all" defaultValue={'1'}>All</option>
      <option value="Good">{TODO_CATEGORY_ICON.Good} Good</option>
      <option value="SoSo">{TODO_CATEGORY_ICON.SoSo} SoSo</option>
      <option value="Bad">{TODO_CATEGORY_ICON.Bad} Bad</option>
  </select>
  )
}

export default TodoFilter