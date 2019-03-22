import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Auxilliary from '../../../../hoc/Auxilliary/Auxilliary';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  listLabel: {
    fontSize: 15,
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.54)',
    cursor: 'pointer'
  }
});

function ClientListHeader(props) {
  const { classes, label } = props;

  return (
    <Auxilliary>
      <Typography
        component="span"
        gutterBottom={false}
        className={classes.listLabel}
      >
        {label}
      </Typography>
    </Auxilliary>
  );
}

export default withStyles(styles)(ClientListHeader);
