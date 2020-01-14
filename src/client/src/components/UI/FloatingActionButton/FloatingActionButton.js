import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

const styles = theme => ({
  floatingButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    background: 'linear-gradient(to top, #8f94fb, #4e54c8)',
    boxShadow: theme.shadows[24],
    color: '#ffffff',
    '&:hover': {
      boxShadow: theme.shadows[10]
    },
    zIndex: 2
  }
});

function FloatingActionButton(props) {
  const { classes, icon = <AddIcon />, action } = props;

  return (
    <Fab
      size="large"
      color="primary"
      className={classes.floatingButton}
      onClick={action}
      disableRipple={false}
      disableFocusRipple={false}
    >
      {icon}
    </Fab>
  );
}

export default withStyles(styles)(FloatingActionButton);
