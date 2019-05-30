import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { withRouter } from 'react-router-dom';

import { Mutation } from 'react-apollo';
import CHANGE_PASSWORD from '../../../graphql/mutations/changePassword';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import kaagapaiLogo from '../../../assets/kaagapai-logo.svg';

import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
import grey from '@material-ui/core/colors/grey';
import CheckIcon from '@material-ui/icons/Check';

import { Link } from 'react-router-dom';

const styles = theme => ({
  root: {
    height: '100vh',
    width: '100%',
    bacgroundColor: '#f8f8f8',
    overflowX: 'hidden'
  },
  formContainer: {
    textAlign: 'center'
  },
  forms: {
    minHeight: '50vh',
    width: '100%',
    backgroundColor: 'rgb(254, 254, 254)',
    marginTop: theme.spacing.unit * 5,
    border: '1px solid #f3f3f3',
    borderRadius: 5
  },
  customInputRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3
    },
    width: '25vw'
  },
  customkInput: {
    borderRadius: 3,
    backgroundColor: 'rgb(252, 252, 252)',
    border: '2px solid #f2f2f2',
    color: '#33333',
    fontSize: '16',
    padding: '10px 12px',
    marginTop: theme.spacing.unit,
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
  inputs: {
    marginTop: theme.spacing.unit * 4
  },
  inputsContainer: {
    marginTop: theme.spacing.unit
  },
  saveChangesButton: {
    backgroundColor: '#fdc830',
    color: '#ffffff',
    width: '25vw',
    padding: '10px 10px 10px 10px',
    marginTop: theme.spacing.unit * 5,
    '&:hover': {
      backgroundColor: '#fdc830'
    }
  },
  logo: {
    height: 80,
    width: 80,
    marginTop: theme.spacing.unit * 10
  },
  successContainer: {
    padding: theme.spacing.unit * 2
  },
  successHeader: {
    color: grey[500],
    marginBottom: theme.spacing.unit * 2
  },
  successText: {
    marginBottom: theme.spacing.unit * 6
  },
  checkIcon: {
    color: green[200],
    fontSize: '96px'
  },
  link: {
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
class UpdatePassword extends Component {
  state = {
    password: '',
    confirmPassword: '',
    currentStep: 0
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
    const { password, confirmPassword, currentStep } = this.state;

    const { classes } = this.props;

    const { password_token } = this.props.match.params;

    const SignInLink = props => <Link to={'/signin'} {...props} />;

    return (
      <Mutation
        mutation={CHANGE_PASSWORD}
        errorPolicy="all"
        onError={error => {
          // Ignore error
        }}
        onCompleted={data => {
          this.changeCurrentStepHandler();
        }}
      >
        {(changePassword, { loading, error }) => {
          return (
            <div className={classes.root}>
              <Grid container spacing={16}>
                <Grid item xs={4} />
                <Grid item xs={4} className={classes.formContainer}>
                  <img
                    src={kaagapaiLogo}
                    alt="kaagapailogo"
                    className={classes.logo}
                  />
                  <form className={classes.forms}>
                    {currentStep === 0 && (
                      <Grid container className={classes.inputsContainer}>
                        <Grid item xs={12} className={classes.inputs}>
                          <FormControl>
                            <InputLabel
                              shrink
                              className={classes.bootstrapFormLabel}
                            >
                              New password
                            </InputLabel>
                            <InputBase
                              type="password"
                              classes={{
                                root: classes.customInputRoot,
                                input: classes.customkInput
                              }}
                              name="password"
                              value={password}
                              onChange={this.inputChangeHandler}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} className={classes.inputs}>
                          <FormControl>
                            <InputLabel
                              shrink
                              className={classes.bootstrapFormLabel}
                            >
                              Confirm new password
                            </InputLabel>
                            <InputBase
                              type="password"
                              classes={{
                                root: classes.customInputRoot,
                                input: classes.customkInput
                              }}
                              name="confirmPassword"
                              value={confirmPassword}
                              onChange={this.inputChangeHandler}
                            />
                          </FormControl>
                        </Grid>
                        <Grid item xs={12} className={classes.buttonContainer}>
                          <Button
                            type="button"
                            color="primary"
                            className={classes.saveChangesButton}
                            onClick={() => {
                              changePassword({
                                variables: {
                                  changePasswordToken: password_token,
                                  password: password
                                }
                              });
                            }}
                            disabled={
                              password !== confirmPassword ||
                              password.length === 0 ||
                              loading
                            }
                          >
                            {!loading ? 'Reset password' : 'Resetting...'}
                          </Button>
                        </Grid>
                      </Grid>
                    )}
                    {currentStep === 1 && (
                      <div className={classes.successContainer}>
                        <CheckIcon className={classes.checkIcon} />
                        <Typography
                          variant="h5"
                          className={classes.successHeader}
                        >
                          Password Changed
                        </Typography>
                        <Typography className={classes.successText}>
                          Your password has been changed. You can now use your
                          new password to sign in.
                        </Typography>
                        <Typography
                          component={SignInLink}
                          className={classes.link}
                        >
                          Back to sign in
                        </Typography>
                      </div>
                    )}
                  </form>
                </Grid>
              </Grid>
            </div>
          );
        }}
      </Mutation>
    );
  }
}
export default withStyles(styles)(withRouter(UpdatePassword));
