import React from 'react';

import { withStyles } from '@material-ui/core/styles';

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
    background: 'linear-gradient(to right, #8f94fb, #4e54c8)',
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
