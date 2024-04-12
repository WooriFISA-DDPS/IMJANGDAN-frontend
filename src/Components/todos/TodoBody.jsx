import React from 'react'
import TodoItem from './TodoItem';

const TodoBody = ({ todos }) => {
  console.log(todos);
  return (
    <ul className='px-0 my-8'>
        {todos.map((todo,index) => <TodoItem key={index} todo={todo}/>) }
    </ul>
  )
}

export default TodoBody