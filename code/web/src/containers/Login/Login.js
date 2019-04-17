import React, { Component } from 'react';

import { AUTH_TOKEN } from '../../util/constants';

import { Mutation } from 'react-apollo';
import LOGIN from '../../graphql/mutations/login';

import { Redirect } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };

    // Needed for validation
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
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
      >
        {(login, { loading }) => {
          return (
            <ValidatorForm
              instantValidate={false}
              onSubmit={() => {
                login({ variables: { email, password } });
              }}
            >
              <Grid container spacing={16}>
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
                    onChange={this.inputChangeHandler}
                  />
                  <TextValidator
                    label="Password"
                    variant="outlined"
                    margin="dense"
                    type="password"
                    fullWidth
                    name="password"
                    value={password}
                    onChange={this.inputChangeHandler}
                    validators={['required']}
                    errorMessages={['Password is required']}
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

export default Login;
