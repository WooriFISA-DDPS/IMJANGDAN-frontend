import React from 'react'

function TodoRecord() {
  // 녹음파일이 없을 경우 마이크만
  // 클릭하면 녹음 시작



  return (

    <div className='flex justify-content-between w-full p-2 border-[1px] border-gray-300 bg-gray-100 text-gray-900 rounded'>
     
      <div className='text-lg'>
        🎤 녹음 파일(있을경우) 2024-04-19
      </div>

      <button>❌</button>

    </div>

  )
}

export default TodoRecord