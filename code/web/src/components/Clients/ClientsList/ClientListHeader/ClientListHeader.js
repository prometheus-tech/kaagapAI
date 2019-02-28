import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Auxilliary from '../../../../hoc/Auxilliary/Auxilliary';
import Typography from '@material-ui/core/Typography';
import SortOrder from '../../../UI/SortOrder/SortOrder';

const styles = theme => ({
  listLabel: {
    fontSize: 15,
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.54)',
    cursor: 'pointer'
  }
});

function ClientListHeader(props) {
  const {
    classes,
    currentSortedByLabel,
    label,
    defaultSortOrder,
    sortOrder,
    sortOrderChanged,
    selectedIndexChanged
  } = props;

  let sortOrderButton =
    currentSortedByLabel === label ? (
      <SortOrder order={sortOrder} orderChanged={sortOrderChanged} />
    ) : null;

  return (
    <Auxilliary>
      <Typography
        component="span"
        gutterBottom={false}
        className={classes.listLabel}
        onClick={() => {
          selectedIndexChanged(label, defaultSortOrder);
        }}
      >
        {label}
        {sortOrderButton}
      </Typography>
    </Auxilliary>
  );
}

export default withStyles(styles)(ClientListHeader);
