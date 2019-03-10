import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import { lightBlue } from '@material-ui/core/colors';

const styles = theme => ({
  extendedButton: {
    backgroundColor: lightBlue[600],
    color: '#ffffff',
    textTransform: 'capitalize',
    fontSize: 16,
    '&:hover': {
      backgroundColor: lightBlue[700],
      boxShadow: theme.shadows[8]
    },
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class NewClient extends Component {
  render() {
    const { classes } = this.props;

    return (
      <div>
        <Fab
          color="primary"
          variant="extended"
          className={classes.extendedButton}
        >
          <Add className={classes.extendedIcon} /> New Client
        </Fab>
      </div>
    );
  }
}

export default withStyles(styles)(NewClient);
