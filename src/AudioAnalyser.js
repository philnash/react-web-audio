import React, { Component } from 'react';

class AudioAnalyser extends Component {
  constructor(props) {
    super(props);
    this.state = { dataArray: new Uint8Array() };
    this.tick = this.tick.bind(this);
  }

  componentDidMount() {
    this.audioContext = new (window.AudioContext ||
      window.webkitAudioContext)();
    this.analyser = this.audioContext.createAnalyser();
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.source = this.audioContext.createMediaStreamSource(this.props.audio);
    this.source.connect(this.analyser);
    this.rafId = requestAnimationFrame(this.tick);
  }

  tick() {
    this.analyser.getByteTimeDomainData(this.dataArray);
    this.setState({ dataArray: this.dataArray });
    this.rafId = requestAnimationFrame(this.tick);
  }
}

export default AudioAnalyser;
