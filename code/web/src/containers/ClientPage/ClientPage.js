import React, { Component } from 'react';

import { Link as RouterLink, withRouter } from 'react-router-dom';

import CLIENT from '../../graphql/queries/client';
import { Query } from 'react-apollo';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import ButtonBase from '@material-ui/core/ButtonBase';
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
import SessionList from '../../components/Client/SessionList/SessionList';
import NewSessionDialog from '../../components/Client/NewSessionDialog/NewSessionDialog';
import EditSessionDialog from '../../components/Client/EditSessionDialog/EditSessionDialog';
import CssBaseline from '@material-ui/core/CssBaseline';
import ViewControl from '../../components/UI/ViewControl/ViewControl';
import SessionCards from '../../components/Client/SessionCards/SessionCards';
import grey from '@material-ui/core/colors/grey';
import orange from '@material-ui/core/colors/orange';
import EmptySession from '../../components/UI/Placeholder/EmptySession';
import Tooltip from '@material-ui/core/Tooltip';
import SearchField from '../../components/UI/SearchField/SearchField';

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
  breadCrumbLinkClient: {
    fontSize: theme.spacing.unit * 2,
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
    borderRadius: '50px',
    padding: '5px 15px 5px 15px',
    color: '#0091ea'
  },
  breadCrumbLinkClients: {
    fontSize: theme.spacing.unit * 2,
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
    padding: '5px 15px 5px 15px',
    borderRadius: '50px',
    '&:hover': {
      backgroundColor: grey[300]
    }
  },
  floatingButton: {
    zIndex: 1,
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
    background: orange[800],
    color: '#ffffff',
    textTransform: 'capitalize',
    borderRadius: '50px',
    fontSize: 16,
    '&:hover': {
      backgroundColor: orange[900],
      boxShadow: theme.shadows[10]
    },
    padding: '5px 25px 5px 25px',
    marginBottom: theme.spacing.unit * 2
  },
  iconInfo: {
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit,
    borderRadius: '100%',
    '&:hover, &:focus': {
      color: '#0091ea',
      backgroundColor: grey[300]
    }
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  divider: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center'
  }
});

class ClientPage extends Component {
  state = {
    view: 'card',
    isClientDetailsOpened: false,
    isNewSessionDialogOpened: false,
    isEditSessionDialogOpened: false,
    selectedSession: {
      session_id: '',
      session_name: '',
      date_of_session: ''
    }
  };

  changeViewHandler = newView => {
    this.setState({ view: newView });
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
      view,
      isClientDetailsOpened,
      isNewSessionDialogOpened,
      isEditSessionDialogOpened,
      selectedSession
    } = this.state;

    return (
      <Query query={CLIENT} variables={{ c_id: c_id }}>
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
                <Grid
                  container
                  spacing={16}
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item xs={6}>
                    <Breadcrumbs separator={<NavigateNextIcon />}>
                      <ButtonBase
                        component={RouterLink}
                        color="inherit"
                        to="/"
                        className={classes.breadCrumbLinkClients}
                      >
                        <PeopleIcon className={classes.breadCrumbIcon} />
                        Clients
                      </ButtonBase>
                      <Typography className={classes.breadCrumbLinkClient}>
                        <PersonIcon className={classes.breadCrumbIcon} />
                        {data.client.fname + ' ' + data.client.lname}
                      </Typography>
                    </Breadcrumbs>
                  </Grid>
                  <Grid item xs={6}>
                    <div className={classes.actionButton}>
                      <SearchField placeholder="Search session..." />
                      <ViewControl
                        view={view}
                        viewChanged={this.changeViewHandler}
                        className={classes.actionIconView}
                      />
                      <Tooltip title="View client information">
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
                      </Tooltip>
                    </div>
                  </Grid>
                </Grid>
                <Divider light className={classes.divider} />
                {data.client.sessions.length > 0 ? (
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
                ) : null}
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
                {data.client.sessions.length === 0 ? (
                  <EmptySession
                    newSessionOpened={this.openNewSessionDialogHandler}
                  />
                ) : view === 'card' && data.client.sessions.length > 0 ? (
                  <SessionCards
                    sessions={data.client.sessions}
                    sessionEdited={this.openEditSessionDialogHandler}
                  />
                ) : (
                  <SessionList
                    sessions={data.client.sessions}
                    sessionEdited={this.openEditSessionDialogHandler}
                  />
                )}

                <NewSessionDialog
                  clientId={c_id}
                  opened={isNewSessionDialogOpened}
                  closed={this.closeNewSessionDialogHandler}
                />
                <EditSessionDialog
                  isOpened={isEditSessionDialogOpened}
                  closed={this.closeEditSessionDialogHandler}
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
