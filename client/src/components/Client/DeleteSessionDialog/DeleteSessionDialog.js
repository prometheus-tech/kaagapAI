import React, { Component } from 'react';

import DELETE_SESSION from '../../../graphql/mutations/deleteSession';
import { Mutation } from 'react-apollo';
import CLIENT from '../../../graphql/queries/client';

import { withSnackbar } from 'notistack';

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
import { cloneDeep } from 'apollo-utilities';

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

class DeleteSessionDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      c_id: props.clientId,
      session_id: props.session.session_id,
      session_name: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      c_id: nextProps.clientId,
      session_id: nextProps.session.session_id,
      session_name: ''
    });
  }

  render() {
    const {
      isOpened,
      closed,
      clientId,
      session,
      classes,
      fullScreen
    } = this.props;

    const { session_id, session_name } = session;

    return (
      <Mutation
        mutation={DELETE_SESSION}
        update={(
          cache,
          {
            data: {
              deleteSession: { c_id, session_id, session_name }
            }
          }
        ) => {
          const clientQueryParams = {
            query: CLIENT,
            variables: { c_id: c_id }
          };

          const { client } = cloneDeep(cache.readQuery(clientQueryParams));

          client.sessions = client.sessions.filter(
            s => s.session_id !== session_id
          );

          client.no_of_sessions = client.sessions.length;

          cache.writeQuery({
            ...clientQueryParams,
            data: {
              client: client
            }
          });

          this.props.enqueueSnackbar(session_name + ' successfully deleted!');
        }}
        optimisticResponse={{
          __typename: 'Mutation',
          deleteSession: {
            __typename: 'Session',
            c_id: clientId,
            session_id: session_id,
            session_name: session_name
          }
        }}
        errorPolicy="all"
        onError={error => {
          // Ignore error
        }}
      >
        {deleteSession => (
          <Dialog
            open={isOpened}
            onClose={closed}
            fullScreen={fullScreen}
            TransitionComponent={Transition}
          >
            <DialogTitle>Delete Session?</DialogTitle>
            <DialogContent>
              <DialogContentText className={classes.dialogContentText}>
                This action{' '}
                <Typography component="span" className={classes.bold}>
                  cannot{' '}
                </Typography>
                be undone. This will permanently delete{' '}
                <Typography component="span" className={classes.bold}>
                  {session_name}
                </Typography>{' '}
                and all of its associated data.
              </DialogContentText>
              <DialogContentText>
                Please type in{' '}
                <Typography component="span" className={classes.bold}>
                  {session_name}
                </Typography>{' '}
                to confirm.
              </DialogContentText>
              <TextField
                margin="dense"
                variant="outlined"
                fullWidth
                className={classNames(classes.textField, classes.dense)}
                onChange={e => {
                  this.setState({ session_name: e.target.value });
                }}
                value={this.state.session_name}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={closed}>Cancel</Button>
              <Button
                className={classes.deleteColor}
                disabled={!(this.state.session_name === session_name)}
                onClick={() => {
                  deleteSession({
                    variables: {
                      session_id: this.state.session_id
                    }
                  });

                  closed();
                }}
                autoFocus
              >
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </Mutation>
    );
  }
}

export default withMobileDialog({ breakpoint: 'xs' })(
  withStyles(styles)(withSnackbar(DeleteSessionDialog))
);
