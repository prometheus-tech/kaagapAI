import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import purple from '@material-ui/core/colors/purple';

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
    backgroundColor: purple[500]
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 120,
    fontWeight: 400,
    fontSize: 16,
    marginRight: theme.spacing.unit * 2,
    '&:hover': {
      color: purple[500],
      opacity: 1
    },
    '&$tabSelected': {
      color: purple[500],
      fontWeight: 500
    },
    '&:focus': {
      color: purple[500]
    }
  },
  tabSelected: {}
});

function SessionSubHeader({
  classes,
  tabValue,
  tabValueChanged,
  searchPlaceholder
}) {
  return (
    <div className={classes.root}>
      <Grid container alignItems="center">
        <Grid item xs={12}>
          <Tabs
            value={tabValue}
            onChange={tabValueChanged}
            classes={{
              root: classes.tabsRoot,
              indicator: classes.tabsIndicator
            }}
          >
            <Tab
              label="Files"
              classes={{
                root: classes.tabRoot,
                selected: classes.tabSelected
              }}
              disableRipple
            />
            <Tab
              label="Analysis"
              classes={{
                root: classes.tabRoot,
                selected: classes.tabSelected
              }}
              disableRipple
            />
          </Tabs>
        </Grid>
      </Grid>
    </div>
  );
}

export default withStyles(styles)(SessionSubHeader);
