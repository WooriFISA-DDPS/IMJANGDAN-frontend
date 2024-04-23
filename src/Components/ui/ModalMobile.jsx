import React from 'react'

const ModalMobile = ({ children, onClose }) => {
  return (
    <>
      <div 
        data-cy="modal-backdrop" 
        className='fixed top-0 left-0 z-10 w-full h-full overflow-auto bg backdrop-blur-md' 
        >
      </div>

      <div
          className='fixed z-10 w-full p-3 mt-4 overflow-y-scroll transform -translate-x-1/2 -translate-y-1/2 bg-white border-2 border-gray-300 border-solid rounded shadow-xl top-1/2 left-1/2 h-4/5'
        >
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="btn btn-outline-secondary"
          >
            ✖️
          </button>
        </div>
        {children}
      </div>
    </>
  )
}

export default ModalMobile