import React, { Component } from 'react';

import { Mutation } from 'react-apollo';
import REGISTER from '../../../graphql/mutations/register';

import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  accountRegContainer: {
    padding: '0',
    margin: '0',
    width: '100vw'
  },
  inputFields: {
    marginTop: theme.spacing.unit * 5
  },
  illustrationContainer: {
    textAlign: 'center'
  }
});

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

    const { steppedNext, classes } = this.props;

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
                <Grid container className={classes.accountRegContainer}>
                  <Grid item xs={12}>
                    <Grid container>
                      <Grid item xs={1} />
                      <Grid item xs={10}>
                        <Grid
                          container
                          spacing={24}
                          className={classes.inputFields}
                        >
                          <Grid item xs={6}>
                            <TextValidator
                              label="First name"
                              margin="dense"
                              fullWidth
                              name="fname"
                              value={fname}
                              validators={['required']}
                              errorMessages={['This field is required']}
                              onChange={this.inputChangeHandler}
                              disabled={loading}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextValidator
                              label="Last name"
                              margin="dense"
                              fullWidth
                              name="lname"
                              value={lname}
                              validators={['required']}
                              errorMessages={['This field is required']}
                              onChange={this.inputChangeHandler}
                              disabled={loading}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextValidator
                              label="Email"
                              margin="dense"
                              autoComplete="email"
                              fullWidth
                              name="email"
                              value={email}
                              validators={['required', 'isEmail']}
                              errorMessages={[
                                'Enter an email',
                                'Invalid email'
                              ]}
                              onChange={this.inputChangeHandler}
                              disabled={loading}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextValidator
                              label="Phone Number"
                              margin="dense"
                              fullWidth
                              name="phone_no"
                              value={phone_no}
                              validators={['required']}
                              errorMessages={['This field is required']}
                              onChange={this.inputChangeHandler}
                              disabled={loading}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextValidator
                              label="Profession"
                              margin="dense"
                              fullWidth
                              name="profession"
                              value={profession}
                              validators={['required']}
                              errorMessages={['This field is required']}
                              onChange={this.inputChangeHandler}
                              disabled={loading}
                            />
                          </Grid>
                          <Grid item xs={12}>
                            <TextValidator
                              label="License Number"
                              margin="dense"
                              fullWidth
                              name="license"
                              value={license}
                              validators={['required']}
                              errorMessages={['This field is required']}
                              onChange={this.inputChangeHandler}
                              disabled={loading}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextValidator
                              label="Password"
                              margin="dense"
                              type="password"
                              fullWidth
                              name="password"
                              value={password}
                              validators={['required']}
                              errorMessages={[
                                'Enter a password',
                                'Incorrect password'
                              ]}
                              onChange={this.inputChangeHandler}
                              disabled={loading}
                            />
                          </Grid>
                          <Grid item xs={6}>
                            <TextValidator
                              label="Confirm password"
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
                          </Grid>
                          <Grid item xs={6} />
                          <Grid item xs={6}>
                            <Button
                              type="submit"
                              variant="contained"
                              disabled={loading}
                            >
                              Next
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={1} />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ValidatorForm>
          );
        }}
      </Mutation>
    );
  }
}

export default withStyles(styles)(AccountRegistrationInfo);
