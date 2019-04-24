import React, { Component } from 'react';
import EmptySessionImg from '../../../assets/empty_session.svg';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import grey from '@material-ui/core/colors/grey';

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
    fontSize: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 2,
    letterSpacing: '2px',
    fontWeight: '300',
    color: grey[400]
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
            Let's be productive and stay positive...
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
