import { useState, useEffect } from "react";
import {
  audioContext,
  beatFrequency,
  frequencyIntervals,
  fundamentalFrequency,
  setAudioParameters,
} from "../utils/binauralWaves";

const AudioController = () => {
  const [beat, setBeat] = useState(beatFrequency);
  const [fundamental, setFundamental] = useState(fundamentalFrequency);
  const [intervals, setIntervals] = useState(frequencyIntervals);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (isPlaying && audioContext.state === "suspended") {
      audioContext.resume();
    } else if (!isPlaying && audioContext.state === "running") {
      audioContext.suspend();
    }
  }, [isPlaying]);

  const handleBeatChange = (event) => {
    setBeat(event.target.value);
    setAudioParameters(event.target.value, fundamental, intervals);
  };

  const handleFundamentalChange = (event) => {
    setFundamental(event.target.value);
    setAudioParameters(beat, event.target.value, intervals);
  };

  const handleIntervalsChange = (event) => {
    const newIntervals = event.target.value.split(",").map(Number);
    setIntervals(newIntervals);
    setAudioParameters(beat, fundamental, newIntervals);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div>
      <button onClick={togglePlay}>{isPlaying ? "Stop" : "Start"}</button>
      <label>
        Beat frequency:
        <input type="number" value={beat} onChange={handleBeatChange} />
      </label>
      <label>
        Fundamental frequency:
        <input
          type="number"
          value={fundamental}
          onChange={handleFundamentalChange}
        />
      </label>
      <label>
        Frequency intervals:
        <input
          type="text"
          value={intervals.join(",")}
          onChange={handleIntervalsChange}
        />
        <small>(Enter numbers separated by commas)</small>
      </label>
    </div>
  );
};

export default AudioController;
