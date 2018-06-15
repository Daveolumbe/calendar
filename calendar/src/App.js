import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Calendar from './Components/Calendar/'

const style = {
  position: "relative",
  margin: "100px auto"
}
class App extends Component {
  render() {
    return (
      <div className="App">
      <Calendar style={style} width="604px" / >
      </div>
    );
  }
}

export default App;
