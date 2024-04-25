import React from 'react'

function TodoPhoto({memoId, photo}) {

  return (  
    <div className='my-3'>
      {(photo && photo.fileId) ?
        <img class="w-full min-h-auto" src={`http://localhost:8989/memo/${memoId}/file/download?fileId=${photo.fileId}`} />
        :
        <></>
      }
    </div>
  );
}

export default TodoPhoto;