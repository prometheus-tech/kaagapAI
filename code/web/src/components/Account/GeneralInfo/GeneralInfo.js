import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputBase from '@material-ui/core/InputBase';
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

class GeneralInfo extends Component {
  constructor(props) {
    super(props);

    const {
      email,
      phone_no,
      fname,
      lname,
      license,
      profession
    } = props.profile;

    this.state = {
      email,
      phone_no,
      fname,
      lname,
      license,
      profession
    };
  }

  componentWillReceiveProps({
    client: { email, phone_no, fname, lname, license, profession }
  }) {
    this.setState({
      email,
      phone_no,
      fname,
      lname,
      license,
      profession
    });
  }

  render() {
    const { classes } = this.props;

    const { email, phone_no, fname, lname, license, profession } = this.state;

    return (
      <Paper className={classes.accountContainer}>
        <form className={classes.formContainer} noValidate autoComplete="off">
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <FormControl className={classes.forms}>
                <InputLabel shrink className={classes.bootstrapFormLabel}>
                  First name
                </InputLabel>
                <InputBase
                  fullWidth
                  value={fname}
                  classes={{
                    root: classes.customInputRoot,
                    input: classes.customkInput
                  }}
                />
              </FormControl>
              <FormControl className={classes.forms}>
                <InputLabel shrink className={classes.bootstrapFormLabel}>
                  Last name
                </InputLabel>
                <InputBase
                  fullWidth
                  value={lname}
                  classes={{
                    root: classes.customInputRoot,
                    input: classes.customkInput
                  }}
                />
              </FormControl>
              <FormControl className={classes.forms}>
                <InputLabel shrink className={classes.bootstrapFormLabel}>
                  Phone number
                </InputLabel>
                <InputBase
                  fullWidth
                  value={phone_no}
                  classes={{
                    root: classes.customInputRoot,
                    input: classes.customkInput
                  }}
                />
              </FormControl>
              <FormControl className={classes.forms}>
                <InputLabel shrink className={classes.bootstrapFormLabel}>
                  Email
                </InputLabel>
                <InputBase
                  fullWidth
                  value={email}
                  classes={{
                    root: classes.customInputRoot,
                    input: classes.customkInput
                  }}
                  className={classes.email}
                />
              </FormControl>
              <FormControl className={classes.forms}>
                <InputLabel shrink className={classes.bootstrapFormLabel}>
                  Profession
                </InputLabel>
                <InputBase
                  fullWidth
                  value={profession}
                  classes={{
                    root: classes.customInputRoot,
                    input: classes.customkInput
                  }}
                />
              </FormControl>
              <FormControl className={classes.forms}>
                <InputLabel shrink className={classes.bootstrapFormLabel}>
                  License number
                </InputLabel>
                <InputBase
                  fullWidth
                  value={license}
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
    );
  }
}

export default withStyles(styles)(GeneralInfo);
