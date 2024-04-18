import React from 'react'

const Modal = ({ children, onClose }) => {
  return (
    <>
      <div data-cy="modal-backdrop" className='fixed top-0 left-0 w-full h-full backdrop-blur-md z-1' onClick={onClose}></div>
        <div
          className='fixed mt-4 z-10 w-1/2 py-4 px-8 m-0 transform -translate-x-1/2 -translate-y-1/2 fixed z-10 w-1/2 p-8 m-0 transform -translate-x-1/2 -translate-y-1/2 border-solid border-2 border-gray-300  rounded shadow-xl top-1/2 left-1/2 bg-white rounded top-1/2 left-1/2 '
        >
        {children}
      </div>
    </>
  )
}

export default Modal