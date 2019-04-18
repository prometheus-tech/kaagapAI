import React, { Component } from 'react';

import { AUTH_TOKEN } from '../../util/constants';

import { Mutation } from 'react-apollo';
import LOGIN from '../../graphql/mutations/login';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import Typography from '@material-ui/core/Typography';

class SignIn extends Component {
  state = {
    email: '',
    password: ''
  };

  emailRef = React.createRef();

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleBlur = e => {
    const { name, value } = e.target;
    if (name === 'email') {
      this.emailRef.current.validate(value, true);
    }
  };

  render() {
    const { email, password } = this.state;

    return (
      <Mutation
        mutation={LOGIN}
        onCompleted={data => {
          localStorage.setItem(AUTH_TOKEN, data.login.session_token);
          this.props.history.push('/');
        }}
        onError={error => {
          // Ignore error
        }}
      >
        {(login, { loading, error }) => {
          return (
            <ValidatorForm
              onSubmit={() => {
                login({ variables: { email, password } });
              }}
              instantValidate={false}
            >
              <Grid container spacing={16}>
                {error ? (
                  <Grid item xs={12}>
                    {error.graphQLErrors.map(error => {
                      return <Typography>{error}</Typography>;
                    })}
                  </Grid>
                ) : null}
                <Grid item xs={5}>
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
                    disabled={loading}
                    onChange={this.inputChangeHandler}
                  />
                  <TextValidator
                    ref="password"
                    label="Password"
                    variant="outlined"
                    margin="dense"
                    type="password"
                    fullWidth
                    name="password"
                    value={password}
                    validators={['required']}
                    errorMessages={['Enter a password', 'Incorrect password']}
                    disabled={loading}
                    onChange={this.inputChangeHandler}
                    onBlur={this.handleBlur}
                  />
                  <Button type="submit" variant="contained" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
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

export default SignIn;
