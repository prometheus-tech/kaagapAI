import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

function RemoveAnnotationsConfirmationDialog({
  isDialogOpened,
  dialogClosed,
  continueAction
}) {
  return (
    <Dialog open={isDialogOpened} onClose={dialogClosed}>
      <DialogTitle>Remove Annotations?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This file has been annotated. Editing the content of this file will
          remove all annotations permanently. Would you like to continue?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialogClosed}>Cancel</Button>
        <Button onClick={continueAction} color="primary">
          Continue Anyway
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default RemoveAnnotationsConfirmationDialog;
