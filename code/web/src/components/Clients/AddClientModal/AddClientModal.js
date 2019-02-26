import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import lightBlue from '@material-ui/core/colors/lightBlue';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Close from '@material-ui/icons/Close';
import Modal from '@material-ui/core/Modal';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const styles = theme => ({
  margin: {
    margin: theme.spacing.unit,
    backgroundColor: lightBlue[600],
    color: '#ffffff',
    textTransform: 'capitalize',
    letterSpacing: 1,
    fontSize: 15
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
    color: '#ffffff'
  },
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none'
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
  formControl: {
    margin: theme.spacing.unit * 3
  },
  group: {
    margin: `${theme.spacing.unit}px 0`
  },
  button: {
    margin: theme.spacing.unit,
    position: 'relative',
    marginTop: '3rem'
  }
});
class AddClientModal extends Component {
  state = {
    open: false,
    value: ''
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleGenderChange = event => {
    this.setState({ value: event.target.value });
  };
  render() {
    const { classes } = this.props;

    return (
      <Auxilliary>
        <Fab
          variant="extended"
          aria-label="Add"
          className={classes.margin}
          onClick={this.handleOpen}
        >
          <AddIcon className={classes.extendedIcon} />
          Add Client
        </Fab>
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.open}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Close onClick={this.handleClose} className={classes.close} />
            <Typography variant="h6" id="modal-title">
              Add Client
            </Typography>
            <Grid container direction="row">
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-dense"
                  label="Firstname"
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-dense"
                  label="Lastname"
                  className={classNames(classes.textField, classes.dense)}
                  margin="dense"
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    aria-label="Gender"
                    name="GenderChoice"
                    className={classes.group}
                    value={this.state.value}
                    onChange={this.handleGenderChange}
                  >
                    <FormControlLabel
                      value="Female"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="Male"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="date"
                  label="Birthday"
                  type="date"
                  variant="outlined"
                  className={classes.textField}
                  InputLabelProps={{
                    shrink: true
                  }}
                />
              </Grid>
              <Grid container item xs={12} justify="flex-end">
                <Button
                  variant="contained"
                  className={classes.button}
                  onClick={this.handleClose}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Add Client
                </Button>
              </Grid>
            </Grid>
          </div>
        </Modal>
      </Auxilliary>
    );
  }
}

export default withStyles(styles)(AddClientModal);
