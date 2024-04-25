import React from 'react';
import styled from 'styled-components';


const StyledAudio = styled.audio`
  width: 100%;
`;

function TodoAudio({memoId, record}) {

  return (  
    <div className='bg-pink-100 my-3'>
      {(record && record.fileId) ?

      <StyledAudio controls src={`${process.env.REACT_APP_API_URL}/memo/${memoId}/file/download?fileId=${record.fileId}`}>
        Your browser does not support the audio element.
      </StyledAudio>
      :
      <p>첨부된 오디오가 없습니다.</p>
      }
    </div>
  );
}

export default TodoAudio;
