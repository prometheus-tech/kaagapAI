import React from 'react';

import { Link } from 'react-router-dom';

import DELETE_SESSION from '../../../../graphql/mutations/deleteSession';
import { Mutation } from 'react-apollo';
import CLIENT from '../../../../graphql/queries/client';

import { withSnackbar } from 'notistack';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import Moment from 'react-moment';
import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import ButtonBase from '@material-ui/core/ButtonBase';
import Hidden from '@material-ui/core/Hidden';
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Tooltip from '@material-ui/core/Tooltip';

import { cloneDeep } from 'apollo-utilities';

const styles = theme => ({
  card: {
    boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)',
    marginTop: '1rem',
    background: '#fff',
    borderRadius: '6px',
    width: '230px',
    transition:
      '.3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12)',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)',
      padding: '0px 0px 0px 0px'
    }
  },
  cardMobile: {
    boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)',
    marginTop: '1rem',
    background: '#fff',
    borderRadius: '6px',
    transition:
      '.3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12)'
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px auto',
    marginBottom: theme.spacing.unit * 2
  },
  avatar: {
    width: '70px',
    height: '70px',
    color: 'white',
    backgroundColor: orange[800]
  },
  cardTitle: {
    width: '90%',
    fontWeight: '500',
    color: grey[900],
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  cardSubheader: {
    fontWeight: '400',
    fontSize: '14px',
    marginBottom: 0,
    color: theme.palette.grey[600]
  },
  iconAction: {
    '&:hover': {
      color: orange[800]
    }
  },
  buttonBase: {
    display: 'block'
  }
});

function SessionCard(props) {
  const { session, classes, sessionEdited } = props;

  const { c_id, session_id, session_name, date_of_session } = session;

  const CardLink = props => (
    <Link to={'/session/' + session.session_id} {...props} />
  );

  return (
    <Mutation
      mutation={DELETE_SESSION}
      update={(
        cache,
        {
          data: {
            deleteSession: { c_id, session_id, session_name }
          }
        }
      ) => {
        const clientQueryParams = {
          query: CLIENT,
          variables: { c_id }
        };

        const { client } = cloneDeep(cache.readQuery(clientQueryParams));

        client.sessions = client.sessions.filter(
          s => s.session_id !== session_id
        );

        client.no_of_sessions = client.sessions.length;

        cache.writeQuery({
          ...clientQueryParams,
          data: {
            client
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
          session_name
        }
      }}
    >
      {deleteSession => (
        <div>
          <Hidden smDown>
            <Card className={classes.card}>
              <ButtonBase
                className={classes.buttonBase}
                disableRipple={true}
                disableTouchRipple={true}
                component={CardLink}
              >
                <CardContent>
                  <div className={classes.avatarContainer}>
                    <Avatar className={classes.avatar}>
                      <FolderIcon fontSize="large" />
                    </Avatar>
                  </div>
                  <Typography
                    noWrap
                    variant="h6"
                    className={classes.cardTitle}
                    align="center"
                  >
                    {session_name}
                  </Typography>
                  <Typography className={classes.cardSubheader} align="center">
                    <Moment format="MMM D, YYYY" withTitle>
                      {date_of_session}
                    </Moment>
                  </Typography>
                </CardContent>
              </ButtonBase>
              <CardActions>
                <Tooltip title="Edit">
                  <IconButton
                    disableRipple={true}
                    aria-label="Edit"
                    className={classes.iconAction}
                    onClick={e => {
                      e.preventDefault();
                      sessionEdited(session);
                    }}
                  >
                    <Icon>edit</Icon>
                  </IconButton>
                </Tooltip>
                <Tooltip title="Archive">
                  <IconButton
                    disableRipple={true}
                    aria-label="Archive"
                    className={classes.iconAction}
                    onClick={e => {
                      e.preventDefault();
                      deleteSession({
                        variables: {
                          session_id
                        }
                      });
                    }}
                  >
                    <Icon>archive</Icon>
                  </IconButton>
                </Tooltip>
              </CardActions>
            </Card>
          </Hidden>
          <Hidden mdUp>
            <ButtonBase
              className={classes.buttonBase}
              disableRipple={true}
              disableTouchRipple={true}
              component={CardLink}
            >
              <CardHeader
                className={classes.cardMobile}
                avatar={
                  <div className={classes.avatarContainer}>
                    <Avatar className={classes.avatar}>
                      <FolderIcon fontSize="large" />
                    </Avatar>
                  </div>
                }
                action={
                  <IconButton style={{ transform: 'rotate(90deg)' }}>
                    <MoreVertIcon />
                  </IconButton>
                }
                title={
                  <Typography
                    noWrap
                    variant="h6"
                    className={classes.cardTitle}
                    align="left"
                  >
                    {session.session_name}
                  </Typography>
                }
                subheader={
                  <Typography className={classes.cardSubheader}>
                    <Moment format="MMM D, YYYY" withTitle>
                      {session.date_of_session}
                    </Moment>
                  </Typography>
                }
              />
            </ButtonBase>
          </Hidden>
        </div>
      )}
    </Mutation>
  );
}

export default withStyles(styles)(withSnackbar(SessionCard));
