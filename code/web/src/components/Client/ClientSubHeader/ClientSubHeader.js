import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import SearchField from '../../UI/SearchField/SearchField';
import ViewControl from '../../UI/ViewControl/ViewControl';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import orange from '@material-ui/core/colors/orange';

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
  },
  tabsRoot: {},
  tabsIndicator: {
    backgroundColor: orange[800]
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 120,
    fontWeight: 400,
    fontSize: 16,
    marginRight: theme.spacing.unit * 2,
    '&:hover': {
      color: orange[800],
      opacity: 1
    },
    '&$tabSelected': {
      color: orange[800],
      fontWeight: 500
    },
    '&:focus': {
      color: orange[800]
    }
  },
  tabSelected: {}
});

function ClientSubHeader({
  classes,
  tabValue,
  tabValueChanged,
  searchPlaceholder,
  view,
  viewChanged
}) {
  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={6}>
          <Tabs
            value={tabValue}
            onChange={tabValueChanged}
            classes={{
              root: classes.tabsRoot,
              indicator: classes.tabsIndicator
            }}
          >
            <Tab
              label="Sessions"
              classes={{
                root: classes.tabRoot,
                selected: classes.tabSelected
              }}
              disableRipple
            />
            <Tab
              label="Sessions Analysis"
              classes={{
                root: classes.tabRoot,
                selected: classes.tabSelected
              }}
              disableRipple
            />
          </Tabs>
        </Grid>
        {tabValue === 0 && (
          <Grid item xs={6}>
            <div className={classes.controlsContainer}>
              <SearchField placeholder={searchPlaceholder} />
              <ViewControl view={view} viewChanged={viewChanged} />
            </div>
          </Grid>
        )}
      </Grid>
    </div>
  );
}

export default withStyles(styles)(ClientSubHeader);
