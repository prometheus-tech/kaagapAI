import React, { Component } from 'react';

import EDIT_CLIENT from '../../../graphql/mutations/editClient';
import { Mutation } from 'react-apollo';

import { withSnackbar } from 'notistack';

import { withStyles } from '@material-ui/core/styles';
import { lightBlue } from '@material-ui/core/colors';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

const styles = theme => ({
  extendedButton: {
    backgroundColor: lightBlue[600],
    color: '#ffffff',
    textTransform: 'capitalize',
    fontSize: 16,
    '&:hover': {
      backgroundColor: lightBlue[700],
      boxShadow: theme.shadows[8]
    },
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  inputGroup: {
    marginTop: 16,
    marginBottom: 16
  },
  group: {
    margin: '0 16px'
  }
});

class EditClientDialog extends Component {
  constructor(props) {
    super(props);

    const {
      c_id,
      fname,
      lname,
      gender,
      birthdate,
      no_of_sessions
    } = props.client;

    this.state = {
      c_id: parseInt(c_id),
      fname: fname,
      lname: lname,
      gender: gender,
      birthdate: birthdate,
      no_of_sessions: no_of_sessions
    };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  componentWillReceiveProps({
    client: { c_id, fname, lname, gender, birthdate, no_of_sessions }
  }) {
    this.setState({
      c_id: parseInt(c_id),
      fname: fname,
      lname: lname,
      gender: gender,
      birthdate: birthdate,
      no_of_sessions: no_of_sessions
    });
  }

  /**
   * Custom validators
   */
  componentWillMount() {
    const letters = '^[A-Za-z\\s-]+$';
    ValidatorForm.addValidationRule('isLetter', value => {
      return value.match(letters);
    });
    const date = '^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))$';
    ValidatorForm.addValidationRule('isDate', value => {
      return value.match(date);
    });
  }

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { classes, fullScreen, isOpened, closed } = this.props;
    const {
      c_id,
      fname,
      lname,
      gender,
      birthdate,
      no_of_sessions
    } = this.state;

    return (
      <Mutation
        mutation={EDIT_CLIENT}
        optimisticResponse={{
          __typename: 'Mutation',
          updateClientInformation: {
            __typename: 'Client',
            c_id: c_id,
            fname: fname,
            lname: lname,
            gender: gender,
            birthdate: birthdate,
            no_of_sessions: no_of_sessions
          }
        }}
      >
        {editClient => {
          return (
            <Dialog
              open={isOpened}
              onClose={closed}
              fullWidth={true}
              fullScreen={fullScreen}
              maxWidth="sm"
            >
              <ValidatorForm
                onSubmit={() => {
                  editClient({
                    variables: {
                      c_id: c_id,
                      fname: fname,
                      lname: lname,
                      gender: gender,
                      birthdate: birthdate
                    }
                  });

                  closed();

                  this.props.enqueueSnackbar(
                    fname + ' ' + lname + ' successfully edited!'
                  );
                }}
              >
                <DialogTitle onClose={this.closeNewClientDialogHandler}>
                  Edit Client
                </DialogTitle>
                <DialogContent>
                  <Grid container spacing={16}>
                    <Grid item xs={12}>
                      <Grid container spacing={8}>
                        <Grid item xs={12} sm={6}>
                          <TextValidator
                            label="First name"
                            value={fname}
                            variant="outlined"
                            fullWidth
                            name="fname"
                            onChange={this.inputChangeHandler}
                            margin="dense"
                            validators={[
                              'required',
                              'minStringLength: ' + 2,
                              'maxStringLength:' + 20,
                              'isLetter'
                            ]}
                            errorMessages={[
                              'This field is required',
                              'First name might be too short',
                              'First name must be less than 20 characters',
                              'Please do not include numbers and/or special characters'
                            ]}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <TextValidator
                            label="Last name"
                            value={lname}
                            variant="outlined"
                            fullWidth
                            name="lname"
                            onChange={this.inputChangeHandler}
                            margin="dense"
                            validators={[
                              'required',
                              'minStringLength: ' + 2,
                              'maxStringLength:' + 20,
                              'isLetter'
                            ]}
                            errorMessages={[
                              'This field is required',
                              'Last name might be too short',
                              'Last name must be less than 20 characters',
                              'Please do not include numbers and/or special characters'
                            ]}
                          />
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item xs={12} className={classes.inputGroup}>
                      <FormControl component="fieldset">
                        <FormLabel component="legend">Gender</FormLabel>
                        <RadioGroup
                          className={classes.group}
                          row
                          name="gender"
                          onChange={this.inputChangeHandler}
                          value={gender}
                        >
                          <FormControlLabel
                            value="M"
                            control={<Radio color="primary" />}
                            label="Male"
                            labelPlacement="end"
                          />
                          <FormControlLabel
                            value="F"
                            control={<Radio color="primary" />}
                            label="Female"
                            labelPlacement="end"
                          />
                        </RadioGroup>
                      </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                      <TextValidator
                        type="date"
                        label="Birthdate"
                        variant="outlined"
                        InputLabelProps={{
                          shrink: true
                        }}
                        name="birthdate"
                        value={birthdate}
                        fullWidth
                        onChange={this.inputChangeHandler}
                        margin="dense"
                        validators={['required', 'isDate']}
                        errorMessages={[
                          'This field is required',
                          'Not a valid date'
                        ]}
                      />
                    </Grid>
                  </Grid>
                </DialogContent>
                <DialogActions>
                  <Button onClick={closed}>Cancel</Button>
                  <Button type="submit" color="primary" autoFocus>
                    Save Changes
                  </Button>
                </DialogActions>
              </ValidatorForm>
            </Dialog>
          );
        }}
      </Mutation>
    );
  }
}

export default withMobileDialog({ breakpoint: 'xs' })(
  withStyles(styles)(withSnackbar(EditClientDialog))
);
