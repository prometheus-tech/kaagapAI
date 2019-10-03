import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import SearchField from '../../UI/SearchField/SearchField';
import ViewControl from '../../UI/ViewControl/ViewControl';

const styles = theme => ({
  root: {
    backgroundColor: '#f2f2f2',
    zIndex: 1,
    padding: '4px 24px 4px 24px',
    [theme.breakpoints.down('xs')]: {
      padding: '0px 16px 0px 16px'
    }
  },
  controlsContainer: {
    display: 'flex',
    alignItems: 'center'
  }
});

function ClientsSubHeader({ classes, searchPlaceholder, view, viewChanged }) {
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <div className={classes.controlsContainer}>
            <SearchField placeholder={searchPlaceholder} />
            <ViewControl view={view} viewChanged={viewChanged} />
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(ClientsSubHeader);
