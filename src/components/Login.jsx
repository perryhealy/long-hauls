import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../js/shared/utils';

function Login({ onLogin }) {
  const onSuccess = async (res) => {
    console.log('[Login Success] currentUser:', res.profileObj);

    // initializing the setup
    refreshTokenSetup(res);

    // Setting our user
    await onLogin(res.profileObj);
  };

  const onFailure = (res) => {
    console.log('[Login failed] res:', res);
  };

  return (
    <div>
      <GoogleLogin
        clientId={process.env.REACT_APP_CLIENT_ID}
        buttonText="Login with Google"
        onSuccess={onSuccess}
        onFailure={onFailure}
        cookiePolicy={'single_host_origin'}
        style={{ marginTop: '100px' }}
        isSignedIn={true}
      />
    </div>
  );
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
}

export default Login;
Login.displayName = 'Login';
