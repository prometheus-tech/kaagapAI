import React, { Component } from 'react';

import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';

import AccountRegistrationInfo from './AccountRegistrationInfo/AccountRegistrationInfo';
import VerifyEmail from './VerifyEmail/VerifyEmail';
import AssessAccount from './AssessAccount/AssessAccount';

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
