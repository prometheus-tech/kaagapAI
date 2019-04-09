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
    marginTop: theme.spacing.unit * 3,
    borderRadius: '8px 8px 0px 0px',
    boxShadow: 'none',
    marginBottom: '10px'
  },
  sessionHeader: {
    marginTop: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * 5,
    color: grey[900],
    letterSpacing: '1px',
    lineHeight: '150%',
    fontWeight: 300,
    textTransform: 'uppercase',
    fontSize: '12px'
  },
  sessionName: {
    marginTop: theme.spacing.unit * 1,
    marginLeft: theme.spacing.unit * 5,
    color: grey[600],
    letterSpacing: '1px',
    lineHeight: '150%',
    fontWeight: 400,
    textTransform: 'uppercase',
    fontSize: '12px'
  }
});

function SessionListHeader(props) {
  const { classes } = props;

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={16}>
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
          <Grid item xs={2}>
            <Typography className={classes.sessionHeader}>
              Last Opened
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.sessionHeader}>Actions</Typography>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
export default withStyles(styles)(SessionListHeader);
