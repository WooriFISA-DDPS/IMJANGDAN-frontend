import React, { useState, useEffect } from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';

function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [recordingBlob, setRecordingBlob] = useState(null);

  const handleRecordingComplete = (blob) => {
    setIsRecording(false);
    setRecordingBlob(blob);
    showConfirm(true); // Show confirmation dialog
  };

  const handleSaveRecording = async () => {
    if (!recordingBlob) {
      return; // Handle potential errors
    }

    // Implement backend logic to save recordingBlob (see previous explanation)

    setShowConfirm(false);
    setRecordingBlob(null); // Clear recording data
  };

  const handleCancelSave = () => {
    setShowConfirm(false);
    setRecordingBlob(null); // Clear recording data
  };

  return (
    <div>
      <AudioRecorder
        onStartRecording={() => setIsRecording(true)}
        onStopRecording={handleRecordingComplete}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
        }}
        onNotAllowedOrFound={(err) => console.table(err)}
        downloadOnSavePress={false} // Disable user-side download
        mediaRecorderOptions={{
          audioBitsPerSecond: 128000,
        }}
      />
      {showConfirm && (
        <div className="confirmation-modal">
          <p>Do you want to save this recording?</p>
          <button onClick={handleSaveRecording}>Save</button>
          <button onClick={handleCancelSave}>Cancel</button>
        </div>
      )}
    </div>
  );
}

export default VoiceRecorder;