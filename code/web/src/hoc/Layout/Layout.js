import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Auxilliary from '../Auxilliary/Auxilliary';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  mainGrid: {
    padding: 24
  }
});

function Layout(props) {
  const { classes } = props;

  return (
    <Auxilliary>
      {/* Header goes here */}
      <Grid container className={classes.mainGrid}>
        {props.children}
      </Grid>
    </Auxilliary>
  );
}

export default withStyles(styles)(Layout);
