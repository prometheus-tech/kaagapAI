import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import forgot_password from '../../../assets/forgot_password.svg';

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
  render() {
    const { classes } = this.props;
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
            <Grid container className={classes.forms}>
              <Grid item xs={12} className={classes.messageContainer}>
                <Typography variant="h6" className={classes.title}>
                  Forgot Password?
                </Typography>
                <Typography variant="subtitle1" className={classes.subtitle}>
                  Enter the email address associated with your account.
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <FormControl className={classes.forms}>
                  <InputLabel shrink className={classes.bootstrapFormLabel}>
                    Email address
                  </InputLabel>
                  <InputBase
                    fullWidth
                    classes={{
                      root: classes.customInputRoot,
                      input: classes.customkInput
                    }}
                  />
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <ButtonBase type="button" className={classes.resetPassword}>
                  Reset password
                </ButtonBase>
              </Grid>
              <Grid item xs={12}>
                <ButtonBase type="button" className={classes.return}>
                  Back to sign in
                </ButtonBase>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(FindEmail);
