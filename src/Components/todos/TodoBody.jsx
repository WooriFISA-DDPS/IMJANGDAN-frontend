import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

const TodoBody = ({ todos, setTodos, onFind }) => {
  const findItemById = (id) => {
    onFind(id);
  }

const deleteMemoById = (id) => {
    const updatedTodos = todos.filter(todo => todo.memoId !== id);
    setTodos(updatedTodos);
  }

  return (
    <ul className='px-0 '>
        {/* {todos.map((todo,index) => <TodoItem key={index} todo={todo} onFind={findItemById} />) } */}
        {todos.map((todo, index) => <TodoItem key={index} todo={todo} onFind={findItemById} onDelete={deleteMemoById} />)}
    </ul>
  )
}

export default TodoBody