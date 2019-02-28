import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import SortOrder from '../../../CardSortControls/SortOrder/SortOrder';

const styles = theme => ({
  listLabel: {
    fontSize: 15,
    fontWeight: 600,
    color: 'rgba(0, 0, 0, 0.54)',
    cursor: 'pointer'
  },
  dropDownGrid: {
    display: 'flex',
    alignItems: 'center',
    cursor: 'pointer'
  }
});

function ClientListDropdownHeader(props) {
  const {
    classes,
    currentSortedByLabel,
    label,
    sortOrder,
    sortOrderChanged,
    sortSelectedIndexChanged,
    opened
  } = props;

  let sortOrderButton =
    currentSortedByLabel === label ? (
      <SortOrder order={sortOrder} orderChanged={sortOrderChanged} />
    ) : null;

  return (
    <Grid container spacing={0}>
      <Grid
        item
        xs={12}
        className={classes.dropDownGrid}
        onClick={() => {
          sortSelectedIndexChanged(label, 'desc');
        }}
      >
        <Typography
          component="span"
          gutterBottom={false}
          className={classes.listLabel}
          onClick={event => {
            event.stopPropagation();
            opened(event.currentTarget);
          }}
        >
          {label}
        </Typography>
        {sortOrderButton}
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(ClientListDropdownHeader);
