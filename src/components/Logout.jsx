import React from 'react';
import PropTypes from 'prop-types';
import { GoogleLogout } from 'react-google-login';

function Logout({ onLogout }) {
  const onSuccess = async () => {
    alert('Logout made successfully');
    await onLogout();
  };

  return (
    <div>
      <GoogleLogout
        clientId={process.env.REACT_APP_CLIENT_ID}
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
