import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import EmotionItem from './EmotionItem/EmotionItem';

const styles = theme => ({
  paper: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    ...theme.mixins.gutters()
  },
  paperHeader: {
    paddingBottom: theme.spacing.unit * 2
  },
  sentimentGridItem: {
    marginTop: theme.spacing.unit * 2
  },
  overallSentimentLabel: {
    color: theme.palette.grey[600],
    fontSize: '16px',
    fontWeight: 500
  },
  sentimentValueText: {
    fontWeight: 400
  }
});

function EmotionsSentiment(props) {
  const { emotions, sentiment, classes } = props;

  const labels = ['joy', 'anger', 'disgust', 'sadness', 'fear'];

  return (
    <Paper elevation={1} className={classes.paper}>
      <Grid container spacing={16}>
        <Grid item xs={12} className={classes.paperHeader}>
          <Typography variant="h5">Emotions & Sentiment</Typography>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={16}>
            {labels.map((label, index) => {
              if (emotions[0][label] > 0) {
                return (
                  <Grid key={index} item xs={4}>
                    <EmotionItem label={label} score={emotions[0][label]} />
                  </Grid>
                );
              } else {
                return null;
              }
            })}
          </Grid>
        </Grid>
        <Grid item xs={12} className={classes.sentimentGridItem}>
          <Typography className={classes.overallSentimentLabel}>
            Overall Sentiment:{' '}
            <span className={classes.sentimentValueText}>
              {sentiment[0].label} ({sentiment[0].score})
            </span>
          </Typography>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default withStyles(styles)(EmotionsSentiment);
