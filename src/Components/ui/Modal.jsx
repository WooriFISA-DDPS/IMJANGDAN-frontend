import React from 'react'

const Modal = ({ children, onClose }) => {
  return (
    <>
      <div 
        data-cy="modal-backdrop" 
        className='fixed top-0 left-0 z-20 w-full h-full overflow-auto bg backdrop-blur-md'
        onClick={onClose}>
      </div>

      <div
        className='fixed z-20 w-1/2 p-8 px-8 py-4 m-0 mt-4 overflow-y-scroll transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-gray-300 border-solid rounded shadow-xl h-5/6 top-1/2 left-1/2 sm:w-full sm:h-4/5 sm:overflow-y-scroll'
      >
        {children}
      </div>
    </>
  )
}

export default Modal