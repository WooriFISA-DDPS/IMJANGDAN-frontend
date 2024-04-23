import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import TodoForm from '../todos/TodoForm';
import TodoFilter from '../todos/TodoFilter';
import Modal from '../ui/Modal';
import TodoShow from '../todos/TodoShow';

const TodoHeaderMobile = ({ onAdd }) => {

  // 모달창 토글용 상태값
  const [isOpen, open] = useState(false);
  const openModal = () => open(true); // 
  const closeModal = () => open(false);

  return (
    <div>
      <div 
        className="flex items-center justify-between pt-3 align-middle sm:p-1" 
        id="task-control"
      >
        <button 
          class="btn btn-outline-secondary"
          //className="px-6 py-2 font-semibold text-gray-800 bg-gray-200 border-none rounded cursor-pointer sm:px-2"
          data-cy="add-todo-button"
          onClick={openModal}
        >➕
        </button>


        {isOpen && createPortal(
          <Modal>
            <TodoForm onAdd={onAdd} onClose={closeModal} />
          </Modal>, document.body)}
        
        <div className='sm:flex sm:ml-3'>
          <TodoShow />
          <TodoFilter />
        </div>
      </div>
    </div>

  )
}

export default TodoHeaderMobile