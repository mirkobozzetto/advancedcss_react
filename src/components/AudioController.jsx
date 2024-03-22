import { useState, useEffect, useMemo } from "react";
import Oscillator from "../utils/binauralWaves";

const AudioController = () => {
  const audioContext = useMemo(
    () => new (window.AudioContext || window.webkitAudioContext)(),
    []
  );
  const [oscillatorLeft] = useState(new Oscillator(audioContext, -1));
  const [oscillatorRight] = useState(new Oscillator(audioContext, 1));
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequencyLeft, setFrequencyLeft] = useState(432);
  const [frequencyRight, setFrequencyRight] = useState(432);

  useEffect(() => {
    if (isPlaying && audioContext.state === "suspended") {
      audioContext.resume();
    } else if (!isPlaying && audioContext.state === "running") {
      audioContext.suspend();
    }
  }, [isPlaying, audioContext]);

  useEffect(() => {
    return () => {
      oscillatorLeft.stopOscillator();
      oscillatorRight.stopOscillator();
    };
  }, [oscillatorLeft, oscillatorRight]);

  const handleFrequencyLeftChange = (event) => {
    const newFrequency = event.target.value;
    setFrequencyLeft(newFrequency);
    oscillatorLeft.setFrequency(newFrequency);
  };

  const handleFrequencyRightChange = (event) => {
    const newFrequency = event.target.value;
    setFrequencyRight(newFrequency);
    oscillatorRight.setFrequency(newFrequency);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <button onClick={togglePlay}>{isPlaying ? "Stop" : "Start"}</button>
      <label>
        Left ear frequency:
        <input
          type="number"
          value={frequencyLeft}
          onChange={handleFrequencyLeftChange}
        />
      </label>
      <label>
        Right ear frequency:
        <input
          type="number"
          value={frequencyRight}
          onChange={handleFrequencyRightChange}
        />
      </label>
    </div>
  );
};

export default AudioController;
