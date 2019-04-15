import React from 'react';

import { Link } from 'react-router-dom';

import DELETE_CLIENT from '../../../../graphql/mutations/deleteClient';
import { Mutation } from 'react-apollo';
import CLIENTS from '../../../../graphql/queries/clients';
import { cloneDeep } from 'apollo-utilities';

import { withSnackbar } from 'notistack';

import { withStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import Typography from '@material-ui/core/Typography';
import Moment from 'react-moment';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import ArchiveIcon from '@material-ui/icons/Archive';
import Tooltip from '@material-ui/core/Tooltip';

const styles = theme => ({
  buttonBase: {
    display: 'block'
  },
  paper: {
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
  clientAvatarNameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    width: 60,
    height: 60,
    color: 'white',
    backgroundColor: '#0091ea',
    padding: '2px 2px 2px 2px'
  },
  clientName: {
    marginLeft: theme.spacing.unit * 1.5,
    fontSize: theme.spacing.unit * 2,
    fontWeight: 500,
    width: '70%',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  listItem: {
    color: theme.palette.grey[600],
    fontSize: '14px'
  },
  listItemActions: {
    display: 'flex',
    alignItems: 'center'
  },
  actionButton: {
    '&:hover': {
      color: '#0091ea'
    }
  }
});

function ClientListItem(props) {
  const { classes, client, clientEdited } = props;

  const {
    p_id,
    c_id,
    fname,
    lname,
    no_of_sessions,
    date_added,
    last_opened
  } = client;

  const ListItemLink = props => <Link to={'/client/' + c_id} {...props} />;

  return (
    <Mutation
      mutation={DELETE_CLIENT}
      update={(
        cache,
        {
          data: {
            deleteClient: { c_id, fname, lname }
          }
        }
      ) => {
        const clientsQueryParams = {
          query: CLIENTS,
          variables: { p_id }
        };

        const { clients } = cloneDeep(cache.readQuery(clientsQueryParams));

        cache.writeQuery({
          ...clientsQueryParams,
          data: {
            clients: clients.filter(c => c.c_id !== c_id)
          }
        });

        props.enqueueSnackbar(fname + ' ' + lname + ' archived!');
      }}
      optimisticResponse={{
        __typename: 'Mutation',
        deleteClient: {
          __typename: 'Client',
          c_id: client.c_id,
          fname: client.fname,
          lname: client.lname
        }
      }}
    >
      {deleteClient => (
        <ButtonBase
          className={classes.buttonBase}
          component={ListItemLink}
          disableRipple={true}
          disableTouchRipple={true}
        >
          <Paper className={classes.paper}>
            <Grid container spacing={16} alignItems="center">
              <Grid item xs={4}>
                <div className={classes.clientAvatarNameContainer}>
                  <Avatar className={classes.avatar}>
                    <PersonIcon fontSize="large" />
                  </Avatar>
                  <Typography noWrap className={classes.clientName}>
                    {fname + ' ' + lname}
                  </Typography>
                </div>
              </Grid>
              <Grid item xs={2}>
                <Typography className={classes.listItem}>
                  {no_of_sessions}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography className={classes.listItem}>
                  <Moment format="MMM D, YYYY" withTitle>
                    {date_added}
                  </Moment>
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography className={classes.listItem}>
                  {last_opened !== null ? (
                    <Moment format="MMM D, YYYY" withTitle>
                      {last_opened}
                    </Moment>
                  ) : (
                    'Not yet opened'
                  )}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <div className={classes.listItemActions}>
                  <Tooltip title="Edit">
                    <IconButton
                      className={classes.actionButton}
                      style={{ marginRight: '8px' }}
                      onClick={e => {
                        e.preventDefault();
                        clientEdited(client);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title="Archive">
                    <IconButton
                      className={classes.actionButton}
                      onClick={e => {
                        e.preventDefault();
                        deleteClient({ variables: { c_id } });
                      }}
                    >
                      <ArchiveIcon />
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

export default withStyles(styles)(withSnackbar(ClientListItem));
