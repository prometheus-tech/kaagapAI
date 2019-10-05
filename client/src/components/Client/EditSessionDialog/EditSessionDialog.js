import React, { Component } from 'react';

import { Mutation } from 'react-apollo';
import EDIT_SESSION from '../../../graphql/mutations/editSession';

import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from '@material-ui/core/Grid';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { getUTCDate, trimAll } from '../../../util/helperFunctions';

const styles = theme => ({
  inputGroup: {
    marginTop: 16,
    marginBottom: 16
  },
  group: {
    margin: '0 16px'
  }
});

class EditSessionDialog extends Component {
  constructor(props) {
    super(props);

    const { session_id, session_name, date_of_session } = props.session;

    this.state = {
      session_id,
      session_name,
      date_of_session: getUTCDate(new Date(date_of_session))
    };

    // Needed for validation
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  componentWillReceiveProps({
    session: { session_id, session_name, date_of_session }
  }) {
    this.setState({
      session_id: session_id,
      session_name,
      date_of_session: getUTCDate(new Date(date_of_session))
    });
  }

  /**
   * Custom validators
   */
  componentWillMount() {
    const date = '^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))$';
    ValidatorForm.addValidationRule('isDate', value => {
      return value.match(date);
    });
  }

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { fullScreen, isOpened, closed } = this.props;
    const { session_id, session_name, date_of_session } = this.state;

    return (
      <Mutation
        mutation={EDIT_SESSION}
        optimisticResponse={{
          __typename: 'Mutation',
          updateSessionInformation: {
            __typename: 'Session',
            session_id,
            session_name,
            date_of_session
          }
        }}
        errorPolicy="all"
        onError={error => {
          // Ignore error
        }}
      >
        {editSession => {
          return (
            <Dialog
              open={isOpened}
              onClose={closed}
              fullWidth={true}
              fullScreen={fullScreen}
              maxWidth="sm"
            >
              <ValidatorForm
                onSubmit={() => {
                  editSession({
                    variables: {
                      session_id,
                      session_name: trimAll(session_name),
                      date_of_session
                    }
                  });

                  closed();

                  this.props.enqueueSnackbar(
                    session_name + ' successfully edited!'
                  );
                }}
              >
                <DialogTitle>Edit Session</DialogTitle>
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
                        validators={['required', 'trim']}
                        errorMessages={[
                          'This field is required',
                          'This field must contain at least one non-whitespace character'
                        ]}
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
                  <Button onClick={closed}>Cancel</Button>
                  <Button type="submit" color="primary" autoFocus>
                    Save Changes
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
  withStyles(styles)(withSnackbar(EditSessionDialog))
);
