import React from 'react';
import { GoogleLogout } from 'react-google-login';

const clientId = '47074991686-f8t945ggrggrddm5mdvi9alkof42fj5r.apps.googleusercontent.com';

function Logout() {
  const onSuccess = () => {
    alert('Logout made successfully');
  };

  return (
    <div>
      <GoogleLogout
        clientId={clientId}
        buttonText="Logout"
        onLogoutSuccess={onSuccess}
      />
    </div>
  )
}

export default Logout;
Logout.displayName = 'Logout';
