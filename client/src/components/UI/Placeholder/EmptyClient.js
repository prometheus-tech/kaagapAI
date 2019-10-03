import React, { Component } from 'react';
import EmptyClients from '../../../assets/Empty_Clients.svg';
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
    height: '45vh'
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
    padding: '3px 15px 3px 15px',
    width: '15vw',
    boxShadow: 'none'
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});
class EmptyClient extends Component {
  render() {
    const { classes, newClientsOpened } = this.props;
    return (
      <div className={classes.emptyContainer}>
        <div className={classes.imgEmpty}>
          <img
            src={EmptyClients}
            className={classes.emptyImg}
            alt="Empty client"
          />
        </div>
        <div className={classes.actionSaying}>
          <Typography variant="h4" className={classes.sayingEmpty}>
            Looks like you don't have any client yet,
          </Typography>
          <Typography variant="h5" className={classes.sayingEmptyPlaceholder}>
            add a new client to get started.
          </Typography>
          <Fab
            color="primary"
            variant="extended"
            className={classes.extendedButton}
            onClick={newClientsOpened}
          >
            <Add className={classes.extendedIcon} /> New Client
          </Fab>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(EmptyClient);
