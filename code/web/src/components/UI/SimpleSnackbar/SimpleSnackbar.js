import React from 'react';

import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';

function TransitionRight(props) {
  return <Slide {...props} direction="right" />;
}

function SimpleSnackbar({ isOpened }) {
  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={isOpened}
      message={<span>Adding client...</span>}
      TransitionComponent={TransitionRight}
    />
  );
}

export default SimpleSnackbar;
