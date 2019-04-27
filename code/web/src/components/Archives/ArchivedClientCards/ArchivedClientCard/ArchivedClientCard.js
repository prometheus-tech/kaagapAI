import React from 'react';

import { Mutation } from 'react-apollo';
import RESTORE_CLIENT from '../../../../graphql/mutations/restoreClient';
import CLIENTS from '../../../../graphql/queries/clients';
import ARCHIVES from '../../../../graphql/queries/archives';
import CLIENT from '../../../../graphql/queries/client';

import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import ButtonBase from '@material-ui/core/ButtonBase';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Icon from '@material-ui/core/Icon';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import CardActions from '@material-ui/core/CardActions';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { cloneDeep } from 'apollo-utilities';
import CircularProgress from '@material-ui/core/CircularProgress';

import { withSnackbar } from 'notistack';

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
  buttonBase: {
    display: 'block'
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px auto',
    marginBottom: theme.spacing.unit * 2
  },
  avatar: {
    backgroundColor: '#0091ea',
    height: '70px',
    width: '70px',
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing.unit * 2,
      height: '60px',
      width: '60px'
    }
  },
  nameClient: {
    width: '90%',
    color: grey[900],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: '500'
  },
  session: {
    fontWeight: '400',
    fontSize: '14px',
    marginBottom: 0,
    color: theme.palette.grey[600]
  },
  actions: {
    display: 'flex',
    justifyContent: 'flex-end'
  },
  iconHover: {
    '&:hover': {
      color: '#2196f3'
    }
  }
});

function ArchivedClientCard(props) {
  const { classes, client } = props;

  const { c_id, fname, lname, no_of_sessions } = client;
  const name = fname + ' ' + lname;
  const sessions =
    no_of_sessions > 0 ? no_of_sessions + ' sessions' : 'No sessions yet';

  return (
    <Mutation
      mutation={RESTORE_CLIENT}
      update={(cache, { data: { restoreClient } }) => {
        const { archives } = cloneDeep(cache.readQuery({ query: ARCHIVES }));

        archives.clients = archives.clients.filter(
          c => c.c_id !== restoreClient.c_id
        );

        cache.writeQuery({
          query: ARCHIVES,
          data: {
            archives
          }
        });

        props.enqueueSnackbar(fname + ' ' + lname + ' successfully restored!');
      }}
      refetchQueries={() => {
        return [{ query: CLIENTS }, { query: CLIENT, variables: { c_id } }];
      }}
      awaitRefetchQueries={true}
      errorPolicy="all"
      onError={(error) => {
        // Ignore error
      }}
    >
      {(restoreClient, { loading }) => (
        <Card className={classes.card}>
          <ButtonBase
            disableRipple={true}
            disableTouchRipple={true}
            className={classes.buttonBase}
            onClick={() => {
              alert('Please restore first');
            }}
            component="div"
          >
            <CardContent>
              <div className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <Icon fontSize="large">person</Icon>
                </Avatar>
              </div>
              <Typography
                noWrap
                variant="h6"
                align="center"
                className={classes.nameClient}
              >
                {name}
              </Typography>
              <Typography className={classes.session} align="center">
                {sessions}
              </Typography>
            </CardContent>
          </ButtonBase>
          <CardActions className={classes.actions}>
            {!loading ? (
              <Tooltip title="Restore">
                <IconButton
                  className={classes.iconHover}
                  disableRipple={true}
                  aria-label="Restore"
                  onClick={e => {
                    e.preventDefault();
                    restoreClient({ variables: { c_id } });
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

export default withStyles(styles)(withSnackbar(ArchivedClientCard));
