import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
import Button from '@material-ui/core/Button';
import kaagapaiLogo from '../../../assets/kaagapai-logo.svg';

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
  }
});
class UpdatePassword extends Component {
  render() {
    const { classes } = this.props;

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
              <Grid container className={classes.inputsContainer}>
                <Grid item xs={12} className={classes.inputs}>
                  <FormControl>
                    <InputLabel shrink className={classes.bootstrapFormLabel}>
                      New password
                    </InputLabel>
                    <InputBase
                      type="password"
                      classes={{
                        root: classes.customInputRoot,
                        input: classes.customkInput
                      }}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} className={classes.inputs}>
                  <FormControl>
                    <InputLabel shrink className={classes.bootstrapFormLabel}>
                      Confirm new password
                    </InputLabel>
                    <InputBase
                      type="password"
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
                    Reset my password
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(UpdatePassword);
