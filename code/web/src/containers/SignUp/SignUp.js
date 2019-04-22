import React, { Component } from 'react';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import blue from '@material-ui/core/colors/blue';
import kaagapaiLogo from '../../assets/kaagapai-logo.svg';
import SignUpIllustration from '../../assets/signUpIllustration.svg';

import AccountRegistrationInfo from './AccountRegistrationInfo/AccountRegistrationInfo';
import VerifyEmail from './VerifyEmail/VerifyEmail';
import AssessAccount from './AssessAccount/AssessAccount';

const styles = theme => ({
  stepper: {
    backgroundColor: 'transparent',
    marginTop: theme.spacing.unit
  },
  appBar: {
    boxShadow: 'none',
    backgroundColor: 'transparent'
  },
  logo: {
    margin: 20,
    width: 60,
    height: 60
  },
  signUpContainer: {
    height: '100vh',
    width: '100vw',
    overflowX: 'hidden',
    overflowY: 'hidden'
  },
  illustrationContainer: {
    display: 'inline-block',
    textAlign: 'center'
  },
  signUpIllustration: {
    height: '60vh',
    marginTop: theme.spacing.unit * 10
  },
  signUpField: {
    backgroundColor: 'rgb(252, 252, 252)'
  },
  signUp: {
    textAlign: 'center',
    fontSize: theme.spacing.unit * 6,
    color: blue[600]
  },
  stepGuide: {
    width: '70%',
    marginLeft: '15%',
    fontWeight: '300',
    lineHeight: '150%',
    
  }
});

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0,
      email: ''
    };
  }

  getSteps = () => {
    return ['Account Information', 'Email Verification', 'Account Validation'];
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return <AccountRegistrationInfo steppedNext={this.nextStepHandler} />;
      case 1:
        return (
          <VerifyEmail
            email={this.state.email}
            steppedNext={this.nextStepHandler}
          />
        );
      case 2:
        return <AssessAccount />;
      default:
        return <p>Unknown step</p>;
    }
  };

  nextStepHandler = email => {
    if (email) {
      this.setState({ email });
    }

    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };

  render() {
    const { activeStep } = this.state;
    const { classes } = this.props;

    const steps = this.getSteps();

    return (
      <Auxilliary>
        <Grid container className={classes.signUpContainer}>
          <Grid item xs={6} className={classes.illustrationContainer}>
            <AppBar
              className={classes.appBar}
              position="static"
              color="default"
            >
              <Toolbar>
                <img
                  src={kaagapaiLogo}
                  className={classes.logo}
                  alt="kaagapAI"
                />
              </Toolbar>
            </AppBar>
            <img
              src={SignUpIllustration}
              className={classes.signUpIllustration}
              alt="Sign Up"
            />
          </Grid>

          <Grid item xs={6} className={classes.signUpField}>
            <Typography className={classes.signUp}>Sign up.</Typography>
            <Typography className={classes.stepGuide}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab dolore
              quae amet vitae id alias molestias.
            </Typography>

            <Grid item xs={12}>
              {/* <Stepper className={classes.stepper} activeStep={activeStep}>
                {steps.map((label, index) => {
                  const props = {};
                  const labelProps = {};
                  return (
                    <Step key={label} {...props}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper> */}
            </Grid>
            {this.getStepContent(activeStep)}
          </Grid>
        </Grid>
      </Auxilliary>
    );
  }
}

export default withStyles(styles)(SignUp);
