import React from 'react';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'react-moment';
import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import brown from '@material-ui/core/colors/brown';

const styles = theme => ({
  card: {
    minWidth: 180,
    minHeight: 200,
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
    justifyContent: 'flex-start'
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
    backgroundColor: orange[700],
    color: 'white',
    padding: '2px 2px 2px 2px',
    fontSize: theme.spacing.unit * 6
  },
  cardTitle: {
    fontSize: theme.spacing.unit * 2,
    fontWeight: 500,
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
  },
  buttonBase: {
    display: 'block'
  }
});

function SessionDocumentCard({ sessionDocument, classes }) {
  let avatarIconClass = '';

  const sessionDocumentType = sessionDocument.type.toLowerCase();

  if (sessionDocumentType.includes('pdf')) {
    avatarIconClass = 'fas fa-file-pdf';
  } else if (sessionDocumentType.includes('text')) {
    avatarIconClass = 'fas fa-file-alt';
  } else if (sessionDocumentType.includes('word')) {
    avatarIconClass = 'fas fa-file-word';
  } else if (sessionDocumentType.includes('audio')) {
    avatarIconClass = 'fas fa-file-audio';
  } else {
    avatarIconClass = 'fas fa-file-alt';
  }

  return (
    <Card className={classes.card}>
      <CardContent className={classes.cardContent}>
        <div className={classes.avatarContainer}>
          <Avatar className={classes.avatar}>
            <Icon
              fontSize="large"
              className={classNames(classes.icon, avatarIconClass)}
            />
          </Avatar>
        </div>
        <Typography className={classes.cardTitle}>
          {sessionDocument.file_name}
        </Typography>
        <Typography className={classes.cardSubheader}>
          <Moment format="MMM D, YYYY" withTitle>
            {sessionDocument.date_added}
          </Moment>
        </Typography>
      </CardContent>
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
        >
          <Icon fontSize="small">edit</Icon>
        </IconButton>
      </CardActions>
    </Card>
  );
}

export default withStyles(styles)(SessionDocumentCard);
