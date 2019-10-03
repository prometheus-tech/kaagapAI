import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  overallSentimentLabel: {
    color: theme.palette.grey[600],
    fontSize: '16px',
    fontWeight: 500,
    marginTop: theme.spacing.unit * 4
  },
  sentimentValueText: {
    fontWeight: 400
  }
});

function Sentiment({ classes, sentiment }) {
  return (
    <Typography className={classes.overallSentimentLabel}>
      Overall Sentiment:{' '}
      <span className={classes.sentimentValueText}>
        {sentiment.label} ({Math.round(sentiment.score * 100) / 100})
      </span>
    </Typography>
  );
}

export default withStyles(styles)(Sentiment);
