class Oscillator {
  constructor(context, panValue, frequency = 432) {
    this.context = context;
    this.panNode = this.context.createStereoPanner();
    this.panNode.pan.value = panValue;
    this.panNode.connect(this.context.destination);
    this.oscillatorNode = this.context.createOscillator();
    this.oscillatorNode.type = "sine";
    this.oscillatorNode.frequency.value = frequency;
    this.oscillatorNode.connect(this.panNode);
    this.oscillatorNode.start();
  }

  setFrequency(frequency) {
    this.oscillatorNode.frequency.value = frequency;
  }

  stopOscillator() {
    this.oscillatorNode.stop();
  }
}

export default Oscillator;
