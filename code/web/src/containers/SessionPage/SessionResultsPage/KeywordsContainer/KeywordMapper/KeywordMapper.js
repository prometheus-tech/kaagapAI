import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
  box: {
    border: '1px solid rgba(0, 0, 0, 0.23)',
    borderRadius: '10px',
    paddingBottom: 16
  },
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
  },
  divider: {
    backgroundColor: 'rgba(0, 0, 0, 0.23)'
  }
});

function KeywordMapper(props) {
  const { classes } = props;

  const { text, relevance, count } = props.keyword;
  return (
    <div className={classes.box}>
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
      <Divider className={classes.divider} light />
    </div>
  );
}

export default withStyles(styles)(KeywordMapper);
