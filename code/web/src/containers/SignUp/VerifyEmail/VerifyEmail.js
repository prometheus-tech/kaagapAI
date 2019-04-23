import React, { Component } from 'react';

import { Mutation } from 'react-apollo';
import VERIFY_REGISTRATION from '../../../graphql/mutations/verifyRegistration';

import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import VerifyIllustration from '../../../assets/Verification_Illustration.svg';
import blue from '@material-ui/core/colors/blue';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  verifyEmailContainer: {
    textAlign: 'center'
  },
  illustration: {
    height: '40vh',
    marginTop: theme.spacing.unit * 5
  },
  inputVerification: {
    textAlign: 'center'
  },
  emailTitle: {
    color: blue[600]
  },
  emailEmphasis: {
    fontStyle: 'italic',
    color: blue[400]
  },
  messageVerify: {
    color: grey[600]
  },
  buttonContainer: {
    textAlign: 'center'
  },
  nextButton: {
    textAlign: 'center',
    borderRadius: '30px',
    padding: '10px 50px 10px 50px',
    color: 'white',
    backgroundColor: blue[600],
    marginTop: theme.spacing.unit * 2,
    '&:hover': {
      backgroundColor: blue[700]
    }
  }
});

class VerifyEmail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: props.email,
      input_code: ''
    };
  }

  inputCodeChangeHandler = e => {
    this.setState({ input_code: e.target.value });
  };

  resetFormHandler = () => {
    this.setState({
      input_code: ''
    });
  };

  render() {
    const { email, input_code } = this.state;

    const { steppedNext, classes } = this.props;

    return (
      <Mutation
        mutation={VERIFY_REGISTRATION}
        onCompleted={data => {
          steppedNext();
        }}
        onError={error => {
          this.resetFormHandler();
        }}
      >
        {(verifyEmail, { loading, error }) => {
          return (
            <ValidatorForm
              onSubmit={() => {
                verifyEmail({
                  variables: {
                    email,
                    input_code
                  }
                });
              }}
              instantValidate={false}
            >
              <Grid
                container
                spacing={16}
                className={classes.verifyEmailContainer}
              >
                <Grid item xs={12}>
                  <img
                    src={VerifyIllustration}
                    alt=""
                    className={classes.illustration}
                  />
                  <Typography
                    variant="h5"
                    gutterBottom
                    className={classes.emailTitle}
                  >
                    Email Verification
                  </Typography>
                  <Typography variant="body1" className={classes.messageVerify}>
                    A verification code was sent to your email{' '}
                    <span className={classes.emailEmphasis}>{email}</span>.
                  </Typography>
                  <Typography variant="body2" className={classes.messageVerify}>
                    Enter the code below in order to verify your email.
                  </Typography>
                </Grid>
                {error ? (
                  <Grid item xs={12}>
                    {error.graphQLErrors.map(({ message }) => {
                      return <Typography key={message}>{message}</Typography>;
                    })}
                  </Grid>
                ) : null}
                <Grid item xs={12} className={classes.inputVerification}>
                  <Grid container spacing={16}>
                    <Grid item xs={4} />
                    <Grid item xs={4}>
                      <TextValidator
                        label="Verification code"
                        margin="dense"
                        fullWidth
                        name="fname"
                        value={input_code}
                        validators={['required']}
                        errorMessages={['This field is required']}
                        onChange={this.inputCodeChangeHandler}
                        disabled={loading}
                      />
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Grid container className={classes.buttonContainer}>
                    <Grid item xs={3} />
                    <Grid item xs={6}>
                      <Button
                        type="submit"
                        variant="contained"
                        disabled={loading}
                        className={classes.nextButton}
                      >
                        Next
                      </Button>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </ValidatorForm>
          );
        }}
      </Mutation>
    );
  }
}

export default withStyles(styles)(VerifyEmail);
