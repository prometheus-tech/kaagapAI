import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { Doughnut } from 'react-chartjs-2';

const styles = theme => ({
  paper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    ...theme.mixins.gutters()
  },
  paperHeader: {
    paddingBottom: theme.spacing.unit * 2
  }
});

function Emotions(props) {
  const { emotions, classes } = props;

  const { joy, anger, disgust, sadness, fear } = emotions[0];

  const data = {
    labels: ['Joy', 'Anger', 'Disgust', 'Sadness', 'Fear'],
    datasets: [
      {
        data: [joy, anger, disgust, sadness, fear],
        backgroundColor: [
          '#FFEB3B',
          '#F44336',
          '#8BC34A',
          '#2196F3',
          '#212121'
        ],
        hoverBackgroundColor: [
          '#FFEB3B',
          '#F44336',
          '#8BC34A',
          '#2196F3',
          '#212121'
        ]
      }
    ]
  };

  return (
    <Paper elevation={1} className={classes.paper}>
      <Grid container spacing={16}>
        <Grid item xs={12} className={classes.paperHeader}>
          <Typography variant="h5">Emotions</Typography>
        </Grid>
        <Grid item xs={12}>
          <Doughnut data={data} />
        </Grid>
      </Grid>
    </Paper>
  );
}

export default withStyles(styles)(Emotions);
