import React, { Component } from 'react';

import { Mutation } from 'react-apollo';
import REGISTER from '../../../graphql/mutations/register';

import { withStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SignUpIllustration from '../../../assets/signup_illustration.svg';
import kaagapaiLogo from '../../../assets/kaagapai-logo.svg';
import Checkbox from '@material-ui/core/Checkbox';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  accountRegContainer: {
    padding: '0',
    margin: '0',
    oveflowX: 'hidden',
    overflowY: 'hidden',
    height: '100vh',
    width: '100vw'
  },
  logo: {
    margin: 20,
    width: 60,
    height: 60
  },
  inputFields: {
    marginTop: theme.spacing.unit * 5
  },
  illustrationContainer: {
    textAlign: 'center'
  },
  signUpIllustration: {
    height: '60vh',
    marginTop: theme.spacing.unit * 20
  },
  signUp: {
    fontSize: theme.spacing.unit * 4,
    color: blue[600]
  },
  signUpMessage: {
    fontSize: theme.spacing.unit * 1.8,
    fontWeight: '300',
    color: grey[600]
  },
  formContainer: {
    backgroundColor: 'rgb(252, 252, 252)',
    display: 'inline'
  },
  inputFields: {
    display: 'flex',
    textAlign: 'center'
  },
  signUpMessageContainer: {
    textAlign: 'left'
  },
  nextButton: {
    borderRadius: '30px',
    color: 'white',
    backgroundColor: blue[600],
    padding: '10px 40px 10px 40px',
    '&:hover': {
      backgroundColor: blue[700]
    }
  },
  linkToSignIn: {
    display: 'flex'
  },
  signInLinkMessage: {
    fontWeight: '300',
    marginTop: theme.spacing.unit * 2,
    color: grey[500]
  },
  signInlink: {
    color: blue[600],
    cursor: 'pointer',
    textDecoration: 'underline',
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit
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
              <Grid
                container
                spacing={16}
                className={classes.accountRegContainer}
              >
                {error ? (
                  <Grid item xs={12}>
                    {error.graphQLErrors.map(({ message }) => {
                      return <Typography key={message}>{message}</Typography>;
                    })}
                  </Grid>
                ) : null}
                <Grid item xs={6} className={classes.formContainer}>
                  <Grid container>
                    <div>
                      <img
                        src={kaagapaiLogo}
                        className={classes.logo}
                        alt="kaagapAI"
                      />
                    </div>
                    <div className={classes.inputFields}>
                      <Grid item xs={2} />
                      <Grid item xs={8}>
                        <Grid
                          container
                          spacing={24}
                          className={classes.inputFields}
                        >
                          <Grid
                            item
                            xs={12}
                            className={classes.signUpMessageContainer}
                          >
                            <Typography className={classes.signUp}>
                              Sign Up.
                            </Typography>
                            <Typography className={classes.signUpMessage}>
                              kaagapAI is built for your needs. Specific message
                              here.
                            </Typography>
                          </Grid>
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
                          <Grid item xs={8} className={classes.linkToSignIn}>
                            <Typography className={classes.signInLinkMessage}>
                              Already have an account?
                            </Typography>
                            <Typography className={classes.signInlink}>
                              Sign in
                            </Typography>
                          </Grid>
                          <Grid item xs={4}>
                            <Button
                              type="submit"
                              variant="contained"
                              disabled={loading}
                              className={classes.nextButton}
                            >
                              Continue
                            </Button>
                          </Grid>
                        </Grid>
                      </Grid>
                      <Grid item xs={2} />
                    </div>
                  </Grid>
                </Grid>
                <Grid item xs={6} className={classes.illustrationContainer}>
                  <img
                    src={SignUpIllustration}
                    className={classes.signUpIllustration}
                    alt="Sign Up"
                  />
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
