import React, { Component } from 'react';
import Main from './Main.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }

  render() {

    return (
      <div className="App">
        <img id="logo" src={require('./s13_logo.jpg')} alt='logo'/>
        <Main user={this.state.user}/>
      </div>
    );
  }
}

export default App;
