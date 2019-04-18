import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

class AssessAccount extends Component {
  render() {
    const ButtonLink = props => <Link to={'/signin'} {...props} />;

    return (
      <Grid container spacing={16}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Your account registration is now being assessed
          </Typography>
          <Typography variant="body1">
            We are now assessing your account registration. We will be updating
            you of your account status through an email sent to your email
            address. Thank you for your consideration!
          </Typography>
          <Button variant="contained" component={ButtonLink}>
            Done
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default AssessAccount;
