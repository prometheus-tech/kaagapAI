import React, { Component } from 'react';

import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AssesIllustration from '../../../assets/Asses_Illustration.svg';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

const styles = theme => ({
  assesContainer: {
    textAlign: 'center'
  },
  illustration: {
    height: '45vh',
    marginTop: theme.spacing.unit * 10
  },
  messageContainer: {
    textAlign: 'center'
  },
  assesTitle: {
    color: green[600],
    marginTop: theme.spacing.unit * 5
  },
  assesMessage: {
    fontWeight: '300',
    lineHeight: '150%'
  },
  doneButton: {
    color: 'white',
    backgroundColor: blue[700],
    padding: '10px 50px 10px 50px',
    borderRadius: '30px',
    marginTop: theme.spacing.unit * 5,
    '&:hover': {
      backgroundColor: blue[900]
    }
  }
});
class AssessAccount extends Component {
  render() {
    const { classes } = this.props;
    const ButtonLink = props => <Link to={'/signin'} {...props} />;

    return (
      <Grid container spacing={16} className={classes.assesContainer}>
        <Grid item xs={12} className={classes.messageContainer}>
          <img src={AssesIllustration} className={classes.illustration} />
          <Typography variant="h5" gutterBottom className={classes.assesTitle}>
            Your account registration is now being assessed
          </Typography>
          <Grid container spacing={16}>
            <Grid item xs={3} />
            <Grid item xs={6}>
              <Typography variant="body1" className={classes.assesMessage}>
                We are now assessing your account registration. We will be
                updating you of your account status through an email sent to
                your email address. Thank you for your consideration!
              </Typography>
            </Grid>
          </Grid>
          <Button
            variant="contained"
            component={ButtonLink}
            className={classes.doneButton}
          >
            Done
          </Button>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(AssessAccount);
