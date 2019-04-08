import React, { Component } from 'react';

import { Link as RouterLink, withRouter } from 'react-router-dom';

import CLIENT from '../../graphql/queries/client';
import SESSION from '../../graphql/queries/session';
import { Query } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
import LoadingFullScreen from '../../components/UI/LoadingFullScreen/LoadingFullScreen';
import CssBaseline from '@material-ui/core/CssBaseline';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Button from '@material-ui/core/Button';
import PeopleIcon from '@material-ui/icons/People';
import Typography from '@material-ui/core/Typography';
import PersonIcon from '@material-ui/icons/Person';

const drawerWidth = '25';
const styles = theme => ({
  root: {
    display: 'flex',
    width: '100vw'
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: 0
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: +drawerWidth + '%'
  },
  breadCrumbIcon: {
    marginRight: theme.spacing.unit
  },
  breadCrumb: {
    fontSize: theme.spacing.unit * 2.5,
    marginBottom: theme.spacing.unit * 2
  },
  breadCrumbLink: {
    fontSize: theme.spacing.unit * 2,
    display: 'flex',
    alignItems: 'center',
    fontWeight: '400',
    textTransform: 'capitalize'
  }
});

class SessionPage extends Component {
  render() {
    const { classes } = this.props;

    const { session_id } = this.props.match.params;

    return (
      <Query query={SESSION} variables={{ session_id: session_id }}>
        {({
          loading: sessionLoading,
          error: sessionError,
          data: { session }
        }) => {
          if (sessionLoading) {
            return <LoadingFullScreen />;
          }

          if (sessionError) {
            return <p>Error</p>;
          }

          return (
            <Query query={CLIENT} variables={{ c_id: session.c_id }}>
              {({
                loading: clientLoading,
                error: clientError,
                data: { client }
              }) => {
                if (clientLoading) {
                  return <LoadingFullScreen />;
                }

                if (clientError) {
                  return <p>Error</p>;
                }

                return (
                  <div className={classes.root}>
                    <CssBaseline />
                    <main
                      className={classNames(classes.content, {
                        [classes.contentShift]: false
                      })}
                    >
                      <Grid justify="space-between" container spacing={16}>
                        <Grid item>
                          <Breadcrumbs
                            separator={<NavigateNextIcon />}
                            className={classes.breadCrumb}
                          >
                            <Button
                              component={RouterLink}
                              color="inherit"
                              to="/"
                              className={classes.breadCrumbLink}
                            >
                              <PeopleIcon className={classes.breadCrumbIcon} />
                              Clients
                            </Button>
                            <Button
                              component={RouterLink}
                              color="inherit"
                              to={'/client/' + client.c_id}
                              className={classes.breadCrumbLink}
                            >
                              <PersonIcon className={classes.breadCrumbIcon} />{' '}
                              {client.fname + ' ' + client.lname}
                            </Button>
                            <Typography
                              color="secondary"
                              className={classes.breadCrumbLink}
                              gutterBottom={false}
                            >
                              <PersonIcon className={classes.breadCrumbIcon} />
                              {session.session_name}
                            </Typography>
                          </Breadcrumbs>
                        </Grid>
                        <Grid item>
                          {/* <SearcField label="" className={classes.searchField} /> */}
                        </Grid>
                      </Grid>
                    </main>
                  </div>
                );
              }}
            </Query>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(withStyles(styles)(SessionPage));
