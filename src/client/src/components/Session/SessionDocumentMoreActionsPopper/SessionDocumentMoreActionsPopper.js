import React from 'react';

import Popper from '@material-ui/core/Popper';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';

function SessionDocumentMoreActionsPopper({
  isMoreActionsOpened,
  anchorEl,
  moreActionsClosed,
  sessionDocumentViewed,
  contentEdited,
  sessionDocumentRenamed,
  sessionDocumentDeleted,
  selectedSessionDocument,
  shouldAnalyzeUpdated,
  sessionDocumentDownloaded,
  originalFileOpened,
  removeAnnotationsConfirmationDialogOpened
}) {
  const { attachment } = selectedSessionDocument;

  return (
    <Popper
      open={isMoreActionsOpened}
      anchorEl={anchorEl}
      transition
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
          <Paper elevation={2}>
            <ClickAwayListener onClickAway={moreActionsClosed}>
              <MenuList>
                <MenuItem
                  onClick={() => {
                    originalFileOpened();
                    moreActionsClosed();
                  }}
                >
                  View original file
                </MenuItem>
                {!attachment ? (
                  <MenuItem
                    onClick={e => {
                      sessionDocumentViewed();
                      moreActionsClosed();
                    }}
                  >
                    View content
                  </MenuItem>
                ) : null}
                {!attachment ? (
                  <MenuItem
                    onClick={() => {
                      removeAnnotationsConfirmationDialogOpened();
                      moreActionsClosed();
                      // @TODO: Implement dynamic showing of annotations dialog upon implementation in backend
                      // sessionDocumentViewed();
                      // contentEdited();
                      // moreActionsClosed();
                    }}
                  >
                    Edit content
                  </MenuItem>
                ) : null}
                {!attachment ? (
                  <MenuItem
                    onClick={() => {
                      alert('To be implemented');
                    }}
                  >
                    Annotate content
                  </MenuItem>
                ) : null}
                <MenuItem
                  onClick={() => {
                    sessionDocumentRenamed();
                    moreActionsClosed();
                  }}
                >
                  Rename
                </MenuItem>
                {!attachment ? (
                  <MenuItem
                    onClick={e => {
                      shouldAnalyzeUpdated();
                      moreActionsClosed();
                    }}
                  >
                    {selectedSessionDocument.should_analyze
                      ? 'Ignore in analysis'
                      : 'Include in analysis'}
                  </MenuItem>
                ) : null}
                <MenuItem
                  onClick={e => {
                    sessionDocumentDownloaded();
                    moreActionsClosed();
                  }}
                >
                  Download original file
                </MenuItem>
                <MenuItem
                  onClick={e => {
                    sessionDocumentDeleted();
                    moreActionsClosed();
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
  );
}

export default SessionDocumentMoreActionsPopper;
