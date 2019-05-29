import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Tooltip from '@material-ui/core/Tooltip';

import InsertDriveFileIcon from '@material-ui/icons/InsertDriveFile';
import AttachFileIcon from '@material-ui/icons/AttachFile';

const styles = theme => ({
  listItemIcon: {
    marginRight: 0
  }
});

function UploadFilePopper({
  classes,
  isUploadFilePopperOpened,
  anchorEl,
  uploadFilePopperClosed,
  newSessionDocumentDialogOpened
}) {
  return (
    <Popper
      open={isUploadFilePopperOpened}
      anchorEl={anchorEl}
      transition
      placement="bottom"
    >
      {({ TransitionProps, placement }) => (
        <Grow
          {...TransitionProps}
          style={{
            transformOrigin:
              placement === 'bottom' ? 'center top' : 'center bottom'
          }}
        >
          <Paper elevation={2}>
            <ClickAwayListener onClickAway={uploadFilePopperClosed}>
              <MenuList>
                <Tooltip title="Files that will be analyzed" placement="left">
                  <MenuItem
                    onClick={() => {
                      uploadFilePopperClosed();
                      newSessionDocumentDialogOpened();
                    }}
                  >
                    <ListItemIcon className={classes.listItemIcon}>
                      <InsertDriveFileIcon />
                    </ListItemIcon>
                    <ListItemText primary="Document" />
                  </MenuItem>
                </Tooltip>
                <Tooltip
                  title="Files that will not be analyzed"
                  placement="left"
                >
                  <MenuItem>
                    <ListItemIcon className={classes.listItemIcon}>
                      <AttachFileIcon />
                    </ListItemIcon>
                    <ListItemText primary="Attachment" />
                  </MenuItem>
                </Tooltip>
              </MenuList>
            </ClickAwayListener>
          </Paper>
        </Grow>
      )}
    </Popper>
  );
}

export default withStyles(styles)(UploadFilePopper);
