import React, { useState } from "react";
import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";

export default function Hero() {
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder({
    video: true,
    audio: true,
    screen: true,
  });

  const [recordedBlob, setRecordedBlob] = useState(null);

  const handleStopRecording = (blobUrl, blob) => {
    setRecordedBlob(blob);
  };

  const handleDownload = () => {
    if (recordedBlob) {
      const blobUrl = window.URL.createObjectURL(recordedBlob);
      const a = document.createElement("a");
      a.href = blobUrl;
      a.download = "recorded-video.mp4";
      a.click();
    }
  };

  return (
    <div>
      <ReactMediaRecorder
        video
        audio
        screen
        onStop={handleStopRecording}
        render={({ startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            {mediaBlobUrl ? (
              <>
                <video src={mediaBlobUrl} controls />
                <button onClick={handleDownload}>Download Video</button>
              </>
            ) : (
              <>
                <button onClick={startRecording}>Start Recording</button>
                <button onClick={stopRecording}>Stop Recording</button>
              </>
            )}
          </div>
        )}
      />
    </div>
  );
}
