import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import 'typeface-roboto';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import { blueGrey } from '@material-ui/core/colors';
import ClientListItem from './ClientListItem/ClientListItem';

const styles = theme => ({
  listContainer: {
    padding: theme.spacing.unit,
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
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    backgroundColor: 'transparent'
  },
  listLabel: {
    fontSize: 15,
    fontWeight: 600,
    color: blueGrey[600]
  }
});

function ClientsList(props) {
  const { classes } = props;

  let clients = null;

  if (props.clients.length > 0) {
    clients = props.clients.map(client => {
      return (
        <Grid item xs={12}>
          <ClientListItem client={client} />
        </Grid>
      );
    });
  }

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
            <Grid container spacing={0}>
              <Grid item md={4}>
                <Typography gutterBottom={false} className={classes.listLabel}>
                  Name
                </Typography>
              </Grid>
              <Grid item md={2}>
                <Typography gutterBottom={false} className={classes.listLabel}>
                  Sessions
                </Typography>
              </Grid>
              <Grid item md={2}>
                <Typography gutterBottom={false} className={classes.listLabel}>
                  Date created
                </Typography>
              </Grid>
              <Grid item md={3}>
                <Typography gutterBottom={false} className={classes.listLabel}>
                  Last activity
                </Typography>
              </Grid>
              <Grid item md={1} />
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
        {clients}
      </Grid>
    </Auxilliary>
  );
}

export default withStyles(styles)(ClientsList);
