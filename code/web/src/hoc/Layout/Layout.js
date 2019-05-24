import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Auxilliary from '../Auxilliary/Auxilliary';
import Header from '../../components/Navigation/Header/Header';
import SubHeader from '../../components/Navigation/SubHeader/SubHeader';
import Grid from '@material-ui/core/Grid';

const styles = theme => ({
  mainGrid: {
    padding: theme.spacing.unit * 8,
    paddingBottom: theme.spacing.unit * 3,
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing.unit * 4
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing.unit * 2
    }
  },
  toolbar: theme.mixins.toolbar
});

function Layout(props) {
  const { classes } = props;

  return (
    <Auxilliary>
      <Header />
      <SubHeader />
      <div className={classes.toolbar} />
      <Grid container className={classes.mainGrid}>
        {props.children}
      </Grid>
    </Auxilliary>
  );
}

export default withStyles(styles)(Layout);
