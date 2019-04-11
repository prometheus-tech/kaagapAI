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

const styles = theme => ({
  // Responsive breakpoints
  avatar: {
    backgroundColor: '#0091ea',
    margin: '10px auto',
    height: '70px',
    width: '70px',
    textTransform: 'uppercase',
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing.unit * 3.2,
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
    [theme.breakpoints.down('sm')]: {
      minWidth: '85vw',
      height: '150px'
    },
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
  nameClient: {
    position: 'relative',
    top: '12px',
    width: '200px',
    marginRight: 'auto',
    color: grey[900],
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontWeight: '600',
    [theme.breakpoints.down('sm')]: {
      width: '250px',
      textAlign: 'left'
    }
  },
  session: {
    fontWeight: '300',
    fontSize: '14px',
    marginTop: '15px',
    color: theme.palette.grey[600]
  },
  iconHover: {
    '&:hover': {
      color: '#2196f3'
    }
  },
  cardContent: {
    '&:hover': {
      cursor: 'pointer'
    },
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    }
  },
  divider: {
    [theme.breakpoints.down('sm')]: {
      marginTop: theme.spacing.unit * 3,
      textAlign: 'left'
    }
  },
  moreIcon: {
    transform: 'rotate(90deg)',
    marginLeft: 'auto'
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
      <Card className={classes.card}>
        <ButtonBase
          className={classes.buttonBase}
          disableRipple={true}
          disableTouchRipple={true}
          component={CardLink}
        >
          <CardContent className={classes.cardContent}>
            <Hidden smUp>
              <MoreVertIcon className={classes.moreIcon} />
            </Hidden>
            <Avatar className={classes.avatar}>
              <Icon fontSize="large">person</Icon>
            </Avatar>
            <div className={classes.divider}>
              <Typography
                noWrap
                variant="h6"
                align="center"
                className={classes.nameClient}
              >
                {name}
              </Typography>
              <Typography className={classes.session}>{sessions}</Typography>
            </div>
          </CardContent>
        </ButtonBase>
        <Hidden smDown>
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
        </Hidden>
      </Card>
    </div>
  );
}

export default withStyles(styles)(ClientCard);
