import React, { Component } from 'react';

import { AUTH_TOKEN } from '../../util/constants';

import { Mutation } from 'react-apollo';
import LOGIN from '../../graphql/mutations/login';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

import Typography from '@material-ui/core/Typography';
import SignInIllustration from '../../assets/credentialillustration.svg';
import Logo from '../../assets/kaagapai-logo.svg';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';
import Icon from '@material-ui/core/Icon';
import Fab from '@material-ui/core/Fab';

import { Link } from 'react-router-dom';

const styles = theme => ({
  loginContainer: {
    width: '100vw',
    height: '100vh',
    padding: '0vh',
    margin: '0'
  },
  logo: {
    margin: 20,
    width: 60,
    height: 60
  },
  signIn: {
    marginTop: '10vh',
    marginLeft: theme.spacing.unit * 5,
    fontSize: theme.spacing.unit * 4,
    color: blue[900]
  },
  signInInformation: {
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 5,
    fontSize: theme.spacing.unit * 2,
    fontWeight: '300',
    color: grey[600],
    lineHeight: '150%'
  },
  formContainer: {
    backgroundColor: 'rgb(252, 252, 252)'
  },
  formItems: {
    marginTop: '4vh',
    marginLeft: theme.spacing.unit * 5
  },
  illustrationContainer: {
    display: 'inline',
    textAlign: 'center'
    // background: '#f12711',
    // background: '-webkit-linear-gradient(to bottom, #f5af19, #f12711)',
    // background: 'linear-gradient(to bottom, #f5af19, #f12711)'
  },
  sigInIllustration: {
    height: '70vh',
    marginTop: '10vh'
  },
  fab: {
    margin: theme.spacing.unit,
    borderRadius: '50px',
    padding: '10px 45px 10px 45px',
    backgroundColor: blue[600],
    color: '#ffffff',
    '&:hover': {
      backgroundColor: blue[700]
    }
  },
  alignMent: {
    textAlign: 'right'
  },
  createAccount: {
    display: 'flex',
    marginTop: '20vh'
  },
  createQuestion: {
    fontWeight: '300',
    color: grey[600]
  },
  createAccountButton: {
    color: blue[700],
    marginLeft: theme.spacing.unit,
    '&:hover': {
      color: blue[800]
    }
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
              <Grid container className={classes.loginContainer} spacing={16}>
                {error ? (
                  <Grid item xs={12}>
                    {error.graphQLErrors.map(({ message }) => {
                      return <Typography key={message}>{message}</Typography>;
                    })}
                  </Grid>
                ) : null}
                <Grid item xs={5} className={classes.formContainer}>
                  <img src={Logo} className={classes.logo} alt="kaagapAI" />
                  <Typography className={classes.signIn}>Login.</Typography>
                  <Typography className={classes.signInInformation}>
                    To Login fill in the the necessary information, please
                    provide the necessary message here.
                  </Typography>
                  <Grid
                    container
                    spacing={8}
                    className={classes.formItems}
                    alignContent="center"
                  >
                    <Grid item xs={10}>
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
                        label="Password"
                        variant="outlined"
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
                      />
                    </Grid>
                    <Grid item xs={10} className={classes.alignMent}>
                      <Fab
                        variant="extended"
                        aria-label="Delete"
                        className={classes.fab}
                        type="submit"
                      >
                        {loading ? 'Logging in...' : 'Login'}
                        <Icon>arrow_right_alt</Icon>
                      </Fab>
                    </Grid>
                    <Grid item className={classes.createAccount} xs={12}>
                      <Typography className={classes.createQuestion}>
                        Don't have an account ?
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
                <Grid item className={classes.illustrationContainer} xs={7}>
                  <img
                    src={SignInIllustration}
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
