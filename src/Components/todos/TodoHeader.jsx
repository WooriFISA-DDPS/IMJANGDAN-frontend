import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
// import TodoForm from '../TodoForm';
import TodoForm from './TodoForm';
import TodoFilter from './TodoFilter';
import Modal from '../ui/Modal';
import TodoShow from './TodoShow';

const TodoHeader = ({latParam,lngParam, files, setFiles, onAdd }) => {

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
    <div >
      <div 
        className="mt-0 fixed top-[63px] z-20 w-[487px] flex items-center justify-between p-3 align-middle bg-gray-400" 
        id="task-control"
      >
        <button className="px-6 py-2 font-semibold text-gray-800 bg-gray-200 border-none rounded cursor-pointer sm:px-2"
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
        
        <div className='flex ml-8'>
          <TodoShow />
          <TodoFilter />
        </div>
      </div>
    </div>

  )
}

export default TodoHeader