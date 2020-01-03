import React from 'react';

import { Link } from 'react-router-dom';

import DELETE_CLIENT from '../../../../graphql/mutations/deleteClient';
import { Mutation } from 'react-apollo';
import CLIENTS from '../../../../graphql/queries/clients';

import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import Icon from '@material-ui/core/Icon';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import ButtonBase from '@material-ui/core/ButtonBase';
import grey from '@material-ui/core/colors/grey';
import Tooltip from '@material-ui/core/Tooltip';

import { cloneDeep } from 'apollo-utilities';

import { withSnackbar } from 'notistack';

const styles = theme => ({
  card: {
    boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)',
    marginTop: '2rem',
    background: '#fff',
    borderRadius: '6px',
    width: '230px',
    transition:
      '.3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12)',
    '&:hover': {
      boxShadow: '0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)'
    },
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      padding: `${theme.spacing.unit * 1}px`
    }
  },
  cardContent: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex'
    }
  },
  avatarContainer: {
    display: 'inline-flex',
    justifyContent: 'center',
    margin: '10px auto',
    marginBottom: theme.spacing.unit * 2,
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      margin: '0',
      textAlign: 'left'
    }
  },
  avatar: {
    backgroundColor: '#0091ea',
    height: '70px',
    width: '70px',
    [theme.breakpoints.down('xs')]: {
      width: '50px',
      height: '50px',
      marginRight: theme.spacing.unit * 2
    }
  },
  cardTextContainer: {
    [theme.breakpoints.down('xs')]: {
      flexGrow: 1,
      textAlign: 'left'
    }
  },
  clientName: {
    color: grey[900],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: '500'
  },
  sessionCount: {
    fontWeight: '400',
    fontSize: '14px',
    marginBottom: 0,
    color: theme.palette.grey[600]
  },
  iconHover: {
    '&:hover': {
      color: '#2196f3'
    }
  },
  buttonBase: {
    display: 'block'
  }
});

function ClientCard(props) {
  const { classes, client, clientEdited } = props;
  const {
    c_id,
    fname,
    lname,
    no_of_sessions,
    gender,
    birthdate,
    date_added,
    last_opened
  } = client;
  const name = fname + ' ' + lname;
  const sessions =
    no_of_sessions > 0 ? no_of_sessions + ' sessions' : 'No sessions yet';

  const CardLink = props => <Link to={'/client/' + client.c_id} {...props} />;

  return (
    <Mutation
      mutation={DELETE_CLIENT}
      update={(cache, { data: { deleteClient } }) => {
        const clientsQueryParams = {
          query: CLIENTS
        };

        const { clients } = cloneDeep(cache.readQuery(clientsQueryParams));

        cache.writeQuery({
          ...clientsQueryParams,
          data: {
            clients: clients.filter(c => c.c_id !== deleteClient.c_id)
          }
        });

        props.enqueueSnackbar(fname + ' ' + lname + ' successfully archived!');
      }}
      optimisticResponse={{
        __typename: 'Mutation',
        deleteClient: {
          __typename: 'Client',
          c_id,
          fname,
          lname,
          gender,
          birthdate,
          no_of_sessions,
          date_added,
          last_opened
        }
      }}
      errorPolicy="all"
      onError={error => {
        // Ignore error
      }}
    >
      {deleteClient => (
        <Card className={classes.card}>
          <ButtonBase
            disableRipple={true}
            disableTouchRipple={true}
            component={CardLink}
            className={classes.buttonBase}
          >
            <CardContent className={classes.cardContent}>
              <div className={classes.avatarContainer}>
                <Avatar className={classes.avatar}>
                  <Icon fontSize="large">person</Icon>
                </Avatar>
              </div>
              <div className={classes.cardTextContainer}>
                <Typography noWrap variant="h6" className={classes.clientName}>
                  {name}
                </Typography>
                <Typography className={classes.sessionCount}>
                  {sessions}
                </Typography>
              </div>
            </CardContent>
          </ButtonBase>
          <CardActions className={classes.cardActions}>
            <Tooltip title="Edit">
              <IconButton
                className={classes.iconHover}
                disableRipple={true}
                aria-label="Edit"
                onClick={e => {
                  e.preventDefault();
                  clientEdited(client);
                }}
              >
                <Icon>edit</Icon>
              </IconButton>
            </Tooltip>
            <Tooltip title="Archive">
              <IconButton
                className={classes.iconHover}
                disableRipple={true}
                aria-label="Archive"
                onClick={e => {
                  e.preventDefault();
                  deleteClient({ variables: { c_id } });
                }}
              >
                <Icon>archive</Icon>
              </IconButton>
            </Tooltip>
          </CardActions>
        </Card>
      )}
    </Mutation>
  );
}

export default withStyles(styles)(withSnackbar(ClientCard));
