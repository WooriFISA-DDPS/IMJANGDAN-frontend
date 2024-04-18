import React, { useContext, useState, useEffect } from "react";
import { TODO_CATEGORY_ICON } from '../../constants/icon.jsx';
import IconButton from '../ui/buttons/IconButton';


import axios from "axios";

// rafce
const TodoItem = ({ todo, onFind }) => {

  // id값 받아서 상위 컴포넌트로 전달
  const findItemById2 = (id) => {
    onFind(id);
  }

  const handlePencilClick = () => {
    alert('Pencil button clicked!');
  };

  const handleTrashClick = () => {
    alert('Trash button clicked!');
  };

  return (
    <li className="cursor-pointer flex gap-4 justify-between my-4 py-4 px-4 border-[1px] bg-gray-100 rounded-md shadow-xl"
      onClick={() => findItemById2(todo.memoId)}
    >
      <div>
        <span className="text-lg font-medium ">{TODO_CATEGORY_ICON[todo.category]}</span>
        <div>
          <h2 data-test="title" className="mb-0 text-lg font-bold text-gray-800 uppercase">{todo.title}</h2>
          <p className="mt-2 text-base text-gray-800">{todo.summary}</p>
        </div>
      </div>
      <div className="flex items-center gap-1">
        <IconButton className="z-1 " icon={'✏️'} onClick={handlePencilClick} />
        <IconButton className="z-1 " icon={'🗑️'} onClick={handleTrashClick} />
      </div>
    </li>
  )
}

export default TodoItem