import React, { Component } from 'react';

import { AUTH_TOKEN } from '../../util/constants';

import { Mutation } from 'react-apollo';
import LOGIN from '../../graphql/mutations/login';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import { ValidatorForm } from 'react-material-ui-form-validator';

import Typography from '@material-ui/core/Typography';
import LoginAnimation from '../../assets/Landing_Animation.svg';
import Logo from '../../assets/kaagapai-logo.svg';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';

import { Link } from 'react-router-dom';

const styles = theme => ({
  loginContainer: {
    width: '100vw',
    minHeight: '100vh',
    padding: '0vh',
    margin: '0'
  },
  logo: {
    margin: 20,
    width: 60,
    height: 60
  },
  signIn: {
    fontSize: theme.spacing.unit * 4,
    color: blue[900],
    fontWeight: 800,
    marginLeft: '2vw'
  },
  signInWelcome: {
    marginTop: theme.spacing.unit * 5,
    fontSize: theme.spacing.unit * 1.8,
    fontWeight: 500,
    color: blue[400],
    lineHeight: '150%',
    marginLeft: '2vw'
  },
  formContainer: {
    backgroundColor: 'rgb(252, 252, 252)'
  },
  illustrationContainer: {
    display: 'inline',
    textAlign: 'center'
  },
  sigInIllustration: {
    height: '90vh',
    marginTop: '8vh'
  },
  inputActionField: {
    marginTop: theme.spacing.unit * 4,
    fontWeight: '300'
  },
  fab: {
    background: 'linear-gradient(to top, #8f94fb, #4e54c8)',
    color: '#ffffff',
    textTransform: 'capitalize',
    borderRadius: 3,
    fontSize: 15,
    '&:hover': {
      backgroundColor: blue[900]
    },
    margin: theme.spacing.unit,
    padding: '3px 35px 3px 35px',
    width: '12vw',
    boxShadow: 'none'
  },
  alignMent: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 2
  },
  createAccount: {
    display: 'flex',
    position: 'fixed',
    bottom: '5vh'
  },
  createQuestion: {
    fontWeight: '300',
    color: grey[600],
  },
  createAccountButton: {
    color: blue[700],
    marginLeft: theme.spacing.unit,
    '&:hover': {
      color: blue[800]
    }
  },
  forgotPassword: {
    cursor: 'pointer',
    textDecoration: 'underline',
    color: blue[900],
    letterSpacing: '1px',
    marginTop: theme.spacing.unit * 5,
    marginLeft: '3vw',
    fontWeight: '300'
  },
  errorMessage: {
    display: 'flex'
  },
  errorLogin: {
    color: 'red',
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit * 1
  },
  iconErr: {
    color: 'red',
    marginTop: theme.spacing.unit * 2.5
  },
  customInputRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3
    },
    width: '28vw',
    marginTop: theme.spacing.unit * 10
  },
  customkInput: {
    borderRadius: 3,
    backgroundColor: 'rgb(252, 252, 252)',
    border: '2px solid #f2f2f2',
    color: '#33333',
    fontSize: '16',
    padding: '10px 12px',
    height: '4vh',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(','),
    '&:focus': {
      borderColor: '#80bdff'
    },
    bootstrapFormLabel: {
      fontSize: 18
    }
  },
  forms: {
    marginTop: theme.spacing.unit
  },
  inputContainer: {
    marginTop: theme.spacing.unit,
    marginLeft: '2vw'
  }
});
class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: ''
    };
  }

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password } = this.state;
    const { classes } = this.props;
    const SignInButtonLink = props => <Link to={'/signup'} {...props} />;

    return (
      <Mutation
        mutation={LOGIN}
        onCompleted={data => {
          localStorage.setItem(AUTH_TOKEN, data.login.session_token);
          this.props.history.push('/');
        }}
        errorPolicy="all"
        onError={error => {
          this.setState({ password: '' });
        }}
      >
        {(login, { loading, error }) => {
          return (
            <ValidatorForm
              onSubmit={() => {
                login({ variables: { email, password } });
                this.props.history.push('/signin');
              }}
              instantValidate={false}
            >
              <Grid container className={classes.loginContainer} spacing={16}>
                <Grid item xs={5} className={classes.formContainer}>
                  <img src={Logo} className={classes.logo} alt="kaagapAI" />
                  <Grid container>
                    <Grid item xs={1} />
                    <Grid item xs={10}>
                      <Typography className={classes.signInWelcome}>
                        Welcome to
                      </Typography>
                      <Typography className={classes.signIn}>
                        kaagapAI
                      </Typography>
                      <Grid
                        container
                        spacing={8}
                        className={classes.formItems}
                        alignContent="center"
                      >
                        {error ? (
                          <Grid item xs={12}>
                            {error.graphQLErrors.map(({ message }) => {
                              return (
                                <div
                                  key={message}
                                  className={classes.errorMessage}
                                >
                                  <Icon className={classes.iconErr}>
                                    error_outline
                                  </Icon>
                                  <Typography className={classes.errorLogin}>
                                    {message}
                                  </Typography>
                                </div>
                              );
                            })}
                          </Grid>
                        ) : null}
                        {this.props.location.search ===
                        '?authenticated=false' ? (
                          <Grid item xs={12}>
                            <div className={classes.errorMessage}>
                              <Icon className={classes.iconErr}>
                                error_outline
                              </Icon>
                              <Typography className={classes.errorLogin}>
                                You must be logged in
                              </Typography>
                            </div>
                          </Grid>
                        ) : null}
                        <Grid item xs={10} className={classes.inputContainer}>
                          <FormControl className={classes.forms}>
                            <InputLabel
                              shrink
                              className={classes.bootstrapFormLabel}
                            >
                              Email
                            </InputLabel>
                            <InputBase
                              fullWidth
                              label="Email"
                              margin="dense"
                              autoComplete="email"
                              name="email"
                              value={email}
                              validators={['required', 'isEmail']}
                              errorMessages={[
                                'Enter an email',
                                'Invalid email'
                              ]}
                              disabled={loading}
                              onChange={this.inputChangeHandler}
                              classes={{
                                root: classes.customInputRoot,
                                input: classes.customkInput
                              }}
                            />
                          </FormControl>
                          <FormControl className={classes.forms}>
                            <InputLabel
                              shrink
                              className={classes.bootstrapFormLabel}
                            >
                              Password
                            </InputLabel>
                            <InputBase
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
                              disabled={loading}
                              onChange={this.inputChangeHandler}
                              classes={{
                                root: classes.customInputRoot,
                                input: classes.customkInput
                              }}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={5}>
                          <Typography className={classes.forgotPassword}>
                            Forgot password?
                          </Typography>
                        </Grid>
                        <Grid item xs={7} className={classes.alignMent}>
                          <Fab
                            variant="extended"
                            className={classes.fab}
                            type="submit"
                            disabled={loading}
                          >
                            {loading ? 'Logging in...' : 'Login'}
                          </Fab>
                        </Grid>
                        <Grid item className={classes.createAccount} xs={12}>
                          <Typography className={classes.createQuestion}>
                            Don't have an account yet?
                          </Typography>
                          <Typography
                            className={classes.createAccountButton}
                            component={SignInButtonLink}
                          >
                            Create account
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item className={classes.illustrationContainer} xs={7}>
                  <img
                    src={LoginAnimation}
                    className={classes.sigInIllustration}
                    alt="Sign in illustration"
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

export default withStyles(styles)(SignIn);
