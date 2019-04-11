import React, { Component } from 'react';

import ADD_CLIENT from '../../../graphql/mutations/addClient';
import { Mutation } from 'react-apollo';
import CLIENTS from '../../../graphql/queries/clients';

import { withSnackbar } from 'notistack';

import { withStyles } from '@material-ui/core/styles';
import SimpleSnackbar from '../../UI/SimpleSnackbar/SimpleSnackbar';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
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
import { cloneDeep } from 'apollo-utilities';

const styles = theme => ({
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
      p_id: props.practitionerId,
      fname: '',
      lname: '',
      gender: 'M',
      birthdate: ''
    };

    // Needed for validation
    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  clearFieldsHandler = () => {
    this.setState({
      fname: '',
      lname: '',
      gender: 'M',
      birthdate: ''
    });
  };

  /**
   * Custom validators
   */
  componentWillMount() {
    const date = '^([12]\\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\\d|3[01]))$';
    ValidatorForm.addValidationRule('isDate', value => {
      return value.match(date);
    });
  }

  render() {
    const { classes, fullScreen, opened, closed, practitionerId } = this.props;
    const { p_id, fname, lname, gender, birthdate } = this.state;

    return (
      <Auxilliary>
        <Mutation
          mutation={ADD_CLIENT}
          update={(cache, { data: { addClient } }) => {
            const { clients } = cloneDeep(
              cache.readQuery({
                query: CLIENTS,
                variables: {
                  p_id: practitionerId
                }
              })
            );
            clients.push(addClient);

            cache.writeQuery({
              query: CLIENTS,
              variables: {
                p_id: practitionerId
              },
              data: {
                clients
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
              return (
                <SimpleSnackbar message="Adding client..." isOpened={loading} />
              );
            }

            return (
              <Dialog
                open={opened}
                onClose={() => {
                  this.clearFieldsHandler();
                  closed();
                }}
                fullWidth={true}
                fullScreen={fullScreen}
                maxWidth="sm"
              >
                <ValidatorForm
                  onSubmit={() => {
                    addClient({
                      variables: {
                        p_id: p_id,
                        fname: fname.trim(),
                        lname: lname.trim(),
                        gender: gender,
                        birthdate: birthdate
                      }
                    });

                    this.clearFieldsHandler();
                    closed();
                  }}
                >
                  <DialogTitle>New Client</DialogTitle>
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
                                'trim',
                                'maxStringLength:' + 100
                              ]}
                              errorMessages={[
                                'This field is required',
                                'This field must have at least one non-whitespace character',
                                'First name must be less than 100 characters'
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
                                'trim',
                                'maxStringLength:' + 100
                              ]}
                              errorMessages={[
                                'This field is required',
                                'This field must contain at least one non-whitespace character',
                                'Last name must be less than 100 characters'
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
                            value={gender}
                            onChange={this.inputChangeHandler}
                            validators={'required'}
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
                    <Button
                      onClick={() => {
                        this.clearFieldsHandler();
                        closed();
                      }}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" color="primary" autoFocus>
                      Add Client
                    </Button>
                  </DialogActions>
                </ValidatorForm>
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
