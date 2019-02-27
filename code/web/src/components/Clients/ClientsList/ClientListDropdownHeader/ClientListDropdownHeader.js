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
  const { classes } = props;

  let sortOrderButton =
    props.currentSortedByLabel === props.label ? (
      <SortOrder
        order={props.sortOrder}
        orderChanged={props.sortOrderChanged}
      />
    ) : null;

  return (
    <Grid container spacing={0}>
      <Grid
        item
        xs={12}
        className={classes.dropDownGrid}
        onClick={() => {
          props.sortSelectedIndexChanged(props.label, 'desc');
        }}
      >
        <Typography
          component="span"
          gutterBottom={false}
          className={classes.listLabel}
          onClick={event => {
            event.stopPropagation();
            props.opened(event.currentTarget);
          }}
        >
          {props.label}
        </Typography>
        {sortOrderButton}
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(ClientListDropdownHeader);
