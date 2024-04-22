import React from 'react'

function TodoPhoto({memoId, photo}) {

  return (  
    <div className='bg-pink-100 h-60 my-3'>
    {(photo && photo.fileId) ?
      <img src={`http://localhost:8989/memo/${memoId}/file/download?fileId=${photo.fileId}`} />
      :
      null
    }
    </div>
  );
}

export default TodoPhoto;