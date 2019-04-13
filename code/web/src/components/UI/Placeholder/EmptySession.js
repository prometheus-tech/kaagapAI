import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import EmptySessionImg from '../../../assets/empty_session.svg';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import orange from '@material-ui/core/colors';

const styles = theme => ({
  emptyContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  emptyImg: {
    marginTop: theme.spacing.unit * 2,
    height: '50vh'
  },
  sayingEmpty: {
    marginTop: theme.spacing.unit * 15,
    fontSize: theme.spacing.unit * 5,
    marginRight: theme.spacing.unit * 2
  },
  extendedButton: {
    background: orange[800],
    color: '#ffffff',
    textTransform: 'capitalize',
    borderRadius: '50px',
    fontSize: 16,
    '&:hover': {
      backgroundColor: orange[900],
      boxShadow: theme.shadows[10]
    },
    marginTop: theme.spacing.unit * 4,
    padding: '5px 25px 5px 25px'
  }
});
class EmptySession extends Component {
  render() {
    const { classes, newSessionOpened } = this.props;
    return (
      <div className={classes.emptyContainer}>
        <div>
          <Typography variant="h4" className={classes.sayingEmpty}>
            Let's be productive
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
        <img className={classes.emptyImg} src={EmptySessionImg} alt="" />
      </div>
    );
  }
}
export default withStyles(styles)(EmptySession);
