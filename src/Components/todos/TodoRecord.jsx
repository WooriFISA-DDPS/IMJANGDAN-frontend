import React from "react";
import styled from "styled-components";
import VoiceRecorder from "../ui/VoiceRecorder";

const StyledAudio = styled.audio`
  width: 100%;
`;

function TodoAudio({ memoId, record }) {
  console.log(memoId, record);

  return (
    <div className='my-3'>
      {(record && record.fileId) ?

      <StyledAudio controls src={`${process.env.REACT_APP_API_URL}/memo/${memoId}/file/download?fileId=${record.fileId}`}>
        Your browser does not support the audio element.
      </StyledAudio>
      
      :
        <VoiceRecorder />
      }
    </div>
  );
}

export default TodoAudio;
