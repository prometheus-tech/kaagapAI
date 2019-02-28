import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dropdown from '../../UI/Dropdown/Dropdown';
import SortOrder from '../../UI/SortOrder/SortOrder';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  dropdownButton: {
    textTransform: 'capitalize',
    color: 'rgba(0, 0, 0, 0.54)'
  },
  sortControlGrid: {
    display: 'flex',
    alignItems: 'center'
  }
});

function CardSortControls(props) {
  const {
    classes,
    sortOptions,
    sortOptionsOpened,
    sortSelectedIndexChanged,
    sortOptionsClosed,
    sortOrderChanged
  } = props;
  const { anchorElement, selectedIndex, sortOrder } = props.sortSettings;

  return (
    <Grid container spacing={0} justify="flex-end" alignItems="center">
      <Grid item xs={11} />
      <Grid item className={classes.sortControlGrid}>
        <Button
          onClick={event => sortOptionsOpened(event.currentTarget)}
          className={classes.dropdownButton}
        >
          {sortOptions[selectedIndex]}
        </Button>
        <Dropdown
          options={sortOptions}
          anchorElement={anchorElement}
          selectedIndex={selectedIndex}
          opened={sortOptionsOpened}
          selectedIndexChanged={sortSelectedIndexChanged}
          closed={sortOptionsClosed}
        />
        <SortOrder order={sortOrder} orderChanged={sortOrderChanged} />
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(CardSortControls);
