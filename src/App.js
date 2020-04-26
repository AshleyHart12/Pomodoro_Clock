import React from 'react';
import './App.css';

const formatTime = (timeLeftInSecond) => {
  let minute = Math.floor(timeLeftInSecond / 60);
  if (minute < 10) minute = '0' + minute;

  let second = timeLeftInSecond - 60 * minute;
  if (second < 10) second = '0' + second;

  return `${minute}:${second}`;
}


class App extends React.Component {
  constructor(props){
    super(props)

    this.audioBeep = React.createRef();

    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerName: 'Session',
      timerOn: false,
      timeLeft: Number.parseInt(25, 10) * 60,
      timerInterval: null
    };
    this.decrementBreak = this.decrementBreak.bind(this);
    this.decrementSession = this.decrementSession.bind(this);
    this.incrementBreak = this.incrementBreak.bind(this);
    this.incrementSession = this.incrementSession.bind(this);
    this.resetCounter = this.resetCounter.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }
  
decrementBreak(){
  if (this.state.breakLength > 1 && !this.state.timerOn){
    this.setState({
      breakLength: this.state.breakLength - 1
    })
  }   
};

incrementBreak(){
  if (this.state.breakLength < 60 && !this.state.timerOn) {
    this.setState({
    breakLength: this.state.breakLength + 1
    })
  }
};

decrementSession(){
  if (this.state.sessionLength > 1 && !this.state.timerOn) {
    this.setState(({minutes, sessionLength}) => ({
      timeLeft: this.state.timeLeft - 1 * 60,
      sessionLength: sessionLength - 1
    }))
  }
};

incrementSession(){
  if (this.state.sessionLength < 60 && !this.state.timerOn) {
    this.setState(({minutes, sessionLength}) => ({
      timeLeft: this.state.timeLeft + 1 * 60,
      sessionLength: sessionLength + 1
    }))
  }
};

decreaseTimer(){
  this.setState({
    timeLeft: this.state.timeLeft -1
  })
}

handleStart(){
  if (!this.state.timerOn){
    this.setState({
      timerOn: !this.state.timerOn,
      timerInterval: setInterval(() => {
      this.decreaseTimer();
       this.phaseControl();
      }, 1000)
    })
  } else {
    this.audioBeep.current.pause();
    this.audioBeep.current.currentTime = 0;
    this.state.timerInterval && clearInterval (this.state.timerInterval);

    this.setState({
      timerOn: !this.state.timerOn,
      timerInterval: null
    });
  }
}

phaseControl(){
  if (this.state.timeLeft === 0) {
    this.audioBeep.current.play();
  } else if (this.state.timeLeft === -1) {
    if (this.state.timerName === 'Session'){
      this.setState({
        timerName: 'Break',
        timeLeft: this.state.breakLength * 60,
        
      });
    } else {
      this.setState({
        timerName: 'Session',
        timeLeft: this.state.sessionLength * 60
      });
    }
  }
}
  

resetCounter(){
   this.audioBeep.current.pause();
   this.audioBeep.current.currentTime = 0;
   this.state.timerInterval && clearInterval(this.state.timerInterval);
  clearInterval (this.state.timerInterval);
    this.setState({
      breakLength: 5,
      sessionLength: 25,
      intervalId: 0,
      timerName: 'Session',
      timerOn: false,
      timeLeft: Number.parseInt(25, 10) * 60
    });
};


render() {

return (
  <div className="App">
 
    <div id="titleHeader">
      <p id="rainbowHeader">Pomodoro Clock
        </p>
      </div>

      <div className="displayOutline">


  {/* BREAK AND SESSION LENGTHS + BUTTONS */}
    <div id="labelsContainer">
    <div id="labelHeader">
    <label id="break-label">Break Length</label>
      <div>
      <button id="break-decrement" onClick={() => this.decrementBreak()}>-</button>
      <span id="break-length">{this.state.breakLength}</span>
      <button id="break-increment" onClick={() => this.incrementBreak()}>+</button>
      </div>
      </div>

    <div id="labelHeader">
    <label id="session-label">Session Length</label>
      <div>
      <button id="session-decrement" onClick={() => this.decrementSession()}>-</button>
      <span id="session-length">{this.state.sessionLength}</span>
      <button id="session-increment" onClick={() => this.incrementSession()}>+</button>
        </div>
      </div>
    </div>    

    {/* MAIN TIMER DISPLAY */}
    <div id="timer">
      <div id="timerContent" >
        <label id="timer-label">{this.state.timerName}</label>
        <span id="time-left">{formatTime(this.state.timeLeft)}</span>
      </div>
    </div>

    

  {/* START/STOP/RESET BUTTONS */}
    <div id="controls">     
     
      <button id="start_stop" onClick={()=> this.handleStart(console.log("clicked"))}>{this.state.timerOn ? 'Stop' : 'Start'}</button>

      {/* <button id="start_stop" onClick={()=> this.handleStop(console.log("clicked"))}>Stop</button> */}
 
      <button id="reset" onClick={() => this.resetCounter()}>Reset</button>
    </div>
    </div>

    <audio id="beep" src="http://dight310.byu.edu/media/audio/FreeLoops.com/1/1/Bongos%2001.wav-9261-Free-Loops.com.mp3" ref={this.audioBeep} />

    </div>
    );
  }
}

export default App;


