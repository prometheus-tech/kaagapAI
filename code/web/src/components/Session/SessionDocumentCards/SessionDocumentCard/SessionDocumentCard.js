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
import brown from '@material-ui/core/colors/brown';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import grey from '@material-ui/core/colors/grey';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { getSessionDocumentIcon } from '../../../../util/helperFunctions';

const styles = theme => ({
  card: {
    height: '90px',
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
    letterSpacing: '2px',
    width: '130px',
    overflow: 'hidden',
    textOverflow: 'ellipsis'
  },
  cardSubheader: {
    fontSize: theme.spacing.unit * 1.6,
    color: brown[200]
  },
  buttonBase: {
    display: 'block'
  },
  iconAction: {
    marginTop: theme.spacing.unit * 2
  },
  icon: {
    fontSize: theme.spacing.unit * 7
  }
});

function SessionDocumentCard({
  sessionDocument,
  sessionDocumentViewed,
  contentEdited,
  classes
}) {
  const { avatarIconClass, iconColor } = getSessionDocumentIcon(
    sessionDocument.type.toLowerCase()
  );

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
              <Icon className={classNames(classes.icon, avatarIconClass)} />
            </Avatar>
          </div>
        }
        action={
          <PopupState variant="popover" popupId="demo-popup-menu">
            {popupState => (
              <React.Fragment>
                <IconButton
                  className={classes.iconAction}
                  {...bindTrigger(popupState)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  {...bindPopover(popupState)}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                >
                  <MenuItem
                    onClick={() => {
                      sessionDocumentViewed(sessionDocument);
                      popupState.close();
                    }}
                  >
                    View content
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      sessionDocumentViewed(sessionDocument);
                      contentEdited();
                      popupState.close();
                    }}
                  >
                    Edit content
                  </MenuItem>
                  <MenuItem>Rename</MenuItem>
                  <MenuItem>Download</MenuItem>
                  <MenuItem>Archive</MenuItem>
                </Menu>
              </React.Fragment>
            )}
          </PopupState>
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
