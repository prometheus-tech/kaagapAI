import React from 'react';

import { Link } from 'react-router-dom';

import DELETE_SESSION from '../../../../graphql/mutations/deleteSession';
import { Mutation } from 'react-apollo';
import CLIENT from '../../../../graphql/queries/client';
import ARCHIVES from '../../../../graphql/queries/archives';

import { cloneDeep } from 'apollo-utilities';

import { withSnackbar } from 'notistack';

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
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  listSession: {
    boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)',
    backgroundColor: 'white',
    padding: '16px',
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
  const { classes, session, sessionEdited } = props;

  const { c_id, session_id, session_name, date_of_session } = session;

  const ListLink = props => (
    <Link to={'/session/' + session.session_id} {...props} />
  );

  return (
    <Mutation
      mutation={DELETE_SESSION}
      update={(cache, { data: { deleteSession } }) => {
        const clientQueryParams = {
          query: CLIENT,
          variables: { c_id }
        };

        const { client } = cloneDeep(cache.readQuery(clientQueryParams));

        client.sessions = client.sessions.filter(
          s => s.session_id !== deleteSession.session_id
        );

        client.no_of_sessions = client.sessions.length;

        cache.writeQuery({
          ...clientQueryParams,
          data: {
            client
          }
        });

        const { archives } = cloneDeep(cache.readQuery({ query: ARCHIVES }));

        archives.sessions.push(deleteSession);

        cache.writeQuery({
          query: ARCHIVES,
          data: {
            archives
          }
        });

        props.enqueueSnackbar(session_name + ' archived!');
      }}
      optimisticResponse={{
        __typename: 'Mutation',
        deleteSession: {
          __typename: 'Session',
          c_id,
          session_id,
          session_name,
          date_of_session
        }
      }}
    >
      {deleteSession => (
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
                  <Typography
                    className={classes.listItemName}
                    gutterBottom={false}
                  >
                    {session_name}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={3}>
                <Typography className={classes.listItem}>
                  <Moment format="MMM D, YYYY" withTitle>
                    {date_of_session}
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
                  <Tooltip title="Edit">
                    <IconButton
                      onClick={e => {
                        e.preventDefault();
                        sessionEdited(session);
                      }}
                      className={classes.listItemActionEdit}
                    >
                      <Icon>edit</Icon>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Archive">
                    <IconButton
                      onClick={e => {
                        e.preventDefault();
                        deleteSession({
                          variables: {
                            session_id
                          }
                        });
                      }}
                      className={classes.listItemActionArchive}
                    >
                      <Icon>archive</Icon>
                    </IconButton>
                  </Tooltip>
                </div>
              </Grid>
            </Grid>
          </Paper>
        </ButtonBase>
      )}
    </Mutation>
  );
}
export default withStyles(styles)(withSnackbar(SessionListItem));
