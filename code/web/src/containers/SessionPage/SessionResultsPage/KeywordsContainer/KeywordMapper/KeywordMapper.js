import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  keywordMapperHeader: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  mainText: {
    marginBottom: theme.spacing.unit
  },
  chip: {
    marginRight: theme.spacing.unit
  }
});

function KeywordMapper(props) {
  const { classes } = props;

  const { text, relevance, count } = props.keyword;
  return (
    <Paper elevation={1}>
      <div className={classes.keywordMapperHeader}>
        <Typography className={classes.mainText} variant="h5">
          {text}
        </Typography>
        <Chip
          variant="outlined"
          className={classes.chip}
          label={'Count: ' + count}
        />
        <Chip
          variant="outlined"
          className={classes.chip}
          label={'Relevance: ' + relevance}
        />
      </div>
      <Divider light />
      
    </Paper>
  );
}

export default withStyles(styles)(KeywordMapper);
