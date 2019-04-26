import React from 'react';

import RESTORE_SESSION from '../../../../graphql/mutations/restoreSession';
import { Mutation } from 'react-apollo';
import CLIENT from '../../../../graphql/queries/client';
import SESSION from '../../../../graphql/queries/session';
import ARCHIVES from '../../../../graphql/queries/archives';

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
import Tooltip from '@material-ui/core/Tooltip';
import CircularProgress from '@material-ui/core/CircularProgress';

import { cloneDeep } from 'apollo-utilities';

const styles = theme => ({
  card: {
    boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)',
    marginTop: '1rem',
    background: '#fff',
    borderRadius: '6px',
    maxWidth: '230px',
    transition:
      '.3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12)',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)',
      padding: '0px 0px 0px 0px'
    }
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
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  }
});

function ArchivedSessionCard(props) {
  const { session, classes } = props;

  const { c_id, session_id, session_name, date_of_session } = session;

  return (
    <Mutation
      mutation={RESTORE_SESSION}
      update={(cache, { data: { restoreSession } }) => {
        const { archives } = cloneDeep(cache.readQuery({ query: ARCHIVES }));

        archives.sessions = archives.sessions.filter(
          session => session.session_id !== restoreSession.session_id
        );

        cache.writeQuery({
          query: ARCHIVES,
          data: {
            archives
          }
        });

        props.enqueueSnackbar(session_name + ' successfully restored!');
      }}
      refetchQueries={() => {
        return [
          { query: CLIENT, variables: { c_id } },
          { query: SESSION, variables: { session_id } }
        ];
      }}
      awaitRefetchQueries={true}
    >
      {(restoreSession, { loading }) => (
        <Card className={classes.card}>
          <ButtonBase
            className={classes.buttonBase}
            disableRipple={true}
            disableTouchRipple={true}
            onClick={() => {
              alert('Please restore first');
            }}
            component="div"
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
          <CardActions className={classes.actions}>
            {!loading ? (
              <Tooltip title="Restore">
                <IconButton
                  disableRipple={true}
                  aria-label="Restore"
                  className={classes.iconAction}
                  onClick={() => {
                    restoreSession({ variables: { session_id } });
                  }}
                >
                  <Icon>restore_from_trash</Icon>
                </IconButton>
              </Tooltip>
            ) : (
              <CircularProgress className={classes.progress} />
            )}
          </CardActions>
        </Card>
      )}
    </Mutation>
  );
}

export default withStyles(styles)(withSnackbar(ArchivedSessionCard));
