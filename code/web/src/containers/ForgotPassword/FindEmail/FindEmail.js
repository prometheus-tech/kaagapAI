import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { Mutation } from 'react-apollo';
import FORGOT_PASSWORD from '../../../graphql/mutations/forgotPassword';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import forgot_password from '../../../assets/forgot_password.svg';
import EmailIcon from '@material-ui/icons/Email';

import { Link as RouterLink } from 'react-router-dom';

const styles = theme => ({
  root: {
    width: '100vw',
    height: '100vh',
    overflowX: 'hidden',
    backgroundColor: '#f8f8f8'
  },
  illustrationContainer: {
    height: '100vh',
    width: '100%',
    backgroundColor: '#f4f4f4',
    textAlign: 'center'
  },
  illustration: {
    height: '60vh',
    marginTop: '20vh'
  },
  customInputRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3
    },
    width: '30vw'
  },
  customkInput: {
    borderRadius: 3,
    backgroundColor: 'rgb(252, 252, 252)',
    border: '2px solid #f2f2f2',
    color: '#33333',
    fontSize: '16',
    padding: '10px 12px',
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
  formContainer: {
    textAlign: 'center',
    marginTop: theme.spacing.unit * 20
  },
  resetPassword: {
    color: '#ffffff',
    borderRadius: 4,
    fontSize: 16,
    letterSpacing: '2px',
    backgroundColor: '#fdc830',
    width: '30vw',
    '&:hover': {
      border: '0px',
      color: '#ffffff'
    },
    margin: theme.spacing.unit,
    padding: '12px 25px 12px 25px',
    boxShadow: 'none',
    marginTop: theme.spacing.unit * 5
  },
  emailIcon: {
    color: grey[500],
    fontSize: 96
  },
  title: {
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
    ],
    fontWeight: 400,
    fontSize: 24,
    color: grey[500]
  },
  subtitle: {
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
    ],
    fontWeight: 300,
    fontSize: 13,
    color: grey[400],
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 8
  },
  return: {
    textDecoration: 'underline',
    fontSize: 12,
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
    ],
    color: '#fdc830'
  }
});

class FindEmail extends Component {
  state = {
    currentStep: 0,
    email: ''
  };

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  changeCurrentStepHandler = () => {
    this.setState({
      currentStep: 1
    });
  };

  render() {
    const { classes } = this.props;

    const { email, currentStep } = this.state;

    const ButtonSinginInLink = props => <RouterLink to="/signin" {...props} />;

    return (
      <Mutation
        mutation={FORGOT_PASSWORD}
        errorPolicy="all"
        onError={error => {
          // Ignore error
        }}
        onCompleted={data => {
          this.changeCurrentStepHandler();
        }}
      >
        {(forgotPassword, { loading, error }) => {
          return (
            <div className={classes.root}>
              <Grid container>
                <Grid item xs={7} className={classes.illustrationContainer}>
                  <img
                    src={forgot_password}
                    className={classes.illustration}
                    alt="forgot password"
                  />
                </Grid>
                <Grid item xs={5} className={classes.formContainer}>
                  {currentStep === 0 ? (
                    <Grid container className={classes.forms}>
                      <Grid item xs={12} className={classes.messageContainer}>
                        <Typography variant="h6" className={classes.title}>
                          Forgot Password?
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          className={classes.subtitle}
                        >
                          Enter the email address associated with your account.
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl className={classes.forms}>
                          <InputLabel
                            shrink
                            className={classes.bootstrapFormLabel}
                          >
                            Email address
                          </InputLabel>
                          <InputBase
                            fullWidth
                            classes={{
                              root: classes.customInputRoot,
                              input: classes.customkInput
                            }}
                            value={email}
                            name="email"
                            onChange={this.inputChangeHandler}
                          />
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <ButtonBase
                          type="button"
                          className={classes.resetPassword}
                          onClick={() => {
                            forgotPassword({ variables: { email: email } });
                          }}
                          disabled={loading}
                        >
                          {!loading ? 'Reset password' : 'Searching account...'}
                        </ButtonBase>
                      </Grid>
                      <Grid item xs={12}>
                        <ButtonBase
                          component={ButtonSinginInLink}
                          type="button"
                          className={classes.return}
                        >
                          Back to sign in
                        </ButtonBase>
                      </Grid>
                    </Grid>
                  ) : (
                    <Grid container>
                      <Grid item xs={12}>
                        <EmailIcon className={classes.emailIcon} />
                        <Typography variant="h6" className={classes.title}>
                          Check your email
                        </Typography>
                        <Typography
                          variant="subtitle1"
                          className={classes.subtitle}
                        >
                          A reset password link was sent to your email. Use the
                          link to reset your password.
                        </Typography>
                      </Grid>
                    </Grid>
                  )}
                </Grid>
              </Grid>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
export default withStyles(styles)(FindEmail);
