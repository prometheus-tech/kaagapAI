import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import SortList from './SortList/SortList';
import SortOrder from './SortOrder/SortOrder';

const styles = theme => ({
  container: {
    marginBottom: 32
  }
});

function CardSortControls(props) {
  const { classes } = props;

  return (
    <Grid
      container
      spacing={0}
      justify="flex-end"
      alignItems="center"
      className={classes.container}
    >
      <Grid item xs={11} />
      <Grid item>
        <SortList
          options={props.sortingOptions}
          anchorElement={props.cardSortAnchorElement}
          selectedIndex={props.cardSortSelectedIndex}
          optionsOpened={props.sortOptionsOpened}
          selectedIndexChanged={props.sortSelectedIndexChanged}
          optionsClosed={props.sortOptionsClosed}
        />
        <SortOrder
          order={props.sortOrder}
          orderChanged={props.sortOrderChanged}
        />
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(CardSortControls);
