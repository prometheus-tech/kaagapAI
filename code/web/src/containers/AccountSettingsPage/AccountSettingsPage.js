import React, { Component } from 'react';

import { Query } from 'react-apollo';
import PROFILE from '../../graphql/queries/profile';

import { withStyles } from '@material-ui/core/styles';

import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import Main from '../../hoc/Main/Main';
import MyHeader from '../../components/Navigation/MyHeader/MyHeader';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import grey from '@material-ui/core/colors/grey';
import LoadingFullScreen from '../../components/UI/LoadingFullScreen/LoadingFullScreen';
import GeneralInfo from '../../components/Account/GeneralInfo/GeneralInfo';
import ChangePassword from '../../components/Account/ChangePassword/ChangePassword';

const styles = theme => ({
  accountTitle: {
    color: '#2d3436',
    letterSpacing: '2px',
    fontWeight: '400'
  },
  accountSubTitle: {
    color: grey[600],
    fontWeight: 300
  },
  divItem1: {
    height: '2px',
    width: '20px',
    backgroundColor: 'orange'
  },
  root: {
    width: '90vw',
    marginLeft: '5vw'
  },
  accountSettings: {
    marginLeft: theme.spacing.unit * 10,
    marginTop: theme.spacing.unit * 10
  },
  passwordContainer: {
    marginLeft: theme.spacing.unit * 10,
    marginTop: theme.spacing.unit * 10,
    marginBottom: theme.spacing.unit * 10
  }
});

class AccountSettingsPage extends Component {
  render() {
    const { classes } = this.props;

    return (
      <Query query={PROFILE} errorPolicy="all">
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingFullScreen />;
          }

          if (error) {
            return <div />;
          }

          return (
            <Auxilliary>
              <MyHeader />
              <Main>
                <div className={classes.root}>
                  <div className={classes.accountSettings}>
                    <div>
                      <div className={classes.divItem1} />
                      <Typography variant="h6" className={classes.accountTitle}>
                        General Information
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        className={classes.accountSubTitle}
                      >
                        Manage your profile information
                      </Typography>
                    </div>
                    <Grid container>
                      <Grid item xs={2} />
                      <Grid item xs={8}>
                        <GeneralInfo profile={data.profile} />
                      </Grid>
                    </Grid>
                  </div>

                  {/* password */}
                  <div className={classes.passwordContainer}>
                    <div>
                      <div className={classes.divItem1} />
                      <Typography variant="h6" className={classes.accountTitle}>
                        Change password
                      </Typography>
                      <Typography
                        variant="subtitle2"
                        className={classes.accountSubTitle}
                      >
                        Remember: your password should not be easy and common
                      </Typography>
                    </div>
                    <Grid container>
                      <Grid item xs={2} />
                      <Grid item xs={8}>
                        <ChangePassword />
                      </Grid>
                    </Grid>
                  </div>
                </div>
              </Main>
            </Auxilliary>
          );
        }}
      </Query>
    );
  }
}
export default withStyles(styles)(AccountSettingsPage);
