import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import MuiDialogContent from '@material-ui/core/DialogContent';

const styles = theme => ({
  root: {
    margin: 0,
    padding: theme.spacing.unit * 2
  }
});

function CustomDialogContent(props) {
  const { classes, children } = props;

  return (
    <MuiDialogContent className={classes.root}>{children}</MuiDialogContent>
  );
}

export default withStyles(styles)(CustomDialogContent);
