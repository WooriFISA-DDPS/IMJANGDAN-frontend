import React from 'react'

function TodoPhoto({memoId, photo}) {

  return (  

     
    <div 
      className="w-full min-h-auto border-[1px] border-gray-300 rounded "
    >
    {(photo && photo.fileId) ?
      <img 
        className='min-w-full'
        src={`${process.env.REACT_APP_API_URL}/memo/${memoId}/file/download?fileId=${photo.fileId}`} />
      :
      null
    }
    </div>
  );
}

export default TodoPhoto;