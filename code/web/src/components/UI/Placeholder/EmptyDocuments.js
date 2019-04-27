import React, { Component } from 'react';
import EmptyDocuments from '../../../assets/Empty_Documents.svg';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import blueGrey from '@material-ui/core/colors/blueGrey';
import blue from '@material-ui/core/colors/blue';
import purple from '@material-ui/core/colors/purple';
import Icon from '@material-ui/core/Icon';

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
    fontSize: theme.spacing.unit * 2.5,
    marginRight: theme.spacing.unit * 2,
    color: blueGrey[700],
    fontWeight: 900
  },
  sayingEmptyPlaceholder: {
    fontSize: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit,
    color: blueGrey[300],
    fontSize: theme.spacing.unit * 2
  },
  extendedButton: {
    color: '#ffffff',
    background: purple[500],
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
class EmptyIllustrationDocuments extends Component {
  render() {
    const { classes, newUploadDocuments } = this.props;
    return (
      <div className={classes.emptyContainer}>
        <div className={classes.imgEmpty}>
          <img
            src={EmptyDocuments}
            className={classes.emptyImg}
            alt="Empty client"
          />
        </div>
        <div className={classes.actionSaying}>
          <Typography variant="h4" className={classes.sayingEmpty}>
            No files for your session
          </Typography>
          <Typography variant="h5" className={classes.sayingEmptyPlaceholder}>
            Start uploading your files to get results
          </Typography>
          <Fab
            color="primary"
            variant="extended"
            className={classes.extendedButton}
            onClick={newUploadDocuments}
          >
            <Icon className={classes.extendedIcon}>cloud_upload</Icon> Upload
            File
          </Fab>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(EmptyIllustrationDocuments);
