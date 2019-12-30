import React from 'react';

import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  mainGrid: {
    padding: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit * 4
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing.unit * 2
    }
  }
});

function Main(props) {
  return <div className={props.classes.mainGrid}>{props.children}</div>;
}

export default withStyles(styles)(Main);
