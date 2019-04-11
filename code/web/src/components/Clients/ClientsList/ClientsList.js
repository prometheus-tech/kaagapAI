import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import ClientListItem from './ClientListItem/ClientListItem';
import ClientListHeader from './ClientListHeader/ClientListHeader';
import Hidden from '@material-ui/core/Hidden';

const styles = theme => ({
  listContainer: {
    padding: theme.spacing.unit,
    paddingTop: 0,
    paddingBottom: 8,
    [theme.breakpoints.down('xs')]: {
      paddingRight: 0,
      paddingLeft: 0
    },
    [theme.breakpoints.up('sm')]: {
      paddingRight: 16,
      paddingLeft: 16
    },
    [theme.breakpoints.up('md')]: {
      paddingRight: 62,
      paddingLeft: 62
    }
  },
  listHeader: {
    ...theme.mixins.gutters(),
    paddingTop: 0,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: 'transparent'
  }
});

function ClientsList(props) {
  const { classes, clients } = props;

  return (
    <Auxilliary>
      <Grid
        container
        spacing={0}
        className={classes.listContainer}
        alignItems="center"
      >
        <Grid item xs={12}>
          <Paper className={classes.listHeader} elevation={0}>
            <Grid container spacing={0} alignItems="center">
              <Hidden xsDown>
                <Grid item md={4} sm={7}>
                  <ClientListHeader label="Name" />
                </Grid>
              </Hidden>
              <Hidden xsDown>
                <Grid item md={2} sm={4}>
                  <ClientListHeader label="Sessions" />
                </Grid>
              </Hidden>
              <Hidden smDown>
                <Grid item md={2} sm={false}>
                  <ClientListHeader label="Date Added" />
                </Grid>
                <Grid item md={3} sm={false}>
                  <ClientListHeader label="Last Opened" />
                </Grid>
                <Grid item md={1} sm={2} xs={2} />
              </Hidden>
            </Grid>
          </Paper>
        </Grid>
      </Grid>

      <Grid
        container
        spacing={0}
        className={classes.listContainer}
        alignItems="center"
      >
        {clients.map(client => {
          return (
            <Grid item key={client.c_id} xs={12}>
              <ClientListItem client={client} />
            </Grid>
          );
        })}
      </Grid>
    </Auxilliary>
  );
}

export default withStyles(styles)(ClientsList);
