import React from 'react'

function TodoPhoto({memoId, photo}) {

  return (  
    <>
    {(photo && photo.fileId) ?
      <img class="w-full min-h-auto" src={`${process.env.REACT_APP_API_URL}/memo/${memoId}/file/download?fileId=${photo.fileId}`} />
      :
      null
    }
    </>
  );
}

export default TodoPhoto;