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
import Divider from '@material-ui/core/Divider';
import SessionDocumentCards from '../../components/Session/SessionDocumentCards/SessionDocumentCards';
import orange from '@material-ui/core/colors/orange';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import ViewControl from '../../components/UI/ViewControl/ViewControl';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import NewSessionDocumentDialog from '../../components/Session/NewSessionDocumentDialog/NewSessionDocumentDialog';

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
    textTransform: 'capitalize',
    padding: '5px 15px 5px 15px',
    borderRadius: '50px'
  },
  breadCrumbLinkSession: {
    fontSize: theme.spacing.unit * 2,
    display: 'flex',
    alignItems: 'center',
    fontWeight: '400',
    textTransform: 'capitalize',
    padding: '5px 15px 5px 15px',
    borderRadius: '50px',
    color: orange[800]
  },
  divider: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4
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
    padding: '5px 25px 5px 25px'
  },
  floatingButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    // backgroundColor: lightBlue[600],
    boxShadow: theme.shadows[24],
    color: '#ffffff',
    '&:hover': {
      // backgroundColor: lightBlue[700],
      boxShadow: theme.shadows[10]
    }
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class SessionPage extends Component {
  state = {
    view: 'card',
    isNewSessionDocumentDialogOpened: false,
    files: []
  };

  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss')
    );
  }

  changeViewHandler = newView => {
    this.setState({ view: newView });
  };

  openNewSessionDocumentDialogHandler = () => {
    this.setState({ isNewSessionDocumentDialogOpened: true });
  };

  closeNewSessionDocumentDialogHandler = () => {
    this.setState({ isNewSessionDocumentDialogOpened: false, files: [] });
  };

  addFiles = files => {
    this.setState({
      files: [...this.state.files, ...files]
    });

    // this.setState({ files });
  };

  removeFile = fileIndex => {
    const files = [...this.state.files];
    files.splice(fileIndex, 1);

    this.setState({
      files
    });
  };

  render() {
    const { classes } = this.props;

    const { session_id } = this.props.match.params;

    const { view, isNewSessionDocumentDialogOpened, files } = this.state;

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
                              className={classes.breadCrumbLinkSession}
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
                      <Divider light className={classes.divider} />
                      <Grid
                        justify="space-between"
                        alignItems="center"
                        container
                        spacing={16}
                      >
                        <Grid item>
                          <Hidden smDown>
                            <Fab
                              color="primary"
                              variant="extended"
                              className={classes.extendedButton}
                              onClick={this.openNewSessionDocumentDialogHandler}
                            >
                              <Add className={classes.extendedIcon} /> New
                              Document
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
                        </Grid>
                        <Grid item>
                          <div className={classes.actionButton}>
                            <ViewControl
                              view={view}
                              viewChanged={this.changeViewHandler}
                            />
                            <IconButton
                              component="span"
                              className={classes.iconInfo}
                            >
                              <InfoIcon fontSize="small" />
                            </IconButton>
                          </div>
                        </Grid>
                      </Grid>
                      <SessionDocumentCards
                        sessionDocuments={session.documents}
                      />
                      <NewSessionDocumentDialog
                        opened={isNewSessionDocumentDialogOpened}
                        closed={this.closeNewSessionDocumentDialogHandler}
                        files={files}
                        filesAdded={this.addFiles}
                        fileRemoved={this.removeFile}
                        sessionId={session_id}
                      />
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
