import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import Auxilliary from '../../../../hoc/Auxilliary/Auxilliary';
import Typography from '@material-ui/core/Typography';
import SortOrder from '../../../CardSortControls/SortOrder/SortOrder';

const styles = theme => ({
  listLabel: {
    fontSize: 15,
    fontWeight: 600,
    color: blueGrey[600]
  }
});

function ClientListHeader(props) {
  const { classes } = props;

  let sortOrderButton =
    props.currentSortedByLabel === props.headerLabel ? (
      <SortOrder
        order={props.sortOrder}
        orderChanged={props.sortOrderChanged}
      />
    ) : null;

  return (
    <Auxilliary>
      <Typography
        component="span"
        gutterBottom={false}
        className={classes.listLabel}
        onClick={() => {
          props.selectedIndexChanged(props.headerLabel);
        }}
      >
        {props.headerLabel}
        {sortOrderButton}
      </Typography>
    </Auxilliary>
  );
}

export default withStyles(styles)(ClientListHeader);
