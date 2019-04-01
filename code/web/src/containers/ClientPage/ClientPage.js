import React, { Component } from 'react';

import { Link as RouterLink, withRouter } from 'react-router-dom';

import CLIENT from '../../graphql/queries/client';
import { Query } from 'react-apollo';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Divider from '@material-ui/core/Divider';
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
import DeleteSessionDialog from '../../components/Client/DeleteSessionDialog/DeleteSessionDialog';
import CssBaseline from '@material-ui/core/CssBaseline';

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
  secondaryHeader: {
    marginBottom: theme.spacing.unit * 2
  },
  breadCrumbIcon: {
    marginRight: theme.spacing.unit
  },
  breadCrumb: {
    fontSize: theme.spacing.unit * 2.5,
    marginBottom: theme.spacing.unit * 2,
    iconInfo: {
      marginLeft: 'auto'
    }
  },
  breadCrumbLink: {
    fontSize: theme.spacing.unit * 2,
    display: 'flex',
    alignItems: 'center',
    fontWeight: '400'
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
    }
  },
  extendedButton: {
    background: '-webkit-linear-gradient(to right, #8f94fb, #4e54c8)',
    color: '#ffffff',
    textTransform: 'capitalize',
    borderRadius: '5px',
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
  }
});

class ClientPage extends Component {
  state = {
    isClientDetailsOpened: false,
    isNewSessionDialogOpened: false,
    isEditSessionDialogOpened: false,
    isDeleteSessionDialogOpened: false,
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

  openDeleteSessionDialogHandler = session => {
    this.setState({
      isDeleteSessionDialogOpened: true,
      selectedSession: {
        session_id: session.session_id,
        session_name: session.session_name,
        date_of_session: session.date_of_session
      }
    });
  };

  closeDeleteSessionDialogHandler = () => {
    this.setState({
      isDeleteSessionDialogOpened: false
    });
  };

  render() {
    const { classes } = this.props;

    const { c_id } = this.props.match.params;

    const {
      isClientDetailsOpened,
      isNewSessionDialogOpened,
      isEditSessionDialogOpened,
      isDeleteSessionDialogOpened,
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
              <CssBaseline />
              <main
                className={classNames(classes.content, {
                  [classes.contentShift]: isClientDetailsOpened
                })}
              >
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
                      className={classes.iconInfo}
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
                <Divider light />
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
                          sessionDeleted={this.openDeleteSessionDialogHandler}
                          session={session}
                        />
                      </Grid>
                    );
                  })}
                </Grid>
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
                <DeleteSessionDialog
                  isOpened={isDeleteSessionDialogOpened}
                  closed={this.closeDeleteSessionDialogHandler}
                  clientId={parseInt(c_id)}
                  session={selectedSession}
                />
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
