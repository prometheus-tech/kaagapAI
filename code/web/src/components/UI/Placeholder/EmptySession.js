import React, { Component } from 'react';
import EmptySessionImg from '../../../assets/empty_session.svg';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import blueGrey from '@material-ui/core/colors/blueGrey';
import blue from '@material-ui/core/colors/blue';

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
    marginTop: theme.spacing.unit * 5,
    height: '45vh'
  },
  actionSaying: {
    display: 'inline-block',
    textAlign: 'center'
  },
  sayingEmpty: {
    marginTop: theme.spacing.unit * 5,
    fontSize: theme.spacing.unit * 2.5,
    marginRight: theme.spacing.unit * 2,
    color: blueGrey[700],
    fontWeight: 900
  },
  sayingEmptyPlaceholder: {
    fontSize: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    color: blueGrey[300]
  },
  extendedButton: {
    background: 'linear-gradient(to top, #8f94fb, #4e54c8)',
    color: '#ffffff',
    textTransform: 'capitalize',
    borderRadius: 3,
    fontSize: 15,
    '&:hover': {
      backgroundColor: blue[900]
    },
    margin: theme.spacing.unit,
    padding: '3px 20px 3px 20px',
    width: '13vw',
    boxShadow: 'none'
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});
class EmptySession extends Component {
  render() {
    const { classes, newSessionOpened } = this.props;
    return (
      <div className={classes.emptyContainer}>
        <div className={classes.imgEmpty}>
          <img
            src={EmptySessionImg}
            className={classes.emptyImg}
            alt="Empty client"
          />
        </div>
        <div className={classes.actionSaying}>
          <Typography variant="h4" className={classes.sayingEmpty}>
            It's empty in here
          </Typography>
          <Typography variant="h5" className={classes.sayingEmptyPlaceholder}>
            Create a folder for your session
          </Typography>
          <Fab
            color="primary"
            variant="extended"
            className={classes.extendedButton}
            onClick={newSessionOpened}
          >
            <Add className={classes.extendedIcon} /> New Session
          </Fab>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(EmptySession);
