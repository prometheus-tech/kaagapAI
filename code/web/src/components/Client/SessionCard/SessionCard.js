import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import Moment from 'react-moment';
import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import brown from '@material-ui/core/colors/brown';

const styles = theme => ({
  card: {
    minWidth: 180,
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
  cardActions: {
    padding: 0,
    display: 'flex',
    justifyContent: 'flex-end'
  },
  cardContent: {
    textAlign: 'center'
  },
  avatarContainer: {
    display: 'flex',
    justifyContent: 'center'
  },
  avatar: {
    width: 60,
    height: 60,
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 1,
    backgroundColor: grey[100],
    color: orange[700],
    padding: '2px 2px 2px 2px'
  },
  cardTitle: {
    fontSize: theme.spacing.unit * 2,
    fontWeight: 500,
    textTransform: 'uppercase',
    color: grey[600],
    letterSpacing: '2px'
  },
  cardSubheader: {
    fontSize: theme.spacing.unit * 1.4,
    color: brown[200]
  },
  iconAction: {
    '&:hover': {
      backgroundColor: 'transparent',
      color: '#1565c0'
    }
  }
});

function SessionCard({ session, classes, sessionEdited }) {
  return (
    <Card
      className={classes.card}
      disableRipple={true}
      disableTouchRipple={true}
    >
      <CardActionArea>
        <CardContent className={classes.cardContent}>
          <div className={classes.avatarContainer}>
            <Avatar className={classes.avatar}>
              <FolderIcon fontSize="large" />
            </Avatar>
          </div>
          <Typography className={classes.cardTitle}>
            {session.session_name}
          </Typography>
          <Typography className={classes.cardSubheader}>
            <Moment format="MMM D, YYYY" withTitle>
              {session.date_of_session}
            </Moment>
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.cardActions}>
        <IconButton
          disableRipple={true}
          aria-label="Archive"
          className={classes.iconAction}
        >
          <Icon fontSize="small">archive</Icon>
        </IconButton>
        <IconButton
          disableRipple={true}
          aria-label="Edit"
          className={classes.iconAction}
          onClick={() => {
            sessionEdited(session);
          }}
        >
          <Icon fontSize="small">edit</Icon>
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(SessionCard);
