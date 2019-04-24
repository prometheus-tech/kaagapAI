import React, { Component } from 'react';
import EmptyClients from '../../../assets/Empty_Clients.svg';
import Typography from '@material-ui/core/Typography';
import Add from '@material-ui/icons/Add';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import grey from '@material-ui/core/colors/grey';
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
    fontSize: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 2,
    letterSpacing: '2px',
    fontWeight: '300',
    color: grey[400]
  },
  extendedButton: {
    color: '#ffffff',
    background: '#0091ea',
    textTransform: 'capitalize',
    borderRadius: '50px',
    fontSize: 16,
    '&:hover': {
      backgroundColor: blue[900],
      boxShadow: theme.shadows[10]
    },
    marginTop: theme.spacing.unit * 4,
    padding: '5px 25px 5px 25px'
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
            Let's be productive and stay positive...
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
