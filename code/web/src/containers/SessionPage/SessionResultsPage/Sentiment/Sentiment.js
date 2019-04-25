import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import RangeBar from '../../../../components/UI/RangeBar/RangeBar';

const styles = theme => ({
  paper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    ...theme.mixins.gutters()
  },
  paperHeader: {
    paddingBottom: theme.spacing.unit * 2
  },
  sentimentHeader: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  sentimentHeaderLabel: {
    fontSize: 24,
    color: theme.palette.grey[600],
    fontWeight: 300
  }
});

function Sentiment(props) {
  const { classes, sentiment } = props;

  const { label, score } = sentiment[0];

  return (
    <Paper elevation={2} className={classes.paper}>
      <Grid container spacing={16}>
        <Grid item xs={12} className={classes.paperHeader}>
          <Typography variant="h5">Sentiment</Typography>
        </Grid>
        <Grid item xs={12}>
          <RangeBar minValue={1} maxValue={2} value={score + 1} />
          <div className={classes.sentimentHeader}>
            <Typography className={classes.sentimentHeaderLabel}>-1</Typography>
            <Typography className={classes.sentimentHeaderLabel}>0</Typography>
            <Typography className={classes.sentimentHeaderLabel}>+1</Typography>
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default withStyles(styles)(Sentiment);
