import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogin } from 'react-google-login';
import { refreshTokenSetup } from '../util/utils';

// TODO: move this into an environment variable
const clientId = '47074991686-f8t945ggrggrddm5mdvi9alkof42fj5r.apps.googleusercontent.com';

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
        clientId={clientId}
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
