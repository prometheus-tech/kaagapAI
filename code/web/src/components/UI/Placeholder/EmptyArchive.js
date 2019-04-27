import React, { Component } from 'react';
import EmptyArchivePlaceholder from '../../../assets/Archive_Illustration.svg';
import { withStyles } from '@material-ui/core/styles';
import blueGrey from '@material-ui/core/colors/blueGrey';

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
  }
});
class EmptyArchive extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.emptyContainer}>
        <div className={classes.imgEmpty}>
          <img
            src={EmptyArchivePlaceholder}
            className={classes.emptyImg}
            alt="Empty client"
          />
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(EmptyArchive);
