import React, { Component } from 'react';

import { Mutation } from 'react-apollo';
import REGISTER from '../../../graphql/mutations/register';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class AccountRegistrationInfo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fname: '',
      lname: '',
      email: '',
      phone_no: '',
      license: '',
      profession: '',
      password: '',
      confirm_password: ''
    };
  }

  /**
   * Custom validators
   */
  componentWillMount() {
    ValidatorForm.addValidationRule('isPasswordMatch', value => {
      return !(value !== this.state.password);
    });
  }

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  partiallyResetFormHandler = () => {
    this.setState({
      email: '',
      license: '',
      password: '',
      confirm_password: ''
    });
  };

  render() {
    const {
      fname,
      lname,
      email,
      phone_no,
      license,
      profession,
      password,
      confirm_password
    } = this.state;

    const { steppedNext } = this.props;

    return (
      <Mutation
        mutation={REGISTER}
        onCompleted={data => {
          steppedNext(data.register.email);
        }}
        onError={error => {
          this.partiallyResetFormHandler();
        }}
      >
        {(register, { loading, error }) => {
          return (
            <ValidatorForm
              onSubmit={() => {
                register({
                  variables: {
                    fname,
                    lname,
                    email,
                    phone_no,
                    license,
                    profession,
                    password
                  }
                });
              }}
              instantValidate={false}
            >
              <Grid container spacing={16}>
                {error ? (
                  <Grid item xs={12}>
                    {error.graphQLErrors.map(({ message }) => {
                      return <Typography key={message}>{message}</Typography>;
                    })}
                  </Grid>
                ) : null}
                <Grid item xs={5}>
                  <TextValidator
                    label="First name"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    name="fname"
                    value={fname}
                    validators={['required']}
                    errorMessages={['This field is required']}
                    onChange={this.inputChangeHandler}
                    disabled={loading}
                  />
                  <TextValidator
                    label="Last name"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    name="lname"
                    value={lname}
                    validators={['required']}
                    errorMessages={['This field is required']}
                    onChange={this.inputChangeHandler}
                    disabled={loading}
                  />
                  <TextValidator
                    label="Email"
                    variant="outlined"
                    margin="dense"
                    autoComplete="email"
                    fullWidth
                    name="email"
                    value={email}
                    validators={['required', 'isEmail']}
                    errorMessages={['Enter an email', 'Invalid email']}
                    onChange={this.inputChangeHandler}
                    disabled={loading}
                  />
                  <TextValidator
                    label="Phone Number"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    name="phone_no"
                    value={phone_no}
                    validators={['required']}
                    errorMessages={['This field is required']}
                    onChange={this.inputChangeHandler}
                    disabled={loading}
                  />
                  <TextValidator
                    label="License Number"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    name="license"
                    value={license}
                    validators={['required']}
                    errorMessages={['This field is required']}
                    onChange={this.inputChangeHandler}
                    disabled={loading}
                  />
                  <TextValidator
                    label="Profession"
                    variant="outlined"
                    margin="dense"
                    fullWidth
                    name="profession"
                    value={profession}
                    validators={['required']}
                    errorMessages={['This field is required']}
                    onChange={this.inputChangeHandler}
                    disabled={loading}
                  />
                  <TextValidator
                    label="Password"
                    variant="outlined"
                    margin="dense"
                    type="password"
                    fullWidth
                    name="password"
                    value={password}
                    validators={['required']}
                    errorMessages={['Enter a password', 'Incorrect password']}
                    onChange={this.inputChangeHandler}
                    disabled={loading}
                  />
                  <TextValidator
                    label="Confirm password"
                    variant="outlined"
                    margin="dense"
                    type="password"
                    fullWidth
                    name="confirm_password"
                    value={confirm_password}
                    validators={['required', 'isPasswordMatch']}
                    errorMessages={[
                      'Confirm your password',
                      'Passwords do not match'
                    ]}
                    onChange={this.inputChangeHandler}
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

export default AccountRegistrationInfo;
