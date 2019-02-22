import React from 'react';

import Auxilliary from '../Auxilliary/Auxilliary';
import Header from '../../components/Navigation/Header/Header';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  mainGrid: {
    paddingRight: 24,
    paddingLeft: 24
  }
});

function Layout(props) {
  const { classes } = props;

  return (
    <Auxilliary>
      <Header />
      <Grid container className={classes.mainGrid}>
        {props.children}
      </Grid>
    </Auxilliary>
  );
}

export default withStyles(styles)(Layout);
