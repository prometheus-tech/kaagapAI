import React from 'react';

import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'react-moment';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';
import MoreVertIcon from '@material-ui/icons/MoreVert';

import { getSessionDocumentIcon } from '../../../../util/helperFunctions';

const styles = theme => ({
  card: {
    '&:hover': {
      cursor: 'pointer'
    }
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  cardGeneralInfoContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  avatar: {
    width: '60px',
    height: '60px',
    backgroundColor: 'transparent',
    borderRadius: '0px',
    textAlign: 'center',
    marginRight: theme.spacing.unit
  },
  icon: {
    fontSize: theme.spacing.unit * 5
  },
  cardTitle: {
    fontWeight: 500,
    fontSize: theme.spacing.unit * 2,
    maxWidth: 140
  },
  cardSubTitle: {
    fontWeight: 400,
    fontSize: theme.spacing.unit * 1.75,
    color: theme.palette.grey[600]
  },
  moreActionButton: {
    position: 'relative',
    top: -theme.spacing.unit * 1.5,
    right: -theme.spacing.unit * 1.5
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
      onClick={() => {
        sessionDocumentViewed(sessionDocument);
      }}
      className={classes.card}
    >
      <CardContent className={classes.cardContent}>
        <div className={classes.cardGeneralInfoContainer}>
          <Avatar className={classes.avatar} style={{ color: iconColor }}>
            <Icon className={classNames(avatarIconClass, classes.icon)} />
          </Avatar>
          <div className={classes.cardTextInfo}>
            <Typography className={classes.cardTitle} noWrap>
              {sessionDocument.file_name}
            </Typography>
            <Typography className={classes.cardSubTitle}>
              <Moment format="MMM D, YYYY" withTitle>
                {sessionDocument.date_added}
              </Moment>
            </Typography>
          </div>
        </div>
        <div>
          <IconButton
            className={classes.moreActionButton}
            onClick={e => {
              e.stopPropagation();
              moreActionsOpened(e, sessionDocument);
            }}
          >
            <MoreVertIcon fontSize="small" />
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(SessionDocumentCard);
