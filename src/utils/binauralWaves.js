export let audioContext = new (window.AudioContext ||
  window.webkitAudioContext)();
export let beatFrequency = 4; // beat in Hz
export let frequencyIntervals = [1, 2, 3]; // integer multiples of the fundamental
export let fundamentalFrequency = 200; // fundamental frequency

// Pan
export let stereoPanners = [
  audioContext.createStereoPanner(),
  audioContext.createStereoPanner(),
];
stereoPanners[0].pan.value = -1;
stereoPanners[1].pan.value = 1;
stereoPanners[0].connect(audioContext.destination);
stereoPanners[1].connect(audioContext.destination);

// Oscillators
export let oscillators = [];
for (let i = 0; i < frequencyIntervals.length * 2; i++) {
  let pan = i % 2;
  let oscillator = audioContext.createOscillator();
  oscillator.type = "sine";
  let interval = frequencyIntervals[Math.floor(i / 2)];
  if (pan) {
    oscillator.frequency.value =
      (fundamentalFrequency + beatFrequency) * interval;
  } else {
    oscillator.frequency.value = (fundamentalFrequency + 0) * interval;
  }
  oscillator.start();
  oscillator.connect(stereoPanners[pan]);
  oscillators.push(oscillator);
}

// Set the beat in Hz, the new fundamental frequency, and the new intervals (integer multiples)
export function setAudioParameters(
  newBeatFrequency,
  newFundamentalFrequency,
  newFrequencyIntervals
) {
  beatFrequency = newBeatFrequency;
  frequencyIntervals = newFrequencyIntervals;
  fundamentalFrequency = newFundamentalFrequency;

  for (let i = 0; i < oscillators.length; i++) {
    let pan = i % 2;
    let interval = frequencyIntervals[Math.floor(i / 2)];
    let oscillator = oscillators[i];
    if (pan) {
      oscillator.frequency.value =
        (fundamentalFrequency + beatFrequency) * interval;
    } else {
      oscillator.frequency.value = (fundamentalFrequency + 0) * interval;
    }
  }
}
