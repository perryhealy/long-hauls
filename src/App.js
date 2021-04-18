import React, { Component } from 'react';

import Main from './Main.js';
import Login from './components/Login';
import Logout from './components/Logout';
import api from './api';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null,
      users: [],
    };
  }

  async componentDidMount() {
    const users = await api.getAllUsers();
    this.setState({ users });
  }

  onLogin = async (profileObj) => {
    let users = this.state.users;
    const user = users.find((u) => u.email === profileObj.email);
    if (!user) {
      await api.createUser({
        name: profileObj.givenName,
        email: profileObj.email,
        private: true,
      });

      users = await api.getAllUsers();
    }
    this.setState({ user, users });
  };

  onLogout = () => {
    this.setState({ user: null });
  };

  render() {
    return (
      <div className='App'>
        <div className='navBar'>
          <img id='logo' src={require('./s13_logo.jpg')} alt='logo' />
          {this.state.user === null ? (
            <Login onLogin={this.onLogin} />
          ) : (
            <Logout onLogout={this.onLogout} />
          )}
        </div>
        <Main user={this.state.user} users={this.state.users} />
      </div>
    );
  }
}

export default App;
