import React, { Component } from 'react';

import { USER_ID } from '../../../util/constants';

import ADD_CLIENT from '../../../graphql/mutations/addClient';
import { Mutation } from 'react-apollo';
import CLIENTS from '../../../graphql/queries/clients';

import { withSnackbar } from 'notistack';

import Hidden from '@material-ui/core/Hidden';
import { withStyles } from '@material-ui/core/styles';
import SimpleSnackbar from '../../UI/SimpleSnackbar/SimpleSnackbar';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import { lightBlue } from '@material-ui/core/colors';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
// import { ValidatorComponent } from 'react-form-validator-core';

const styles = theme => ({
  floatingButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    backgroundColor: lightBlue[600],
    boxShadow: theme.shadows[24],
    color: '#ffffff',
    '&:hover': {
      backgroundColor: lightBlue[700],
      boxShadow: theme.shadows[10]
    },
    zIndex: 2
  },
  extendedButton: {
    backgroundColor: lightBlue[600],
    color: '#ffffff',
    textTransform: 'capitalize',
    fontSize: 16,
    '&:hover': {
      backgroundColor: lightBlue[700],
      boxShadow: theme.shadows[10]
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

class NewClientDialog extends Component {
  constructor(props) {
    super(props);

    this.state = {
      p_id: parseInt(localStorage.getItem(USER_ID)),
      fname: '',
      lname: '',
      gender: '',
      birthdate: '',
      submitted: false,
      isDialogOpened: false
    };
    // Code for validation
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
    this.handleSubmitForm = this.handleSubmitForm.bind(this);
  }

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  openNewClientDialogHandler = () => {
    this.setState({
      isDialogOpened: true
    });
  };

  closeNewClientDialogHandler = () => {
    this.setState({
      fname: '',
      lname: '',
      gender: '',
      birthdate: '',
      isDialogOpened: false
    });
  };
  // Code for Validation
  // handleValidationForm(event) {
  //   const { formDataValidation } = this.state;
  //   formDataValidation[event.target.name] = event.target.value;
  //   this.setState({ formDataValidation });
  // }
  handleSubmitForm() {
    this.setState({ submitted: true }, () => {
      setTimeout(() => this.setState({ submitted: false }), 5000);
    });
  }

  render() {
    const { classes, fullScreen } = this.props;
    const {
      isDialogOpened,
      p_id,
      fname,
      lname,
      gender,
      birthdate
    } = this.state;

    // Code for Validation
    const { submitted } = this.state;
    return (
      <Auxilliary>
        <Hidden smDown>
          <Fab
            color="primary"
            variant="extended"
            className={classes.extendedButton}
            onClick={this.openNewClientDialogHandler}
          >
            <Add className={classes.extendedIcon} /> New Client
          </Fab>
        </Hidden>
        <Hidden mdUp>
          <Fab
            size="large"
            color="primary"
            className={classes.floatingButton}
            onClick={this.openNewClientDialogHandler}
            disableRipple={false}
            disableFocusRipple={false}
          >
            <Add />
          </Fab>
        </Hidden>
        <Mutation
          mutation={ADD_CLIENT}
          update={(cache, { data: { addClient } }) => {
            const { getClients } = cache.readQuery({
              query: CLIENTS,
              variables: {
                p_id: parseInt(localStorage.getItem(USER_ID))
              }
            });

            getClients.push(addClient);

            cache.writeQuery({
              query: CLIENTS,
              variables: {
                p_id: parseInt(localStorage.getItem(USER_ID))
              },
              data: {
                getClients
              }
            });
          }}
          onCompleted={data => {
            const { fname, lname } = data.addClient;

            this.props.enqueueSnackbar(
              fname + ' ' + lname + ' successfully added!'
            );
          }}
        >
          {(addClient, { loading }) => {
            if (loading) {
              return <SimpleSnackbar isOpened={loading} />;
            }

            return (
              <Dialog
                open={isDialogOpened}
                onClose={this.closeNewClientDialogHandler}
                fullWidth={true}
                fullScreen={fullScreen}
                maxWidth="sm"
              >
                <DialogTitle onClose={this.closeNewClientDialogHandler}>
                  New Client
                </DialogTitle>
                <DialogContent>
                  <ValidatorForm ref="form">
                    <Grid container spacing={16}>
                      <Grid item xs={12}>
                        <Grid container spacing={8}>
                          <Grid item xs={12} sm={6}>
                            <TextValidator
                              label="First name"
                              value={fname}
                              validators={[
                                'required',
                                'minStringLength: ' + 2,
                                'maxStringLength:' + 12,
                                'matchRegexp: ^[a-zA-Z]+$'
                              ]}
                              errorMessages={[
                                'This field is required',
                                'Too short',
                                'Not above 12 characters',
                                'Please do not include numbers'
                              ]}
                              className={classes.dense}
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="fname"
                              onChange={this.inputChangeHandler}
                              // onChange={this.inputChangeHandler}
                              // value={fname}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <TextField
                              label="Last name"
                              className={classes.dense}
                              margin="dense"
                              variant="outlined"
                              fullWidth
                              name="lname"
                              onChange={this.inputChangeHandler}
                              value={lname}
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
                        <TextField
                          label="Birthdate"
                          type="date"
                          variant="outlined"
                          InputLabelProps={{
                            shrink: true
                          }}
                          fullWidth
                          name="birthdate"
                          onChange={this.inputChangeHandler}
                          value={birthdate}
                        />
                      </Grid>
                    </Grid>
                  </ValidatorForm>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.closeNewClientDialogHandler}>
                    Cancel
                  </Button>
                  <Button
                    onClick={() => {
                      addClient({
                        variables: {
                          p_id: p_id,
                          fname: fname,
                          lname: lname,
                          gender: gender,
                          birthdate: birthdate
                        }
                      });

                      this.closeNewClientDialogHandler();
                    }}
                    color="primary"
                    autoFocus
                  >
                    Add Client
                  </Button>
                </DialogActions>
              </Dialog>
            );
          }}
        </Mutation>
      </Auxilliary>
    );
  }
}

export default withMobileDialog({ breakpoint: 'xs' })(
  withStyles(styles)(withSnackbar(NewClientDialog))
);
