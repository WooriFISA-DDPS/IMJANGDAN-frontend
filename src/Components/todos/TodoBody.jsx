import React, { useState, useEffect } from 'react';
import TodoItem from './TodoItem';

const TodoBody = ({ todos, onFind }) => {


  const findItemById = (id) => {
    onFind(id);
  }



  //console.log(todos);
  return (
    <ul className='px-0 '>
        {todos.map((todo,index) => <TodoItem key={index} todo={todo} onFind={findItemById} />) }
    </ul>
  )
}

export default TodoBody