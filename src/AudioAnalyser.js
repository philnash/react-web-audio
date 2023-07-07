import React, { useState, useEffect } from "react";
import AudioVisualiser from "./AudioVisualiser";

const AudioAnalyser = ({ audio }) => {
  const [audioData, setAudioData] = useState(new Uint8Array(0));

  useEffect(() => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioContext.createAnalyser();
    // const dataArray = new Uint8Array(analyser.frequencyBinCount);
    const source = audioContext.createMediaStreamSource(audio);
    source.connect(analyser);

    const tick = () => {
      const dataArray = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteTimeDomainData(dataArray);
      // setAudioData(new Uint8Array(dataArray));
      setAudioData(dataArray);
      rafId = requestAnimationFrame(tick);
    };

    let rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      analyser.disconnect();
      source.disconnect();
    };
  }, [audio]);

  return <AudioVisualiser audioData={audioData} />;
};


export default AudioAnalyser;
