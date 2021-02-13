import React from 'react';
import {withRouter} from 'react-router-dom';
import auth0Client from '../Auth';
import Button from 'react-bootstrap/Button';
import NavBar from 'react-bootstrap/Navbar';

import '../App.css';

function AuthNavBar(props) {
	const signOut = () => {
		auth0Client.signOut();
		props.history.replace('/');
	};

	return (
		<NavBar style={{ background: '#1c53c9', margin: 0 }}>
	{
		!auth0Client.isAuthenticated() &&
        <NavButton className="sign-in" variant="primary" size="sm" onClick={auth0Client.signIn}>Sign In</NavButton>
	}
	{
		auth0Client.isAuthenticated() &&
        <div>
          <label className="mr-2 text-white">{auth0Client.getProfile().name}</label>
          <NavButton className="sign-out" variant="primary" size="sm" onClick={() => {signOut()}}>Sign Out</NavButton>
        </div>
	}
	</NavBar>
  );
}

function NavButton(props) {
  return (
    <Button className="nav-button" href={props.path} size="lg">{props.name}</Button>
    );
  }
  
export default withRouter(AuthNavBar);
export { NavButton };