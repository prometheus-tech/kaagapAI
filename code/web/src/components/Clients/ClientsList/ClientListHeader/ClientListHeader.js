import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import Auxilliary from '../../../../hoc/Auxilliary/Auxilliary';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

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
      <Typography
        component="span"
        gutterBottom={false}
        className={classes.listLabel}
      >
        {props.headerLabel}
        <Tooltip title="Reverse sort direction">
          <IconButton>
            <ArrowUpward />
          </IconButton>
        </Tooltip>
      </Typography>
    </Auxilliary>
  );
}

export default withStyles(styles)(ClientListHeader);
