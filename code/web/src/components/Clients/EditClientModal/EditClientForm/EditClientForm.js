import React, { Component } from 'react';

import EDIT_CLIENT from '../../../../graphql/mutations/editClient';
import { Mutation } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Close from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.down('xs')]: {
      width: '80%'
    }
  },
  close: {
    float: 'right',
    cursor: 'pointer',
    top: -2
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit
  },
  dense: {
    marginTop: 16
  },
  group: {
    margin: '0 16px'
  },
  inputGroup: {
    marginBottom: 16
  }
});

class EditClientForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      c_id: parseInt(props.client.c_id),
      fname: props.client.fname,
      lname: props.client.lname,
      gender: props.client.gender,
      birthdate: props.client.birthdate
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      c_id: parseInt(nextProps.client.fname),
      fname: nextProps.client.fname,
      lname: nextProps.client.lname,
      gender: nextProps.client.gender,
      birthdate: nextProps.client.birthdate
    });
  }

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { classes, closed } = this.props;

    return (
      <Mutation mutation={EDIT_CLIENT} onCompleted={() => closed()}>
        {(editClient, { loading, error }) => (
          <form
            onSubmit={e => {
              e.preventDefault();
              editClient({ variables: { ...this.state } });
            }}
          >
            <Paper className={classes.paper}>
              <Close className={classes.close} onClick={closed} />
              <Typography component="h6" variant="h6" gutterBottom>
                Edit Client
              </Typography>
              <Grid container spacing={16}>
                <Grid item xs={12} className={classes.inputGroup}>
                  <Grid container spacing={8}>
                    <Grid item xs={6}>
                      <TextField
                        label="First name"
                        className={classNames(classes.textField, classes.dense)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        name="fname"
                        onChange={this.inputChangeHandler}
                        value={this.state.fname}
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TextField
                        label="Last name"
                        className={classNames(classes.textField, classes.dense)}
                        margin="dense"
                        variant="outlined"
                        fullWidth
                        name="lname"
                        onChange={this.inputChangeHandler}
                        value={this.state.lname}
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
                      value={this.state.gender}
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
                <Grid item xs={12} className={classes.inputGroup}>
                  <TextField
                    label="Birthdate"
                    type="date"
                    variant="outlined"
                    className={classes.textField}
                    InputLabelProps={{
                      shrink: true
                    }}
                    fullWidth
                    name="birthdate"
                    onChange={this.inputChangeHandler}
                    value={this.state.birthdate}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Grid container justify="flex-end" alignItems="center">
                    <Grid item />
                    <Grid item xs={3} align="right">
                      <Button onClick={closed}>Cancel</Button>
                    </Grid>
                    <Grid item xs={5} align="right">
                      <Button color="primary" type="submit" disabled={loading}>
                        {loading ? 'Saving...' : 'Save Changes'}
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </Paper>
          </form>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(EditClientForm);
