import React, { Component } from 'react';
import AudioAnalyser from './AudioAnalyser';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null
    };
    this.getMicrophone = this.getMicrophone.bind(this);
    this.stopMicrophone = this.stopMicrophone.bind(this);
  }

  getMicrophone() {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(audio => this.setState({ audio }));
  }

  stopMicrophone() {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ audio: null });
  }

  render() {
    return (
      <div className="App">
        <div className="controls">
          <button
            onClick={
              this.state.audio ? this.stopMicrophone : this.getMicrophone
            }
          >
            {this.state.audio ? 'Stop microphone' : 'Get microphone input'}
          </button>
        </div>
        {this.state.audio ? <AudioAnalyser audio={this.state.audio} /> : ''}
      </div>
    );
  }
}

export default App;
