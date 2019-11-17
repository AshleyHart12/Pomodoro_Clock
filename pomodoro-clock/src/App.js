import React from 'react';
import './App.css';

const sound ='';

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      breakLength: 5,
      sessionLength: 25,
      timerOn: false,
      minutes: 25,
      seconds: 0,
      intervalId: 0
    };
    // this.handleClick = this.handleClick.bind(this);
  }
  
decrementBreak(){
  if (this.state.breakLength > 1){
    this.setState({
      breakLength: this.state.breakLength - 1
    })
  }   
};

incrementBreak(){
  if (this.state.breakLength < 60) {
    this.setState({
    breakLength: this.state.breakLength + 1
    })
  }
};

decrementSession(){
  if (this.state.sessionLength > 1) {
    this.setState(({minutes, sessionLength}) => ({
      minutes: minutes - 1,
      sessionLength: sessionLength - 1
    }))
  }
};

incrementSession(){
  if (this.state.sessionLength < 60) {
    this.setState(({minutes, sessionLength}) => ({
      minutes: minutes + 1,
      sessionLength: sessionLength + 1
    }))
  }
};

getSeconds(){
 if (this.state.seconds > 0) {
  return ("0" + Math.floor(this.state.seconds % 60)).slice(-2);
 }
};

getMinutes() {
  if(this.state.seconds > 0) {
    return ("0" + Math.floor(this.state.seconds % 3600 / 60)).slice(-2)
  }
};

playAudio(){
  sound = new sound("http://mattersofgrey.com/audio/Minecraft-meow2.mp3")  
}

handleStart(){
    this.timer = setInterval(() => {
      const { seconds, minutes } = this.state

      if (seconds > 0) {
        this.setState(({seconds}) => ({
          seconds: seconds - 1
        }))
      }
      if (seconds === 0) {
        if (minutes === 0){   
          clearInterval(this.myInterval);
          this.playAudio()
        } else {
          this.setState(({minutes}) => ({
            minutes: minutes - 1,
            seconds: 59
          }))
        }
      }
    }, 1000)
    };

  handleStop(){
    clearInterval(this.timer);
    }

resetCounter(){
  clearInterval(this.timer);
    this.setState({
      minutes: 25,
      seconds: 0,
      timerOn: false,
      breakLength: 5,
      sessionLength: 25,
      intervalId: 0,
      buttonText: "Start"
    })
};


render() {
const { minutes, seconds } = this.state

return (
  <div className="App">

 
    <div id="titleHeader">
      <p id="rainbowHeader">Pomodoro Clock
        </p>
      </div>


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
        <label id="timer-label">Session</label>
        <span id="time-left">{minutes} : {seconds < 10 ? `0${seconds}` : seconds}</span>
      </div>
    </div>

    

  {/* START/STOP/RESET BUTTONS */}
    <div id="controls">     
     
      <button id="start_stop" onClick={()=> this.handleStart(console.log("clicked"))}>Start</button>
      <button id="start_stop" onClick={()=> this.handleStop(console.log("clicked"))}>Stop</button>
 
      <button id="reset" onClick={() => this.resetCounter()}>Reset</button>
    </div>

  </div>
);
}

}

export default App;


