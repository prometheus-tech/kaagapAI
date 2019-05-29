import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import EmptyCustomSessionsResultImage from '../../../assets/empty_custom_result.svg';
import Typography from '@material-ui/core/Typography';
import blueGrey from '@material-ui/core/colors/blueGrey';
import Fab from '@material-ui/core/Fab';
import TrendsIcon from '@material-ui/icons/Timeline';

const styles = theme => ({
  emptyContainer: {
    display: 'inline-block',
    width: '100%',
    textAlign: 'center'
  },
  imgEmpty: {
    display: 'flex',
    justifyContent: 'center'
  },
  emptyImg: {
    marginTop: theme.spacing.unit * 3,
    height: '50vh'
  },
  actionSaying: {
    display: 'inline-block',
    textAlign: 'center'
  },
  sayingEmpty: {
    marginTop: theme.spacing.unit * 5,
    fontSize: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    color: blueGrey[700],
    fontWeight: 800
  },
  extendedButton: {
    color: '#ffffff',
    background: '#ef6c00',
    textTransform: 'capitalize',
    borderRadius: '50px',
    fontSize: 16,
    '&:hover': {
      backgroundColor: '#e65100',
      boxShadow: theme.shadows[10]
    },
    marginTop: theme.spacing.unit * 4,
    padding: '5px 25px 5px 25px'
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

function EmptyCustomSessionsResult({ classes, selectSessionsDialogOpened }) {
  return (
    <div className={classes.emptyContainer}>
      <div className={classes.imgEmpty}>
        <img
          src={EmptyCustomSessionsResultImage}
          className={classes.emptyImg}
          alt="Empty client"
        />
      </div>
      <div className={classes.actionSaying}>
        <Typography variant="h4" className={classes.sayingEmpty}>
          Analyze and find trends across multiple sessions
        </Typography>
        <Fab
          color="primary"
          variant="extended"
          className={classes.extendedButton}
          onClick={selectSessionsDialogOpened}
        >
          <TrendsIcon className={classes.extendedIcon} /> Select Sessions
        </Fab>
      </div>
    </div>
  );
}

export default withStyles(styles)(EmptyCustomSessionsResult);
