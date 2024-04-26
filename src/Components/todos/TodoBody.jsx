import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';
import TodoItemMobile from '../todoMobile/TodoItemMobile'

const TodoBody = ({ todos, setTodos, onFind }) => {
  const findItemById = (id) => {
    onFind(id);
  }

  const deleteMemoById = (id) => {
    const updatedTodos = todos.filter(todo => todo.memoId !== id);
    setTodos(updatedTodos);
  }

  function useIsMobile() {
		const [isMobile, setIsMobile] = useState(false);
	
		useEffect(() => {
			const handleResize = () => {
				const width = window.innerWidth;
				setIsMobile(width <= 645); // Adjust the threshold as needed (common breakpoint for mobile)
			};
	
			window.addEventListener('resize', handleResize);
	
			handleResize(); // Call on initial render
	
			return () => window.removeEventListener('resize', handleResize);
		}, []);
	
		return isMobile;
	}

	const isMobile = useIsMobile();

  return (
    <ul className='px-0'>
      {todos.map((todo, index) => (
        isMobile ? (
          <TodoItemMobile key={index} todo={todo} onFind={findItemById} onDelete={deleteMemoById} />
        ) : ( // Render TodoItem for larger screens
        <div >
          <TodoItem key={index} todo={todo} onFind={findItemById} onDelete={deleteMemoById} />
        </div>
        )
      ))}
    </ul>
  )
}

export default TodoBody