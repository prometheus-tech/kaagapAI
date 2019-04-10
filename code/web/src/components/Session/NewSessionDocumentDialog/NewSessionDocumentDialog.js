import React from 'react';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';

function NewSessionDocumentDialog(props) {
  const { opened, closed } = props;

  return (
    <Dialog open={opened} onClose={closed}>
      <DialogTitle>New Session Document Upload</DialogTitle>
      <DialogContent />
    </Dialog>
  );
}

export default NewSessionDocumentDialog;
