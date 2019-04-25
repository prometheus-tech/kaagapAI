import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  emotionItem: {
    textAlign: 'center'
  },
  icon: {
    fontSize: theme.spacing.unit * 14
  },
  mainLabel: {
    textTransform: 'uppercase',
    fontWeight: 500,
    fontSize: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * -1
  },
  subLabel: {
    fontSize: theme.spacing.unit * 2,
    color: theme.palette.grey[600]
  }
});

function EmotionItem(props) {
  const { classes, label, score } = props;

  let color = '';

  switch (label) {
    case 'joy':
      color = '#fdd835';
      break;
    case 'anger':
      color = '#e53935';
      break;
    case 'disgust':
      color = '#43a047';
      break;
    case 'sadness':
      color = '#1e88e5';
      break;
    case 'fear':
      color = '#212121';
      break;
    default:
      color = '#e8e8e8';
  }

  return (
    <div className={classes.emotionItem}>
      <FaceIcon className={classes.icon} style={{ color: color }} />
      <Typography className={classes.mainLabel} style={{ color: color }}>
        {label}
      </Typography>
      <Typography className={classes.subLabel}>{'Score = ' + score}</Typography>
    </div>
  );
}

export default withStyles(styles)(EmotionItem);
