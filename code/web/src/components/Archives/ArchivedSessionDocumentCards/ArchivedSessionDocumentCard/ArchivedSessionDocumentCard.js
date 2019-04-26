import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import classNames from 'classnames';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Moment from 'react-moment';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import { getSessionDocumentIcon } from '../../../../util/helperFunctions';

const styles = theme => ({
  card: {
    marginTop: '1rem',
    boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)',
    transition:
      '.3s transform cubic-bezier(.155,1.105,.295,1.12),.3s box-shadow,.3s -webkit-transform cubic-bezier(.155,1.105,.295,1.12)',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: '0 10px 20px rgba(0,0,0,.12), 0 4px 8px rgba(0,0,0,.06)',
      padding: '0px 0px 0px 0px',
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
    minWidth: 140,
    maxWidth: 140
  },
  cardSubTitle: {
    fontWeight: 400,
    fontSize: theme.spacing.unit * 1.75,
    color: theme.palette.grey[600]
  },
  restoreActionButton: {
    position: 'relative',
    bottom: theme.spacing.unit * -4,
    right: theme.spacing.unit * -1
  }
});

function ArchivedSessionDocumentCard({ sessionDocument, classes }) {
  const { avatarIconClass, iconColor } = getSessionDocumentIcon(
    sessionDocument.type.toLowerCase()
  );

  return (
    <Card
      elevation={1}
      onClick={() => {
        alert('Please restore first!');
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
            className={classes.restoreActionButton}
            onClick={e => {
              e.stopPropagation();
            }}
          >
            <Icon fontSize="small">restore_from_trash</Icon>
          </IconButton>
        </div>
      </CardContent>
    </Card>
  );
}

export default withStyles(styles)(ArchivedSessionDocumentCard);
