import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';

const styles = theme => ({
  selectedTab: {
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
    boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)',
    cursor: 'pointer'
  },
  tab: {
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit,
    backgroundColor: 'transparent',
    cursor: 'pointer'
  },
  tabItemWrapper: {
    display: 'flex',
    alignItems: 'center'
  },
  selectedTabText: {
    fontSize: '16px',
    color: orange[600],
    fontWeight: 500
  },
  tabText: {
    fontSize: '16px',
    color: grey[600]
  }
});

function ResultsVertTabs({
  classes,
  tabsData,
  currentTabIndex,
  tabValueChanged
}) {
  return (
    <div>
      {tabsData.map((tabItemData, index) => {
        return (
          <Paper
            key={index}
            className={
              index === currentTabIndex ? classes.selectedTab : classes.tab
            }
            elevation={0}
            onClick={e => {
              tabValueChanged(e, index);
            }}
          >
            <div className={classes.tabItemWrapper}>
              {tabItemData.icon}
              <Typography
                className={
                  index === currentTabIndex
                    ? classes.selectedTabText
                    : classes.tabText
                }
              >
                {tabItemData.label}
              </Typography>
            </div>
          </Paper>
        );
      })}
    </div>
  );
}

export default withStyles(styles)(ResultsVertTabs);
