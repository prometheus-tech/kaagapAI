import React, { Component } from 'react';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import { InputAdornment, withStyles } from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/ButtonBase';

const styles = theme => ({
  accountContainer: {
    marginTop: theme.spacing.unit * 2,
    boxShadow: 'none',
    border: '1px solid #f4f4f4',
    backgroundColor: 'rgb(250, 250, 250)',
    padding: theme.spacing.unit * 5,
    borderRadius: 10
  },
  formContainer: {
    textAlign: 'center'
  },
  forms: {
    margin: theme.spacing.unit * 2
  },
  bootstrapFormLabel: {
    fontSize: 18
  },
  customInputRoot: {
    'label + &': {
      marginTop: theme.spacing.unit * 3
    },
    width: '20vw'
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
    }
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
      border: '1px solid transparent',
      color: '#ffffff'
    },
    margin: theme.spacing.unit,
    padding: '10px 25px 10px 25px',
    boxShadow: 'none'
  }
});

class ChangePassword extends Component {
  state = {
    password: '',
    newPassword: '',
    showPassword: false,
    showNewPassword: false
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
      <Paper className={classes.accountContainer}>
        <form className={classes.formContainer} noValidate autoComplete="off">
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <FormControl className={classes.forms}>
                <InputLabel shrink className={classes.bootstrapFormLabel}>
                  Old password
                </InputLabel>
                <InputBase
                  type={this.state.showPassword ? 'text' : 'password'}
                  fullWidth
                  onChange={this.handleChange('password')}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={this.handleClickShowPassword}>
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
                <InputLabel shrink className={classes.bootstrapFormLabel}>
                  New password
                </InputLabel>
                <InputBase
                  fullWidth
                  onChange={this.handleChange('password')}
                  type={this.state.showNewPassword ? 'text' : 'password'}
                  classes={{
                    root: classes.customInputRoot,
                    input: classes.customkInput
                  }}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton onClick={this.handleClickShowNewPassword}>
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
    );
  }
}

export default withStyles(styles)(ChangePassword);
