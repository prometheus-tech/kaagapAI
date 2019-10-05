import React from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function PermanentDeleteConfirmationDialog({
  isDialogOpened,
  dialogClosed,
  permanentDeleteLabel,
  permanentDeleteAction
}) {
  return (
    <Dialog open={isDialogOpened} onClose={dialogClosed}>
      <DialogTitle>Delete Permanently?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          This will permanently delete{' '}
          <span style={{ fontWeight: 700 }}>{permanentDeleteLabel}</span> and
          all associated data. You cannot restore deleted information anymore.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={dialogClosed}>Cancel</Button>
        <Button
          color="primary"
          onClick={() => {
            permanentDeleteAction();
            dialogClosed();
          }}
        >
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default PermanentDeleteConfirmationDialog;
