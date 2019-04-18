import React, { Component } from 'react';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import Typography from '@material-ui/core/Typography';

import AccountRegistrationInfo from './AccountRegistrationInfo/AccountRegistrationInfo';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeStep: 0
    };
  }

  getSteps = () => {
    return [
      'Account Information',
      'Email Verification',
      'Terms and Agreements'
    ];
  };

  getStepContent = step => {
    switch (step) {
      case 0:
        return <AccountRegistrationInfo steppedNext={this.nextStepHandler} />;
      case 1:
        return 'What is an ad group anyways?';
      case 2:
        return <Typography variant="h1">Terms and Agreements</Typography>;
      default:
        return 'Unknown step';
    }
  };

  nextStepHandler = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1
    });
  };

  render() {
    const { activeStep } = this.state;

    const steps = this.getSteps();

    return (
      <Auxilliary>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const props = {};
            const labelProps = {};
            return (
              <Step key={label} {...props}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
        {this.getStepContent(activeStep)}
      </Auxilliary>
    );
  }
}

export default SignUp;
