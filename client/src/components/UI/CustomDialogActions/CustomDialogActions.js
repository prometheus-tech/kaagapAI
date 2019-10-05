import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import MuiDialogActions from '@material-ui/core/DialogActions';

const styles = theme => ({
  root: {
    borderTop: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit
  }
});

function CustomDialogActions(props) {
  const { classes, children } = props;
  return (
    <MuiDialogActions className={classes.root}>{children}</MuiDialogActions>
  );
}

export default withStyles(styles)(CustomDialogActions);
