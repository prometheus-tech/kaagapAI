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
import grey from '@material-ui/core/colors/grey';
import blue from '@material-ui/core/colors/blue';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import Moment from 'react-moment';
import ButtonBase from '@material-ui/core/ButtonBase';

const styles = theme => ({
  listSession: {
    height: '100px',
    boxShadow: 'none',
    backgroundColor: 'transparent',
    borderBottom: '1px solid #b2dfdb',
    borderRadius: '0px'
  },
  sessionName: {
    display: 'flex'
  },
  sessionNameAvatar: {
    display: 'flex',
    marginTop: theme.spacing.unit * 2.5,
    marginLeft: theme.spacing.unit * 5,
    width: 60,
    height: 60,
    backgroundColor: 'white',
    color: orange[700],
    padding: '2px 2px 2px 2px',
    fontSize: theme.spacing.unit * 6
  },
  listItemName: {
    marginTop: theme.spacing.unit * 5,
    marginLeft: theme.spacing.unit * 1.5,
    fontSize: theme.spacing.unit * 2,
    fontWeight: 500,
    color: grey[600],
    letterSpacing: '2px'
  },
  lastAction: {
    marginTop: theme.spacing.unit * 0.5,
    // marginLeft: theme.spacing.unit * 1.5,
    fontSize: '8px',
    letterSpacing: '1px',
    lineHeight: '150%',
    fontWeight: 300
  },
  listItem: {
    marginTop: theme.spacing.unit * 5.5,
    marginLeft: theme.spacing.unit * 5,
    letterSpacing: '1px',
    lineHeight: '150%',
    color: grey[400],
    fontSize: '12px'
  },
  listItemActions: {
    display: 'flex'
  },
  listItemActionView: {
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 4,
    letterSpacing: '1px',
    lineHeight: '150%',
    textTransform: 'capitalize',
    color: blue[500]
  },
  listItemActionEdit: {
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 4,
    letterSpacing: '1px',
    lineHeight: '150%',
    textTransform: 'capitalize',
    color: green[500]
  },
  listItemActionArchive: {
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit,
    letterSpacing: '1px',
    lineHeight: '150%',
    textTransform: 'capitalize',
    color: red[500]
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
        <Grid container spacing={16}>
          <Grid item xs={4}>
            <div className={classes.sessionName}>
              <Avatar className={classes.sessionNameAvatar}>
                <FolderIcon fontSize="large" />
              </Avatar>
              <Typography className={classes.listItemName}>
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
          <Grid item xs={2}>
            <Typography className={classes.listItem}>
              Not yet implemented
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <div className={classes.listItemActions}>
              {/* <IconButton className={classes.listItemActionView}>
                <Icon>remove_red_eye</Icon>
              </IconButton> */}
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
