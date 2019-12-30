import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
  root: {
    padding: '0px',
    margin: '0px'
  },
  paper: {
    padding: '16px',
    backgroundColor: 'transparent',
    boxShadow: 'none',
    marginBottom: '10px'
  },
  sessionHeader: {
    color: grey[600],
    letterSpacing: '1px',
    fontWeight: 400,
    textTransform: 'uppercase',
    fontSize: '14px'
  },
  sessionName: {
    color: grey[600],
    letterSpacing: '1px',
    fontWeight: 500,
    textTransform: 'uppercase',
    fontSize: '14px'
  }
});

function SessionListHeader(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={16} alignItems="center">
          <Grid item xs={4}>
            <Typography className={classes.sessionName}>
              Session Name
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.sessionHeader}>
              Date of Session
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.sessionHeader}>
              Last Opened
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Typography className={classes.sessionHeader}>Actions</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
export default withStyles(styles)(SessionListHeader);
