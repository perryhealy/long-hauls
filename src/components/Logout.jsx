import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogout } from 'react-google-login';

// TODO: move this into an environment variable
const clientId = '47074991686-f8t945ggrggrddm5mdvi9alkof42fj5r.apps.googleusercontent.com';

function Logout({ onLogout }) {
  const onSuccess = async () => {
    alert('Logout made successfully');
    await onLogout();
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  );
}

Logout.propTypes = {
  onLogout: PropTypes.func.isRequired,
}

export default Logout;
Logout.displayName = 'Logout';
