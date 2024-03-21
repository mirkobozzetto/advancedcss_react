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

  useEffect(() => {
    if (audioContext.state === "suspended") {
      const resumeAudio = () => {
        audioContext.resume();

        // Once the audio context is running, we can remove the event listener.
        window.removeEventListener("click", resumeAudio);
      };

      window.addEventListener("click", resumeAudio);
    }
  }, []);

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

  return (
    <div>
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
