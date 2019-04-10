import React from 'react';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'react-moment';
import green from '@material-ui/core/colors/green';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import brown from '@material-ui/core/colors/brown';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const styles = theme => ({
  card: {
    Width: '300px',
    boxShadow: '0 2px 1px rgba(0,0,0,.08), 0 0 2px rgba(0,0,0,.05)',
    marginTop: '1rem',
    background: '#fff',
    borderRadius: '6px'
  },
  cardContent: {
    textAlign: 'center'
  },
  avatarContainer: {
    display: 'flex'
  },
  avatar: {
    width: 60,
    height: 60,
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 1,
    backgroundColor: 'transparent',
    color: green[600],
    padding: '2px 2px 2px 2px',
    fontSize: theme.spacing.unit * 8,
    textAlign: 'center'
  },
  cardTitle: {
    fontSize: theme.spacing.unit * 2.5,
    fontWeight: 500,
    color: grey[900],
    letterSpacing: '2px',
    width: '130px',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  cardSubheader: {
    fontSize: theme.spacing.unit * 1.4,
    color: brown[200]
  },
  buttonBase: {
    display: 'block'
  },
  iconAction: {
    marginTop: theme.spacing.unit * 3
  }
});

function SessionDocumentCard({ sessionDocument, classes }) {
  let avatarIconClass = '';
  let iconColor = '';

  const sessionDocumentType = sessionDocument.type.toLowerCase();

  if (sessionDocumentType.includes('pdf')) {
    avatarIconClass = 'fas fa-file-pdf';
    iconColor = 'blue';
  } else if (sessionDocumentType.includes('text')) {
    avatarIconClass = 'fas fa-file-alt';
    iconColor = 'red';
  } else if (sessionDocumentType.includes('word')) {
    avatarIconClass = 'fas fa-file-word';
    iconColor = 'green';
  } else if (sessionDocumentType.includes('audio')) {
    avatarIconClass = 'fas fa-file-audio';
    iconColor = 'yellow';
  } else {
    avatarIconClass = 'fas fa-file-alt';
    iconColor = 'black';
  }

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <div className={classes.avatarContainer}>
            <Avatar
              className={classes.avatar}
              style={{ color: iconColor }}
              alignItems="center"
            >
              <Icon
                fontSize="large"
                className={classNames(classes.icon, avatarIconClass)}
              />
            </Avatar>
          </div>
        }
        action={
          <IconButton className={classes.iconAction}>
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography noWrap className={classes.cardTitle}>
            {sessionDocument.file_name}
          </Typography>
        }
        subheader={
          <Typography className={classes.cardSubheader}>
            <Moment format="MMM D, YYYY" withTitle>
              {sessionDocument.date_added}
            </Moment>
          </Typography>
        }
      />
    </Card>
  );
}

export default withStyles(styles)(SessionDocumentCard);
