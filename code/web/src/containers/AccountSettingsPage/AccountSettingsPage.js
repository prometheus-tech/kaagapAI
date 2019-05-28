import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import { InputAdornment } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/ButtonBase';
import grey from '@material-ui/core/colors/grey';

// import { Link as RouterLink, withRouter } from 'react-router-dom';

const styles = theme => ({
  accountTitle: {
    color: '#2d3436',
    letterSpacing: '2px',
    fontWeight: '400'
  },
  accountSubTitle: {
    color: grey[600],
    fontWeight: 300
  },
  divItem1: {
    height: '2px',
    width: '20px',
    backgroundColor: 'orange'
  },
  root: {
    width: '90vw',
    marginLeft: '5vw'
  },
  accountContainer: {
    marginTop: theme.spacing.unit * 2,
    boxShadow: 'none',
    border: '1px solid #f4f4f4',
    backgroundColor: 'rgb(250, 250, 250)',
    padding: theme.spacing.unit * 5,
    borderRadius: 10
  },
  forms: {
    margin: theme.spacing.unit * 2
  },
  customInputRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3
    },
    width: '20vw'
  },
  customkInput: {
    borderRadius: 3,
    backgroundColor: 'rgb(250, 250, 250)',
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
    textAlign: 'center'
  },
  buttonContainer: {
    textAlign: 'right'
  },
  saveChangesButton: {
    color: '#f37335',
    borderRadius: 4,
    border: '1px solid #f37335',
    fontSize: 15,
    '&:hover': {
      background: '#fdc830',
      border: '0px',
      color: '#ffffff'
    },
    margin: theme.spacing.unit,
    padding: '10px 25px 10px 25px',
    boxShadow: 'none'
  },
  accountSettings: {
    marginLeft: theme.spacing.unit * 10,
    marginTop: theme.spacing.unit * 10
  },
  passwordContainer: {
    marginLeft: theme.spacing.unit * 10,
    marginTop: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit * 10
  }
});

class AccountSettingsPage extends Component {
  state = {
    password: '',
    showPassword: false,
    showNewPassword: true
  };
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };
  handleClickShowNewPassword = () => {
    this.setState(state => ({ showNewPassword: !state.showNewPassword }));
  };
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.accountSettings}>
          <div>
            <div className={classes.divItem1} />
            <Typography variant="h6" className={classes.accountTitle}>
              General Information
            </Typography>
            <Typography variant="subtitle2" className={classes.accountSubTitle}>
              Update your profile.
            </Typography>
          </div>
          <Grid container>
            <Grid item xs={2} />
            <Grid item xs={8}>
              <Paper className={classes.accountContainer}>
                <form
                  className={classes.formContainer}
                  noValidate
                  autoComplete="off"
                >
                  <Grid container spacing={16}>
                    <Grid item xs={12}>
                      <FormControl className={classes.forms}>
                        <InputLabel
                          shrink
                          className={classes.bootstrapFormLabel}
                        >
                          Firstname
                        </InputLabel>
                        <InputBase
                          fullWidth
                          defaultValue="John"
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
                          Lastname
                        </InputLabel>
                        <InputBase
                          fullWidth
                          defaultValue="Doe"
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
                          Phone number
                        </InputLabel>
                        <InputBase
                          fullWidth
                          defaultValue="0999998878788"
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
                          Email
                        </InputLabel>
                        <InputBase
                          fullWidth
                          defaultValue="johndoe@gmail.com"
                          classes={{
                            root: classes.customInputRoot,
                            input: classes.customkInput
                          }}
                          className={classes.email}
                        />
                      </FormControl>
                      <FormControl className={classes.forms}>
                        <InputLabel
                          shrink
                          className={classes.bootstrapFormLabel}
                        >
                          Profession
                        </InputLabel>
                        <InputBase
                          fullWidth
                          defaultValue="Psychologist"
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
                          Liscense number
                        </InputLabel>
                        <InputBase
                          fullWidth
                          defaultValue="1233545568768"
                          classes={{
                            root: classes.customInputRoot,
                            input: classes.customkInput
                          }}
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} className={classes.buttonContainer}>
                      <Button
                        type="button"
                        color="primary"
                        className={classes.saveChangesButton}
                      >
                        Save changes
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </div>

        {/* password */}
        <div className={classes.passwordContainer}>
          <div>
            <div className={classes.divItem1} />
            <Typography variant="h6" className={classes.accountTitle}>
              Change password
            </Typography>
            <Typography variant="subtitle2" className={classes.accountSubTitle}>
              Remember, your password should not be easy and common! were
              concern and its for your safety.
            </Typography>
          </div>
          <Grid container>
            <Grid item xs={2} />
            <Grid item xs={8}>
              <Paper className={classes.accountContainer}>
                <form
                  className={classes.formContainer}
                  noValidate
                  autoComplete="off"
                >
                  <Grid container spacing={16}>
                    <Grid item xs={12}>
                      <FormControl className={classes.forms}>
                        <InputLabel
                          shrink
                          className={classes.bootstrapFormLabel}
                        >
                          Old password
                        </InputLabel>
                        <InputBase
                          type={this.state.showPassword ? 'text' : 'password'}
                          fullWidth
                          defaultValue="Loraine"
                          onChange={this.handleChange('password')}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowPassword}
                              >
                                {this.state.showPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
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
                          New password
                        </InputLabel>
                        <InputBase
                          fullWidth
                          onChange={this.handleChange('password')}
                          type={
                            this.state.showNewPassword ? 'text' : 'password'
                          }
                          classes={{
                            root: classes.customInputRoot,
                            input: classes.customkInput
                          }}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="Toggle password visibility"
                                onClick={this.handleClickShowNewPassword}
                              >
                                {this.state.showNewPassword ? (
                                  <Visibility />
                                ) : (
                                  <VisibilityOff />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                        />
                      </FormControl>
                    </Grid>
                    <Grid item xs={12} className={classes.buttonContainer}>
                      <Button
                        type="button"
                        color="primary"
                        className={classes.saveChangesButton}
                      >
                        Change password
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </Paper>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(AccountSettingsPage);
