import React from 'react'

function TodoRecord({record}) {
  return (
    <div className='bg-pink-300'>
      🎤 녹음: {record[0].originFileName}
    </div>
  )
}

export default TodoRecord