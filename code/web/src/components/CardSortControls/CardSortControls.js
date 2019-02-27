import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Dropdown from '../Dropdown/Dropdown';
import SortOrder from './SortOrder/SortOrder';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  container: {
    marginBottom: 32
  },
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
  const { classes } = props;
  const { anchorElement, selectedIndex, sortOrder } = props.sortSettings;

  return (
    <Grid
      container
      spacing={0}
      justify="flex-end"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={11} />
      <Grid item className={classes.sortControlGrid}>
        <Dropdown
          parent={
            <Button
              onClick={event => props.sortOptionsOpened(event.currentTarget)}
              className={classes.dropdownButton}
            >
              {props.sortingOptions[selectedIndex]}
            </Button>
          }
          options={props.sortingOptions}
          anchorElement={anchorElement}
          selectedIndex={selectedIndex}
          opened={props.sortOptionsOpened}
          selectedIndexChanged={props.sortSelectedIndexChanged}
          closed={props.sortOptionsClosed}
        />
        <SortOrder order={sortOrder} orderChanged={props.sortOrderChanged} />
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(CardSortControls);
