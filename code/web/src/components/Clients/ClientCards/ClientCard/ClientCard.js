import React from 'react';

import { Link } from 'react-router-dom';

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

const styles = theme => ({
  avatar: {
    backgroundColor: '#0091ea',
    margin: '10px auto',
    height: '70px',
    width: '70px',
    textTransform: 'uppercase',
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
    },
    action: {
      padding: 0,
      display: 'flex',
      justifyContent: 'flex-start'
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
    position: 'relative',
    top: '12px',
    width: '200px',
    marginRight: 'auto',
    color: grey[900],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: '600'
  },
  nameClientMobile: {
    position: 'relative',
    top: '12px',
    width: '200px',
    marginRight: 'auto',
    color: grey[900],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: '600',
    marginBottom: theme.spacing.unit
  },
  session: {
    fontWeight: '300',
    fontSize: '14px',
    marginTop: '15px',
    color: theme.palette.grey[600]
  },
  sessionMobile: {
    fontWeight: '300',
    fontSize: '14px',
    marginTop: '15px',
    color: theme.palette.grey[600],
    marginBottom: theme.spacing.unit * 2
  },
  iconHover: {
    '&:hover': {
      color: '#2196f3'
    }
  },
  cardContent: {
    '&:hover': {
      cursor: 'pointer'
    }
  }
});

function ClientCard({ classes, client, clientEdited, clientDeleted }) {
  const { fname, lname, no_of_sessions } = client;
  const name = fname + ' ' + lname;
  const sessions =
    no_of_sessions > 0 ? no_of_sessions + ' sessions' : 'No sessions yet';

  const CardLink = props => <Link to={'/client/' + client.c_id} {...props} />;

  return (
    <div className={classes.root}>
      <Hidden smDown>
        <Card className={classes.card}>
          <ButtonBase
            className={classes.buttonBase}
            disableRipple={true}
            disableTouchRipple={true}
            component={CardLink}
          >
            <CardContent className={classes.cardContent}>
              <Avatar className={classes.avatar}>
                <Icon fontSize="large">person</Icon>
              </Avatar>
              <Typography
                noWrap
                variant="h6"
                align="center"
                className={classes.nameClient}
              >
                {name}
              </Typography>
              <Typography className={classes.session}>{sessions}</Typography>
            </CardContent>
          </ButtonBase>
          <CardActions className={classes.action}>
            <IconButton
              className={classes.iconHover}
              disableRipple={true}
              aria-label="Edit"
              onClick={() => {
                clientEdited(client);
              }}
            >
              <Icon>edit</Icon>
            </IconButton>
            <IconButton
              className={classes.iconHover}
              disableRipple={true}
              aria-label="Archive"
              onClick={() => {
                clientDeleted(client);
              }}
            >
              <Icon>archive</Icon>
            </IconButton>
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
  );
}

export default withStyles(styles)(ClientCard);
