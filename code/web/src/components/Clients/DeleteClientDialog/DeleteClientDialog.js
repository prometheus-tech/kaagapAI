import React, { Component } from 'react';

import DELETE_CLIENT from '../../../graphql/mutations/deleteClient';
import { Mutation } from 'react-apollo';
import CLIENTS from '../../../graphql/queries/clients';

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

class DeleteClientDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      clientName: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      clientName: ''
    });
  }

  render() {
    const {
      opened,
      closed,
      client,
      classes,
      fullScreen,
      practitionerId
    } = this.props;

    const clientName = client.fname + ' ' + client.lname;

    return (
      <Mutation
        mutation={DELETE_CLIENT}
        update={(
          cache,
          {
            data: {
              deleteClient: { c_id, fname, lname }
            }
          }
        ) => {
          const clientsQueryParams = {
            query: CLIENTS,
            variables: { p_id: practitionerId }
          };

          const { clients } = cloneDeep(cache.readQuery(clientsQueryParams));

          cache.writeQuery({
            ...clientsQueryParams,
            data: {
              clients: clients.filter(c => c.c_id !== c_id)
            }
          });

          this.props.enqueueSnackbar(
            fname + ' ' + lname + ' successfully deleted!'
          );
        }}
        optimisticResponse={{
          __typename: 'Mutation',
          deleteClient: {
            __typename: 'Client',
            c_id: client.c_id,
            fname: client.fname,
            lname: client.lname
          }
        }}
        errorPolicy="all"
        onError={error => {
          // Ignore error
        }}
      >
        {deleteClient => (
          <Dialog
            open={opened}
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
                onClick={() => {
                  deleteClient({ variables: { c_id: client.c_id } });

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
  withStyles(styles)(withSnackbar(DeleteClientDialog))
);
