import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

function SimpleSnackbar({ isOpened, message }) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={isOpened}
      message={message}
      TransitionComponent={TransitionRight}
    />
  );
}

export default SimpleSnackbar;
