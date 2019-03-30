import React, { Component } from 'react';

import { Link as RouterLink, withRouter } from 'react-router-dom';

import CLIENT from '../../graphql/queries/client';
import { Query } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import classNames from 'classnames';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import LoadingFullScreen from '../../components/UI/LoadingFullScreen/LoadingFullScreen';
import ClientInformation from '../../components/Client/ClientInformation/ClientInformation';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import PeopleIcon from '@material-ui/icons/People';
import PersonIcon from '@material-ui/icons/Person';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import { lightBlue } from '@material-ui/core/colors';
import SessionCard from '../../components/Client/SessionCard/SessionCard';
import NewSessionDialog from '../../components/Client/NewSessionDialog/NewSessionDialog';
import EditSessionDialog from '../../components/Client/EditSessionDialog/EditSessionDialog';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  Stepper: {
    boxShadow: '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)',
    backgroundColor: '#ffffff',
    marginTop: '60px',
    height: '50px',
    zIndex: 1
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
    marginRight: 350
  },
  secondaryHeader: {
    marginBottom: theme.spacing.unit * 2
  },
  breadCrumbIcon: {
    marginRight: theme.spacing.unit
  },
  breadCrumb: {
    fontSize: theme.spacing.unit * 2.5,
    marginBottom: theme.spacing.unit * 2,
    marginLeft: '50px'
  },
  breadCrumbLink: {
    fontSize: theme.spacing.unit * 2,
    display: 'flex',
    alignItems: 'center',
    fontWeight: '300'
  },
  floatingButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    backgroundColor: lightBlue[600],
    boxShadow: theme.shadows[24],
    color: '#ffffff',
    '&:hover': {
      backgroundColor: lightBlue[700],
      boxShadow: theme.shadows[10]
    },
    zIndex: 2
  },
  extendedButton: {
    backgroundColor: lightBlue[600],
    color: '#ffffff',
    textTransform: 'capitalize',
    fontSize: 16,
    '&:hover': {
      backgroundColor: lightBlue[700],
      boxShadow: theme.shadows[10]
    },
    margin: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 6
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  infoAction: {
    marginLeft: 'auto'
  }
});

class ClientPage extends Component {
  state = {
    isClientDetailsOpened: false,
    isNewSessionDialogOpened: false,
    isEditSessionDialogOpened: false,
    selectedSession: {
      session_id: '',
      session_name: '',
      date_of_session: ''
    }
  };

  openClientDetailsHandler = () => {
    this.setState({
      isClientDetailsOpened: true
    });
  };

  closeClientDetailsHandler = () => {
    this.setState({
      isClientDetailsOpened: false
    });
  };

  openNewSessionDialogHandler = () => {
    this.setState({ isNewSessionDialogOpened: true });
  };

  closeNewSessionDialogHandler = () => {
    this.setState({ isNewSessionDialogOpened: false });
  };

  openEditSessionDialogHandler = session => {
    this.setState({
      isEditSessionDialogOpened: true,
      selectedSession: {
        session_id: session.session_id,
        session_name: session.session_name,
        date_of_session: session.date_of_session
      }
    });
  };

  closeEditSessionDialogHandler = () => {
    this.setState({
      isEditSessionDialogOpened: false
    });
  };

  render() {
    const { classes } = this.props;

    const { c_id } = this.props.match.params;

    const {
      isClientDetailsOpened,
      isNewSessionDialogOpened,
      isEditSessionDialogOpened,
      selectedSession
    } = this.state;

    return (
      <Query query={CLIENT} variables={{ c_id: parseInt(c_id) }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingFullScreen />;
          }

          if (error) {
            return <p>Error</p>;
          }

          return (
            <div className={classes.root}>
              <main
                className={classNames(classes.content, {
                  [classes.contentShift]: isClientDetailsOpened
                })}
              >
                <AppBar
                  position="fixed"
                  color="default"
                  className={classes.Stepper}
                >
                  <Toolbar>
                    <Breadcrumbs
                      separator={<NavigateNextIcon />}
                      className={classes.breadCrumb}
                    >
                      <Link
                        component={RouterLink}
                        color="inherit"
                        to="/"
                        className={classes.breadCrumbLink}
                      >
                        <PeopleIcon className={classes.breadCrumbIcon} />
                        Clients
                      </Link>
                      <Typography
                        color="textPrimary"
                        className={classes.breadCrumbLink}
                        gutterBottom={false}
                      >
                        <PersonIcon className={classes.breadCrumbIcon} />
                        {data.client.fname + ' ' + data.client.lname}
                        <IconButton
                          component="span"
                          onClick={
                            isClientDetailsOpened
                              ? this.closeClientDetailsHandler
                              : this.openClientDetailsHandler
                          }
                        >
                          <InfoIcon fontSize="small" />
                        </IconButton>
                      </Typography>
                    </Breadcrumbs>
                  </Toolbar>
                </AppBar>
                <Hidden smDown>
                  <Fab
                    color="primary"
                    variant="extended"
                    className={classes.extendedButton}
                    onClick={this.openNewSessionDialogHandler}
                  >
                    <Add className={classes.extendedIcon} /> New Session
                  </Fab>
                </Hidden>
                <Hidden mdUp>
                  <Fab
                    size="large"
                    color="primary"
                    className={classes.floatingButton}
                    onClick={this.openNewSessionDialogHandler}
                    disableRipple={false}
                    disableFocusRipple={false}
                  >
                    <Add />
                  </Fab>
                </Hidden>
                <NewSessionDialog
                  clientId={parseInt(c_id)}
                  opened={isNewSessionDialogOpened}
                  closed={this.closeNewSessionDialogHandler}
                />
                <EditSessionDialog
                  isOpened={isEditSessionDialogOpened}
                  closed={this.closeEditSessionDialogHandler}
                  session={selectedSession}
                />
                <Grid container spacing={16}>
                  {data.client.sessions.map(session => {
                    return (
                      <Grid
                        item
                        key={session.session_id}
                        xs={12}
                        sm={6}
                        md={4}
                        lg={3}
                      >
                        <SessionCard
                          sessionEdited={this.openEditSessionDialogHandler}
                          session={session}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
              </main>
              <ClientInformation
                isOpened={isClientDetailsOpened}
                opened={this.openClientDetailsHandler}
                closed={this.closeClientDetailsHandler}
                client={data.client}
              />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(withStyles(styles)(ClientPage));
