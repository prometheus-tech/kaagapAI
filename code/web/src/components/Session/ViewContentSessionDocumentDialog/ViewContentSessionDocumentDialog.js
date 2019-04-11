import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';

const styles = theme => ({
  textField: {
    overflow: 'hidden',
    border: 0
  }
});

const DialogTitle = withStyles(theme => ({
  root: {
    borderBottom: `1px solid ${theme.palette.divider}`,
    margin: 0,
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing.unit,
    top: theme.spacing.unit,
    color: theme.palette.grey[500]
  }
}))(props => {
  const { children, classes, onClose } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="Close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles(theme => ({
  root: {
    margin: 0,
    paddingRight: theme.spacing.unit * 4,
    paddingLeft: theme.spacing.unit * 4,
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
}))(MuiDialogContent);

function ViewContentSessionDocumentDialog(props) {
  const { opened, closed, sessionDocument, classes } = props;

  const { file_name, content } = sessionDocument;

  return (
    <Dialog open={opened} fullScreen>
      <DialogTitle onClose={closed}>{file_name}</DialogTitle>
      <DialogContent>
        <TextField
          value={content}
          multiline={true}
          rowsMax={Infinity}
          fullWidth
          disabled
          className={classes.textField}
        />
      </DialogContent>
    </Dialog>
  );
}

export default withStyles(styles)(ViewContentSessionDocumentDialog);
