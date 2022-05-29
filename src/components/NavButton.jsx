import React from 'react';
import PropTypes from 'prop-types';

import Button from 'react-bootstrap/Button';

function NavButton(props) {
  return (
    <Button className='navButton' href={props.path} size='lg'>
      {props.name}
    </Button>
  );
}

NavButton.propTypes = {
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
}

export default NavButton;
NavButton.displayName = 'NavButton';
