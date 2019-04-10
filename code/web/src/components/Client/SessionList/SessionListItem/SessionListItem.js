import React from 'react';

import { Link } from 'react-router-dom';

import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { Avatar } from '@material-ui/core';
import FolderIcon from '@material-ui/icons/Folder';
import orange from '@material-ui/core/colors/orange';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Moment from 'react-moment';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = theme => ({
  listSession: {
    boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)',
    backgroundColor: 'transparent',
    padding: '16px',
    // '&:hover': {
    //   boxShadow: '0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)',
    //   borderRadius: '50px'
    // },
    transition:
      '.3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12)',
    '&:hover': {
      transform: 'scale(1.01)',
      boxShadow: '0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)'
    },
    marginTop: '1rem',
    borderRadius: '50px'
  },
  sessionName: {
    display: 'flex',
    alignItems: 'center'
  },
  sessionNameAvatar: {
    width: 60,
    height: 60,
    color: 'white',
    backgroundColor: orange[800],
    padding: '2px 2px 2px 2px',
    fontSize: theme.spacing.unit * 6
  },
  listItemName: {
    marginLeft: theme.spacing.unit * 1.5,
    fontSize: theme.spacing.unit * 2,
    fontWeight: 500,
    color: '#0000000'
  },
  listItem: {
    lineHeight: '150%',
    color: theme.palette.grey[600],
    fontSize: '14px'
  },
  listItemActions: {
    display: 'flex'
  },
  listItemActionEdit: {
    '&:hover': {
      color: orange[800]
    },
    marginRight: theme.spacing.unit
  },
  listItemActionArchive: {
    '&:hover': {
      color: orange[800]
    }
  },
  buttonBase: {
    display: 'block'
  }
});

function SessionListItem(props) {
  const { classes, session, sessionDeleted, sessionEdited } = props;

  const ListLink = props => (
    <Link to={'/session/' + session.session_id} {...props} />
  );

  return (
    <ButtonBase
      className={classes.buttonBase}
      disableRipple={true}
      disableTouchRipple={true}
      component={ListLink}
    >
      <Paper elevation={1} className={classes.listSession}>
        <Grid container spacing={16} alignItems="center">
          <Grid item xs={4}>
            <div className={classes.sessionName}>
              <Avatar className={classes.sessionNameAvatar}>
                <FolderIcon fontSize="large" />
              </Avatar>
              <Typography className={classes.listItemName} gutterBottom={false}>
                {session.session_name}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.listItem}>
              <Moment format="MMM D, YYYY" withTitle>
                {session.date_of_session}
              </Moment>
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <Typography className={classes.listItem}>
              Not yet implemented
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <div className={classes.listItemActions}>
              <IconButton
                onClick={e => {
                  e.preventDefault();
                  sessionEdited(session);
                }}
                className={classes.listItemActionEdit}
              >
                <Icon>edit</Icon>
              </IconButton>
              <IconButton
                onClick={e => {
                  e.preventDefault();
                  sessionDeleted(session);
                }}
                className={classes.listItemActionArchive}
              >
                <Icon>archive</Icon>
              </IconButton>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </ButtonBase>
  );
}
export default withStyles(styles)(SessionListItem);
