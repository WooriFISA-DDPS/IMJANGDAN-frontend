import React, { useState } from 'react';
import { createPortal } from 'react-dom';
// import TodoForm from '../TodoForm';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import Modal from '../ui/Modal';
import TodoShow from './TodoShow';

const TodoHeader = ({ onAdd }) => {

  // 모달창 토글용 상태값
  const [isOpen, open] = useState(false);
  const openModal = () => open(true); // 
  const closeModal = () => open(false);

  return (
    <>
      <div className="flex sticky justify-between items-center align-middle bg-gray-400 p-3" id="task-control">
        <button className="px-6 py-2 font-semibold text-gray-800 bg-gray-200 border-none rounded cursor-pointer"
          data-cy="add-todo-button"
          onClick={openModal}
        >메모 추가
        </button>


        {isOpen && createPortal(
          <Modal>
            <TodoForm onAdd={onAdd} onClose={closeModal} />
          </Modal>, document.body)}
        
        <div>
        <TodoShow />
        <TodoFilter />
        </div>
      </div>
    </>

  )
}

export default TodoHeader