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

import { getInitials } from '../../../../util/helperFunctions';

const styles = theme => ({
  avatar: {
    backgroundColor: '#0091ea',
    margin: '10px auto',
    height: '70px',
    width: '70px',
    textTransform: 'uppercase'
  },
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
    },
    cardContent: {
      // padding: '14px 80px 18px 36px'
    },
    action: {
      dispay: 'flex'
    }
  },
  nameClient: {
    position: 'relative',
    top: '12px',
    color: '#9e9e9e'
  },
  session: {
    fontWeight: '300',
    fontSize: '12px',
    marginTop: '15px'
  },
  iconHover: {
    '&:hover': {
      color: '#2196f3'
    },
    buttonBase: {
      height: '100vh',
      width: '100vw'
    }
  },
  cardContent: {
    '&:hover': {
      cursor: 'pointer'
    }
    // width: '250px'
  }
});

function ClientCard({ classes, client }) {
  const { fname, lname, no_of_sessions } = client;
  const initials = getInitials(fname, lname);
  const name = fname + ' ' + lname;
  const sessions =
    no_of_sessions > 0 ? no_of_sessions + ' sessions' : 'No sessions yet';

  const CardLink = props => <Link to={'/client/' + client.c_id} {...props} />;

  return (
    <Card className={classes.card}>
      <ButtonBase
        className={classes.buttonBase}
        disableRipple={true}
        disableTouchRipple={true}
        component={CardLink}
      >
        <CardContent className={classes.cardContent}>
          <Avatar className={classes.avatar}>{initials}</Avatar>
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
      <CardActions disableActionSpacing className={classes.action}>
        <IconButton
          className={classes.iconHover}
          disableRipple={true}
          aria-label="Archive"
        >
          <Icon>archive</Icon>
        </IconButton>
        <IconButton
          className={classes.iconHover}
          disableRipple={true}
          aria-label="Edit"
        >
          <Icon>edit</Icon>
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(ClientCard);
