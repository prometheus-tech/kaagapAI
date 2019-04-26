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
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Hidden from '@material-ui/core/Hidden';
import CardHeader from '@material-ui/core/CardHeader';
import Tooltip from '@material-ui/core/Tooltip';

import { cloneDeep } from 'apollo-utilities';

import { withSnackbar } from 'notistack';

const styles = theme => ({
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
  mobileCard: {
    boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)',
    marginTop: '1rem',
    backgroundColor: '#fff',
    borderRadius: '6px',
    transition:
      '.3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12)'
  },
  nameClient: {
    width: '90%',
    color: grey[900],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: '500'
  },
  nameClientMobile: {
    width: '200px',
    color: grey[900],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: '600',
    marginBottom: theme.spacing.unit
  },
  session: {
    fontWeight: '400',
    fontSize: '14px',
    marginBottom: 0,
    color: theme.palette.grey[600]
  },
  sessionMobile: {
    fontWeight: '300',
    fontSize: '14px',
    marginTop: '15px',
    color: theme.palette.grey[600],
    marginBottom: theme.spacing.unit
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
  const { c_id, fname, lname, no_of_sessions, p_id } = client;
  const name = fname + ' ' + lname;
  const sessions =
    no_of_sessions > 0 ? no_of_sessions + ' sessions' : 'No sessions yet';

  const CardLink = props => <Link to={'/client/' + client.c_id} {...props} />;

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

        props.enqueueSnackbar(fname + ' ' + lname + ' successfully archived!');
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
        <div>
          <Hidden smDown>
            <Card className={classes.card}>
              <ButtonBase
                disableRipple={true}
                disableTouchRipple={true}
                component={CardLink}
                className={classes.buttonBase}
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
              <CardActions>
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
          </Hidden>
          <Hidden mdUp>
            <ButtonBase
              className={classes.buttonBase}
              disableRipple={true}
              disableTouchRipple={true}
              component={CardLink}
            >
              <CardHeader
                className={classes.mobileCard}
                avatar={
                  <Avatar className={classes.avatar}>
                    <Icon fontSize="large">person</Icon>
                  </Avatar>
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
                    align="left"
                    className={classes.nameClientMobile}
                  >
                    {name}
                  </Typography>
                }
                subheader={
                  <Typography align="left" className={classes.sessionMobile}>
                    {sessions}
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

export default withStyles(styles)(withSnackbar(ClientCard));
