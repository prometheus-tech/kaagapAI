import React, { Component } from 'react';

import { Mutation } from 'react-apollo';
import VERIFY_REGISTRATION from '../../../graphql/mutations/verifyRegistration';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class VerifyEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: props.email,
      input_code: ''
    };
  }

  inputCodeChangeHandler = e => {
    this.setState({ input_code: e.target.value });
  };

  resetFormHandler = () => {
    this.setState({
      input_code: ''
    });
  };

  render() {
    const { email, input_code } = this.state;

    const { steppedNext } = this.props;

    return (
      <Mutation
        mutation={VERIFY_REGISTRATION}
        onCompleted={data => {
          steppedNext();
        }}
        onError={error => {
          this.resetFormHandler();
        }}
      >
        {(verifyEmail, { loading, error }) => {
          return (
            <ValidatorForm
              onSubmit={() => {
                verifyEmail({
                  variables: {
                    email,
                    input_code
                  }
                });
              }}
              instantValidate={false}
            >
              <Grid container spacing={16}>
                <Grid item xs={12}>
                  <Typography variant="h5" gutterBottom>
                    Verify Email
                  </Typography>
                  <Typography variant="body1">
                    A verification code was sent to your email ({email}). Enter
                    the code below in order to verify your email.
                  </Typography>
                </Grid>
                {error ? (
                  <Grid item xs={12}>
                    {error.graphQLErrors.map(error => {
                      return <Typography>{error}</Typography>;
                    })}
                  </Grid>
                ) : null}
                <Grid item xs={5}>
                  <TextValidator
                    label="Input Code"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    name="fname"
                    value={input_code}
                    validators={['required']}
                    errorMessages={['This field is required']}
                    onChange={this.inputCodeChangeHandler}
                    disabled={loading}
                  />
                  <Button type="submit" variant="contained" disabled={loading}>
                    Next
                  </Button>
                </Grid>
              </Grid>
            </ValidatorForm>
          );
        }}
      </Mutation>
    );
  }
}

export default VerifyEmail;
