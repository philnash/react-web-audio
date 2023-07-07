import React, { useState } from "react";
import AudioAnalyser from "./AudioAnalyser";

function App() {
  const [audio, setAudio] = useState(null);

  const getMicrophone = async () => {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });
    setAudio(audio);
  };

  const stopMicrophone = () => {
    audio.getTracks().forEach((track) => track.stop());
    setAudio(null);
  };

  const toggleMicrophone = () => {
    if (audio) {
      stopMicrophone();
    } else {
      getMicrophone();
    }
  };

  return (
    <div className="App">
      <div className="controls">
        <button onClick={toggleMicrophone}>
          {audio ? "Stop microphone" : "Get microphone input"}
        </button>
      </div>
      {audio ? <AudioAnalyser audio={audio} /> : ""}
    </div>
  );
}

export default App;
