import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  paper: {
    padding: '16px',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    marginBottom: '10px'
  },
  listHeader: {
    color: grey[600],
    letterSpacing: '1px',
    fontWeight: 400,
    textTransform: 'uppercase',
    fontSize: '14px'
  }
});

function ClientListHeader(props) {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <Grid container spacing={16} alignItems="center">
        <Grid item xs={4}>
          <Typography
            className={classes.listHeader}
            style={{ fontWeight: 500 }}
          >
            Client Name
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography className={classes.listHeader}>Sessions</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography className={classes.listHeader}>Date added</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography className={classes.listHeader}>Last opened</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography className={classes.listHeader}>Actions</Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default withStyles(styles)(ClientListHeader);
