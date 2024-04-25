import React from 'react'

function TodoPhoto({memoId, photo}) {

  return (  
    <div className='bg-pink-100 h-60 my-3'>
    {(photo && photo.fileId) ?
      <img src={`${process.env.REACT_APP_API_URL}/memo/${memoId}/file/download?fileId=${photo.fileId}`} />
      :
      null
    }
    </div>
  );
}

export default TodoPhoto;