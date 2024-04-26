import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import TodoForm from '../todos/TodoForm';
import TodoFilter from '../todos/TodoFilter';
import Modal from '../ui/Modal';
import TodoShow from '../todos/TodoShow';

const TodoHeaderMobile = ({latParam,lngParam, files, setFiles, onAdd }) => {

  // 모달창 토글용 상태값
  const [isOpen, open] = useState(false);
  const openModal = () => open(true); // 
  const closeModal = () => open(false);

   // latParam이 변경될 때 모달을 열기
   useEffect(() => {
    if (latParam !== undefined && latParam !== null && lngParam !== undefined && lngParam !== null) {
      openModal();
    }
  }, [latParam, lngParam]); // latParam이 변경될 때만 useEffect 실행



  return (
    <div>
      <div 
        className="w-[98%] fixed z-20 flex items-center justify-between py-3 pr-4 align-middle bg-white top-[55px]" 
      
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
            <TodoForm 
            latParam={latParam} 
            lngParam={lngParam} 
            files={files}  
            setFiles={setFiles}  
            onAdd={onAdd} 
            onClose={closeModal} 
          />
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