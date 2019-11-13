import React from 'react';

import './App.css';

class App extends React.Component {
    state = {
      breakLength: '5',
      sessionLength: '25',
      session: '25:00',
      timerTime: 0,
      timerOn: false,
      seconds: 1800000 / 1000
    }
  

  resetClock(){
    this.setState({
      breakLength: '5',
      sessionLength: '25',
      session: '25:00',
    })
  }

  decrementBreak = () => {
    this.setState({
      breakLength: this.state.breakLength - 1
    })
  }

  incrementBreak = () => {
    this.setState({
      breakLength: this.state.breakLength + 1
    })
  }

  decrementSession = () => {
    this.setState({
      sessionLength: this.state.sessionLength - 1
    })
  }

  incrementSession = () => {
    this.setState({
      sessionLength: this.state.sessionLength + 1
    })
  }

  getSeconds() {
    return ("0" + Math.floor(this.state.seconds % 60)).slice(-2);
  }

  getMinutes() {
    return ("0" + Math.floor(this.state.seconds % 3600 / 60)).slice(-2)
  }

  startCounter() {
    this.timer = setInterval(() => {
      this.setState({
      seconds: this.state.seconds -1            
        });
    }, 1000);  
  };

  StopCounter(){
    clearInterval(this.timer);
    this.setState({
      timerOn: false
    });
  };

  resetCounter(){
      this.setState({
        timerTime: this.state.session
      })
  };


  render() {
  return (
    <div className="App">

      <div id="title">
      <h1>Pomodoro Clock</h1>
      </div>

      <div id="labels-container">
      <div id="break-label">
      <h5>Break Length</h5>
        <div id="break-label-elements">
        <p id="break-decrement pointer" onClick={this.decrementBreak}>-</p>
        <p id="break-number">{this.state.breakLength}</p>
        <p id="break-increment pointer" onClick={this.incrementBreak}>+</p>
        </div>
      </div>

      <div id="session-label">
      <h5>Session Length</h5>
        <div id="session-label-elements">
        <p id="session-decrement pointer" onClick={this.decrementSession}>-</p>
        <p id="session-number">{this.state.sessionLength}</p>
        <p id="session-increment pointer" onClick={this.incrementSession}>+</p>
        </div>
      </div>
      </div>

      <div id="timer-label">
        <h4>Session</h4>
        <div id="time-left">
          {this.getMinutes()} : {this.getSeconds()}
        </div>
      </div>

      <div id="controls">
        <button onClick={() => this.startCounter()}>Start</button>
        <button onClick={() => this.StopCounter()}>Stop</button>
        <button onClick={() => this.resetCounter()}>Reset</button>
      </div>

    </div>
  );
  }
  
}

export default App;
