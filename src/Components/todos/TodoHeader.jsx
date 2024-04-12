import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import TodoForm from '../TodoForm';
import TodoFilter from './TodoFilter';
// import Modal from '/Users/kangwonseo/Desktop/react/imjangdan-front-f/src/Components/ui/Modal'
import Modal from '../ui/Modal';

const TodoHeader = ({ onAdd }) => {

  // 모달창 토글용 상태값
  const [isOpen, open] = useState(false);
  const openModal = () => open(true); // 
  const closeModal = () => open(false); 

  return (
    <div className="flex items-center justify-between mb-2" id="task-control">
    <button className="px-6 py-2 font-semibold text-gray-100 bg-gray-800 border-none rounded cursor-pointer"
            data-cy="add-todo-button"
            onClick={openModal}
            >Add Memo
    </button>
    {isOpen && createPortal(
      <Modal>
        <TodoForm onAdd={onAdd} onClose={closeModal} />
        </Modal>, document.body)}
    <TodoFilter />
    </div>
  )
}

export default TodoHeader