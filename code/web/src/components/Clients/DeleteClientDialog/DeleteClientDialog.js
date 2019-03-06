import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import TextField from '@material-ui/core/TextField';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { Typography } from '@material-ui/core';
import Slide from '@material-ui/core/Slide';

const styles = theme => ({
  dense: {
    marginTop: 8
  },
  bold: {
    all: 'inherit',
    display: 'inline',
    fontWeight: 600
  },
  dialogContentText: {
    marginBottom: 16
  },
  deleteColor: {
    color: theme.palette.error.dark
  }
});

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class DeleteClientDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      c_id: parseInt(props.clientId),
      clientName: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      c_id: parseInt(nextProps.clientId),
      clientName: ''
    });
  }

  inputNameChangeHandler = e => {
    this.setState({ clientName: e.target.value });
  };

  render() {
    const { isOpened, closed, clientName, classes, fullScreen } = this.props;

    return (
      <Dialog
        open={isOpened}
        onClose={closed}
        fullScreen={fullScreen}
        TransitionComponent={Transition}
      >
        <DialogTitle>Delete Client?</DialogTitle>
        <DialogContent>
          <DialogContentText className={classes.dialogContentText}>
            This action{' '}
            <Typography component="span" className={classes.bold}>
              cannot{' '}
            </Typography>
            be undone. This will permanently delete{' '}
            <Typography component="span" className={classes.bold}>
              {clientName}
            </Typography>{' '}
            and all of its associated data.
          </DialogContentText>
          <DialogContentText>
            Please type in{' '}
            <Typography component="span" className={classes.bold}>
              {clientName}
            </Typography>{' '}
            to confirm.
          </DialogContentText>
          <TextField
            margin="dense"
            variant="outlined"
            fullWidth
            className={classNames(classes.textField, classes.dense)}
            onChange={e => {
              this.setState({ clientName: e.target.value });
            }}
            value={this.state.clientName}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closed}>Cancel</Button>
          <Button
            className={classes.deleteColor}
            disabled={!(this.state.clientName === clientName)}
            onClick={closed}
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withMobileDialog()(withStyles(styles)(DeleteClientDialog));
