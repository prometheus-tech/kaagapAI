import React from 'react';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'react-moment';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import grey from '@material-ui/core/colors/grey';

import { getSessionDocumentIcon } from '../../../../util/helperFunctions';

const styles = theme => ({
  card: {
    height: '90px',
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
    height: '70px',
    width: '70px',
    borderRadius: '0px',
    marginTop: theme.spacing.unit * -1,
    backgroundColor: 'transparent',
    textAlign: 'center'
  },
  cardTitle: {
    fontSize: theme.spacing.unit * 2.2,
    fontWeight: 400,
    color: grey[900],
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  cardSubheader: {
    fontSize: theme.spacing.unit * 1.6,
    color: grey[600]
  },
  buttonBase: {
    display: 'block'
  },
  iconAction: {
    // marginTop: theme.spacing.unit * 2
  },
  icon: {
    fontSize: theme.spacing.unit * 7
  },
  paper: {
    boxShadow: theme.shadows[2]
  }
});

function SessionDocumentCard({
  sessionDocument,
  sessionDocumentViewed,
  moreActionsOpened,
  classes
}) {
  const { avatarIconClass, iconColor } = getSessionDocumentIcon(
    sessionDocument.type.toLowerCase()
  );

  return (
    <Card
      elevation={1}
      className={classes.card}
      onClick={() => {
        sessionDocumentViewed(sessionDocument);
      }}
    >
      <CardHeader
        avatar={
          <div className={classes.avatarContainer}>
            <Avatar
              className={classes.avatar}
              style={{ color: iconColor }}
              alignItems="center"
            >
              <Icon className={classNames(classes.icon, avatarIconClass)} />
            </Avatar>
          </div>
        }
        action={
          <div>
            <IconButton
              className={classes.iconAction}
              onClick={e => {
                e.stopPropagation();
                moreActionsOpened(e, sessionDocument);
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </div>
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
