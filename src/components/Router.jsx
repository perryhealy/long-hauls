import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Link, Routes} from 'react-router-dom';

// Components
import Login from './Login';
import Logout from './Logout';
import Main from '../js/Main';
import NavBar from 'react-bootstrap/Navbar';
import NavButton from './NavButton';
import User from '../js/User';

// Utilities
import { userShape } from '../js/shared/dataShapes';


function Router(props) {
  return (
    <BrowserRouter>
      <NavBar>
        <img id='logo' src={require('../assets/s13_logo.jpg')} alt='logo' />
        <NavButton name="Home" path="/long-hauls">Home</NavButton>
        {props.user ? (
          <div style={{ display: "contents" }}>
            <NavButton name="User" path={`long-hauls/user/${props.user.id}`}>Profile</NavButton>
            <Logout onLogout={props.onLogout} />
          </div>
        ) : (
          <Login onLogin={props.onLogin} />
        )}
      </NavBar>
      <Routes>
        <Route path="/long-hauls">
          <Route index element={<Main user={props.user} users={props.users} />} />
          <Route path="user/:userId" element={<User user={props.user} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

Router.propTypes = {
  onLogin: PropTypes.func.isRequired,
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.shape(userShape),
  users: PropTypes.arrayOf(PropTypes.shape(userShape)),
}

export default Router;
