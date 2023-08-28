import React, { useState } from "react";
import { ReactMediaRecorder, useReactMediaRecorder } from "react-media-recorder";
import style from './Hero.module.css';
import { FiPlayCircle } from "react-icons/fi";
import stop from '../assets/stop.svg'
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
   



<div className={style.main}>
<div className={style.left_img}>
  <img src="https://imgur.com/mzMWDGi.png" alt="pic" />
</div>
<div className={style.options}>
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
                <button onClick={handleDownload}  className={style.icon}>Download Video</button>
              </>
            ) : (
              <>
                <button ><FiPlayCircle onClick={startRecording} className={style.play}/></button>
                <img src = {stop} alt='stop'  onClick={stopRecording} className={style.icon}/>
              </>
            )}
          </div>
        )}
      />
    </div>
</div>
</div>
  );
}
