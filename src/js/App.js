import React, { Component } from 'react';

import Router from '../components/Router.jsx';
import api from './shared/api';

import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      queens: [],
      user: null,
      users: [],
    };
  }

  async componentDidMount() {
    const queens = await api.getAllQueens();
    const users = await api.getAllUsers();
    this.setState({ queens, users });
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
        <Router
          onLogin={this.onLogin}
          onLogout={this.onLogout}
          queens={this.state.queens}
          user={this.state.user}
          users={this.state.users}
        />
      </div>
    );
  }
}

export default App;
