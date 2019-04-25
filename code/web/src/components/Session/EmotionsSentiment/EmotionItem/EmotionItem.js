import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import FaceIcon from '@material-ui/icons/Face';
import Typography from '@material-ui/core/Typography';
import HappyIcon from '../../../../assets/Happy.svg';
import AngerIcon from '../../../../assets/Anger.svg';
import DisgustIcon from '../../../../assets/Disgust.svg';
import SadnessIcon from '../../../../assets/Sadness.svg';
import FearIcon from '../../../../assets/Fear.svg';

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
    fontSize: theme.spacing.unit * 2
  },
  subLabel: {
    fontSize: theme.spacing.unit * 2,
    color: theme.palette.grey[600]
  },
  emoticon: {
    width: '96px',
    marginBottom: theme.spacing.unit * 2
  }
});

function EmotionItem(props) {
  const { classes, label, score } = props;

  let color = '';
  let image = null;

  switch (label) {
    case 'joy':
      image = <img src={HappyIcon} alt="Joy" className={classes.emoticon} />;
      color = '#fdd835';
      break;
    case 'anger':
      image = <img src={AngerIcon} alt="Anger" className={classes.emoticon} />;
      color = '#e53935';
      break;
    case 'disgust':
      image = (
        <img src={DisgustIcon} alt="Disgust" className={classes.emoticon} />
      );
      color = '#43a047';
      break;
    case 'sadness':
      image = (
        <img src={SadnessIcon} alt="Sadness" className={classes.emoticon} />
      );
      color = '#1e88e5';
      break;
    case 'fear':
      image = <img src={FearIcon} alt="Fear" className={classes.emoticon} />;
      color = '#212121';
      break;
    default:
      image = <FaceIcon className={classes.icon} />;
  }

  return (
    <div className={classes.emotionItem}>
      {image}
      <Typography className={classes.mainLabel} style={{ color: color }}>
        {label}
      </Typography>
      <Typography className={classes.subLabel}>{'Score = ' + score}</Typography>
    </div>
  );
}

export default withStyles(styles)(EmotionItem);
