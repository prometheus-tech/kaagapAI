import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
  meter: {
    height: '15px',
    backgroundColor: '#e8e8e8',
    borderRadius: '25px',
    padding: '3px',
    position: 'relative'
  },
  fill: {
    display: 'block',
    height: '100%',
    borderTopRightRadius: '20px',
    borderBottomRightRadius: '20px',
    borderTopLeftRadius: '20px',
    borderBottomLeftRadius: '20px',
    backgroundColor: purple[500],
    position: 'relative',
    overflow: 'hidden'
  }
});

function RangeBar(props) {
  const { classes, maxValue, value } = props;

  const fillValue = (value / maxValue) * 100;

  return (
    <div className={classes.meter}>
      <span className={classes.fill} style={{ width: fillValue + '%' }} />
    </div>
  );
}

export default withStyles(styles)(RangeBar);
