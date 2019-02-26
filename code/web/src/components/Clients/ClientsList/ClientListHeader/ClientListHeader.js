import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import Auxilliary from '../../../../hoc/Auxilliary/Auxilliary';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  listLabel: {
    fontSize: 15,
    fontWeight: 600,
    color: blueGrey[600]
  }
});

function ClientListHeader(props) {
  const { classes } = props;

  return (
    <Auxilliary>
      <Typography gutterBottom={false} className={classes.listLabel}>
        {props.headerLabel}
      </Typography>
    </Auxilliary>
  );
}

export default withStyles(styles)(ClientListHeader);
