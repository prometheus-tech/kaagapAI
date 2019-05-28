import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import FaceIcon from '@material-ui/icons/Face';
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
    fontSize: theme.spacing.unit,
    color: theme.palette.grey[600]
  },
  emoticon: {
    width: '96px',
    marginBottom: theme.spacing.unit
  },
  chip: {
    border: '1px solid ' + theme.palette.grey[600],
    fontWeight: 300,
    padding: '5px 2.5px 5px 2.5px',
    backgroundColor: 'transparent'
  }
});

function EmotionItem({ classes, label, score }) {
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
      <Chip
        variant="outlined"
        className={classes.chip}
        label={'Score = ' + Math.round(score * 100) / 100}
      />
    </div>
  );
}

export default withStyles(styles)(EmotionItem);
