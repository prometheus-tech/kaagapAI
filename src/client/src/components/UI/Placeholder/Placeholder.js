import React from 'react';

import blueGrey from '@material-ui/core/colors/blueGrey';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    display: 'inline-block',
    width: '100%',
    textAlign: 'center'
  },
  imgWrapper: {
    display: 'flex',
    justifyContent: 'center'
  },
  img: {
    height: '45vh'
  },
  messageContainer: {
    display: 'inline-block',
    textAlign: 'center'
  },
  mainText: {
    marginTop: theme.spacing.unit * 5,
    fontSize: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    color: blueGrey[700],
    fontWeight: 900
  },
  subText: {
    fontSize: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    color: blueGrey[300]
  }
});

function Placeholder(props) {
  const { classes, illustration, alt, mainText, subText } = props;
  return (
    <div className={classes.root}>
      <div className={classes.imgWrapper}>
        <img src={illustration} className={classes.img} alt={alt} />
      </div>
      <div className={classes.messageContainer}>
        <Typography variant="h4" className={classes.mainText}>
          {mainText}
        </Typography>
        <Typography variant="h5" className={classes.subText}>
          {subText}
        </Typography>
      </div>
    </div>
  );
}

export default withStyles(styles)(Placeholder);
