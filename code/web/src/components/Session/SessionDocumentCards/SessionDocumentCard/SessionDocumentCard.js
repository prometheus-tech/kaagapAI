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
import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Auxilliary from '../../../../hoc/Auxilliary/Auxilliary';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

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
  isMoreActionsOpened,
  moreActionsOpened,
  moreActionsClosed,
  anchorEl,
  classes
}) {
  const { avatarIconClass, iconColor } = getSessionDocumentIcon(
    sessionDocument.type.toLowerCase()
  );

  return (
    <Card
      className={classes.card}
      onClick={e => {
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
          <Auxilliary>
            <IconButton
              className={classes.iconAction}
              onClick={e => {
                e.stopPropagation();
                moreActionsOpened(e);
              }}
            >
              <MoreVertIcon />
            </IconButton>
            <Popper
              open={isMoreActionsOpened}
              anchorEl={anchorEl}
              transition
              disablePortal
              placement="bottom-end"
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  style={{
                    transformOrigin:
                      placement === 'bottom-end' ? 'right top' : 'left bottom'
                  }}
                >
                  <Paper elevation={1}>
                    <ClickAwayListener onClickAway={moreActionsClosed}>
                      <MenuList>
                        <MenuItem
                          onClick={e => {
                            e.stopPropagation();
                            sessionDocumentViewed(sessionDocument);
                          }}
                        >
                          View content
                        </MenuItem>
                        <MenuItem
                          onClick={e => {
                            e.stopPropagation();
                            sessionDocumentViewed(sessionDocument);
                            contentEdited();
                          }}
                        >
                          Edit content
                        </MenuItem>
                        <MenuItem
                          onClick={e => {
                            e.stopPropagation();
                            alert('Not yet implemented');
                          }}
                        >
                          Rename
                        </MenuItem>
                        <MenuItem
                          onClick={e => {
                            e.stopPropagation();
                            alert('Not yet implemented');
                          }}
                        >
                          Download
                        </MenuItem>
                        <MenuItem
                          onClick={e => {
                            e.stopPropagation();
                            alert('Not yet implemented');
                          }}
                        >
                          Archive
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Popper>
          </Auxilliary>
          // <PopupState variant="popover" popupId="demo-popup-menu">
          //   {popupState => (
          //     <Auxilliary>
          //       <IconButton
          //         className={classes.iconAction}
          //         {...bindTrigger(popupState)}
          //       >
          //         <MoreVertIcon />
          //       </IconButton>
          //       <Menu
          //         {...bindPopover(popupState)}
          //         anchorOrigin={{
          //           vertical: 'bottom',
          //           horizontal: 'right'
          //         }}
          //         transformOrigin={{
          //           vertical: 'top',
          //           horizontal: 'right'
          //         }}
          //       >
          //         <MenuItem
          //           onClick={() => {
          //             sessionDocumentViewed(sessionDocument);
          //             popupState.close();
          //           }}
          //         >
          //           View content
          //         </MenuItem>
          //         <MenuItem
          //           onClick={() => {
          //             sessionDocumentViewed(sessionDocument);
          //             contentEdited();
          //             popupState.close();
          //           }}
          //         >
          //           Edit content
          //         </MenuItem>
          //         <MenuItem>Rename</MenuItem>
          //         <MenuItem>Download</MenuItem>
          //         <MenuItem>Archive</MenuItem>
          //       </Menu>
          //     </Auxilliary>
          //   )}
          // </PopupState>
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
