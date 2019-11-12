import React from 'react';

import './App.css';

class App extends React.Component {
    state = {
      breakLength: '5',
      sessionLength: '25',
      session: 'mm:ss'
    }
  



  resetClock(){
    this.setState({
      breakLength: '5',
      sessionLength: '25',
      session: 'mm:ss'
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
        <p id="break-decrement" onClick={this.decrementBreak}>-</p>
        <p id="break-number">{this.state.breakLength}</p>
        <p id="break-increment" onClick={this.incrementBreak}>+</p>
        </div>
      </div>

      <div id="session-label">
      <h5>Session Length</h5>
        <div id="session-label-elements">
        <p id="session-decrement" onClick={this.decrementSession}>-</p>
        <p id="session-number">{this.state.sessionLength}</p>
        <p id="session-increment" onClick={this.incrementSession}>+</p>
        </div>
      </div>
      </div>

      <div id="timer-label">
        <h4>Session</h4>
        <div id="time-left">
          <p>{this.state.session}</p>
        </div>
      </div>

      <div id="controls">
        <button id="start-stop">Start/Stop</button>
        <button id="reset" onClick={() => this.resetClock()}>Reset</button>
      </div>


    </div>
  );
  }
}

export default App;
