import React, { Component } from 'react';

import { Mutation } from 'react-apollo';
import ADD_SESSION from '../../../graphql/mutations/addSession';
import CLIENT from '../../../graphql/queries/client';

import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import SimpleSnackbar from '../../UI/SimpleSnackbar/SimpleSnackbar';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { cloneDeep } from 'apollo-utilities';
import { getUTCDate } from '../../../util/helperFunctions';

const styles = theme => ({
  inputGroup: {
    marginTop: 16,
    marginBottom: 16
  },
  group: {
    margin: '0 16px'
  }
});

class NewSessionDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      c_id: props.clientId,
      session_name: '',
      date_of_session: getUTCDate(new Date())
    };

    // Needed for validation
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  clearFieldsHandler = () => {
    this.setState({
      session_name: '',
      date_of_session: getUTCDate(new Date())
    });
  };

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { fullScreen, opened, closed } = this.props;
    const { c_id, session_name, date_of_session } = this.state;

    return (
      <Mutation
        mutation={ADD_SESSION}
        update={(cache, { data: { addSession } }) => {
          const { client } = cloneDeep(
            cache.readQuery({
              query: CLIENT,
              variables: {
                c_id: c_id
              }
            })
          );

          client.sessions.push(addSession);
          client.no_of_sessions = client.sessions.length;

          cache.writeQuery({
            query: CLIENT,
            variables: {
              c_id: c_id
            },
            data: {
              client
            }
          });
        }}
        onCompleted={data => {
          const { session_name } = data.addSession;

          this.props.enqueueSnackbar(session_name + ' successfully added!');
        }}
      >
        {(addSession, { loading }) => {
          if (loading) {
            return <SimpleSnackbar isOpened={loading} />;
          }

          return (
            <Dialog
              open={opened}
              onClose={() => {
                closed();
                this.clearFieldsHandler();
              }}
              fullWidth={true}
              fullScreen={fullScreen}
              maxWidth="sm"
            >
              <ValidatorForm
                onSubmit={() => {
                  addSession({
                    variables: {
                      c_id: c_id,
                      session_name: session_name,
                      date_of_session: date_of_session
                    }
                  });

                  closed();
                  this.clearFieldsHandler();
                }}
              >
                <DialogTitle>New Session</DialogTitle>
                <DialogContent>
                  <Grid container spacing={16}>
                    <Grid item xs={12}>
                      <TextValidator
                        label="Session name"
                        value={session_name}
                        variant="outlined"
                        fullWidth
                        name="session_name"
                        onChange={this.inputChangeHandler}
                        margin="dense"
                        validators={['required']}
                        errorMessages={['This field is required']}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextValidator
                        type="date"
                        label="Date of session"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true
                        }}
                        name="date_of_session"
                        value={date_of_session}
                        fullWidth
                        onChange={this.inputChangeHandler}
                        margin="dense"
                        validators={['required', 'isDate']}
                        errorMessages={[
                          'This field is required',
                          'Not a valid date'
                        ]}
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={() => {
                      closed();
                      this.clearFieldsHandler();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" color="primary" autoFocus>
                    Add Session
                  </Button>
                </DialogActions>
              </ValidatorForm>
            </Dialog>
          );
        }}
      </Mutation>
    );
  }
}

export default withMobileDialog({ breakpoint: 'xs' })(
  withStyles(styles)(withSnackbar(NewSessionDialog))
);
