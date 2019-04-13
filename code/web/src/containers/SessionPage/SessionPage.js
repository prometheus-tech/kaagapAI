import React, { Component } from 'react';

import { Link as RouterLink, withRouter } from 'react-router-dom';

import CLIENT from '../../graphql/queries/client';
import SESSION from '../../graphql/queries/session';
import DELETE_SESSION_DOCUMENT from '../../graphql/mutations/deleteSessionDocument';
import { Query, Mutation } from 'react-apollo';

import { withSnackbar } from 'notistack';

import { withStyles } from '@material-ui/core/styles';
import Auxilliary from '../../hoc/Auxilliary/Auxilliary';
import LoadingFullScreen from '../../components/UI/LoadingFullScreen/LoadingFullScreen';
import CssBaseline from '@material-ui/core/CssBaseline';
import classNames from 'classnames';
import Grid from '@material-ui/core/Grid';
import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ButtonBase from '@material-ui/core/ButtonBase';
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
import Icon from '@material-ui/core/Icon';
import NewSessionDocumentDialog from '../../components/Session/NewSessionDocumentDialog/NewSessionDocumentDialog';
import purple from '@material-ui/core/colors/purple';
import ContentSessionDocumentDialog from '../../components/Session/ContentSessionDocumentDialog/ContentSessionDocumentDialog';
import SessionDocumentMoreActionsPopper from '../../components/Session/SessionDocumentMoreActionsPopper/SessionDocumentMoreActionsPopper';
import RenameSessionDocumentDialog from '../../components/Session/RenameSessionDocumentDialog/RenameSessionDocumentDialog';
import { cloneDeep } from 'apollo-utilities';

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
    fontWeight: '600',
    padding: '5px 15px 5px 15px',
    borderRadius: '50px'
  },
  breadCrumbLinkSession: {
    fontSize: theme.spacing.unit * 2,
    display: 'flex',
    alignItems: 'center',
    fontWeight: '600',
    padding: '5px 15px 5px 15px',
    borderRadius: '50px',
    color: orange[800]
  },
  divider: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 4
  },
  extendedButton: {
    background: purple[500],
    color: '#ffffff',
    textTransform: 'capitalize',
    borderRadius: '50px',
    fontSize: 16,
    '&:hover': {
      backgroundColor: purple[700],
      boxShadow: theme.shadows[10]
    },
    padding: '5px 25px 5px 25px'
  },
  floatingButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    boxShadow: theme.shadows[24],
    color: '#ffffff',
    '&:hover': {
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
    file: null,
    selectedSessionDocument: null,
    isMoreActionsOpened: false,
    anchorEl: null,
    isContentSessionDocumentDialogOpened: false,
    isEditContentSessionDocument: false,
    isRenameSessionDocumentDialogOpened: false
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
    this.setState({
      isNewSessionDocumentDialogOpened: true
    });
  };

  closeNewSessionDocumentDialogHandler = () => {
    this.setState({ isNewSessionDocumentDialogOpened: false, file: null });
  };

  addFile = file => {
    this.setState({
      file
    });
  };

  clearFile = () => {
    this.setState({
      file: null
    });
  };

  openMoreActionsHandler = (event, sessionDocument) => {
    const { currentTarget } = event;
    this.setState({
      isMoreActionsOpened: true,
      anchorEl: currentTarget,
      selectedSessionDocument: sessionDocument
    });
  };

  closeMoreActionsHandler = () => {
    this.setState({ isMoreActionsOpened: false });
  };

  openContentSessionDocumentDialog = sessionDocument => {
    if (sessionDocument) {
      this.setState({
        isContentSessionDocumentDialogOpened: true,
        selectedSessionDocument: sessionDocument
      });
    } else {
      this.setState({
        isContentSessionDocumentDialogOpened: true
      });
    }
  };

  closeContentSessionDocumentDialog = () => {
    this.setState({
      isContentSessionDocumentDialogOpened: false,
      isEditContentSessionDocument: false,
      selectedSessionDocument: null
    });
  };

  editContentSessionDocumentHandler = () => {
    this.setState({
      isEditContentSessionDocument: true
    });
  };

  updateSelectedSessionDocumentHandler = sessionDocument => {
    this.setState({
      selectedSessionDocument: sessionDocument
    });
  };

  stopEditContentSessionDocumentHandler = () => {
    this.setState({ isEditContentSessionDocument: false });
  };

  openRenameSessionDocumentHandler = () => {
    this.setState({ isRenameSessionDocumentDialogOpened: true });
  };

  closeRenameSessionDocumentHandler = () => {
    this.setState({ isRenameSessionDocumentDialogOpened: false });
  };

  render() {
    const { classes } = this.props;

    const { session_id } = this.props.match.params;

    const {
      view,
      isNewSessionDocumentDialogOpened,
      file,
      isContentSessionDocumentDialogOpened,
      isEditContentSessionDocument,
      isMoreActionsOpened,
      anchorEl,
      selectedSessionDocument,
      isRenameSessionDocumentDialogOpened
    } = this.state;

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
                            <ButtonBase
                              component={RouterLink}
                              color="inherit"
                              to="/"
                              className={classes.breadCrumbLink}
                            >
                              <PeopleIcon className={classes.breadCrumbIcon} />
                              Clients
                            </ButtonBase>
                            <ButtonBase
                              component={RouterLink}
                              color="inherit"
                              to={'/client/' + client.c_id}
                              className={classes.breadCrumbLink}
                            >
                              <PersonIcon className={classes.breadCrumbIcon} />{' '}
                              {client.fname + ' ' + client.lname}
                            </ButtonBase>
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
                              <Icon className={classes.extendedIcon}>
                                cloud_upload
                              </Icon>
                              Upload File
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
                        sessionDocumentViewed={
                          this.openContentSessionDocumentDialog
                        }
                        moreActionsOpened={this.openMoreActionsHandler}
                      />
                      <NewSessionDocumentDialog
                        opened={isNewSessionDocumentDialogOpened}
                        closed={this.closeNewSessionDocumentDialogHandler}
                        file={file}
                        fileAdded={this.addFile}
                        fileRemoved={this.clearFile}
                        sessionId={session_id}
                      />
                      {selectedSessionDocument ? (
                        <Auxilliary>
                          <Mutation
                            mutation={DELETE_SESSION_DOCUMENT}
                            update={(
                              cache,
                              {
                                data: {
                                  deleteSessionDocument: { sd_id, file_name }
                                }
                              }
                            ) => {
                              const { session } = cloneDeep(
                                cache.readQuery({
                                  query: SESSION,
                                  variables: { session_id }
                                })
                              );

                              session.documents = session.documents.filter(
                                d => d.sd_id !== sd_id
                              );

                              cache.writeQuery({
                                query: SESSION,
                                variables: { session_id },
                                data: { session }
                              });

                              this.props.enqueueSnackbar(
                                file_name + ' archived!'
                              );
                            }}
                            optimisticResponse={{
                              __typename: 'Mutation',
                              deleteSessionDocument: {
                                __typename: 'SessionDocument',
                                sd_id: selectedSessionDocument.sd_id,
                                file_name: selectedSessionDocument.file_name
                              }
                            }}
                          >
                            {deleteSessionDocument => (
                              <SessionDocumentMoreActionsPopper
                                isMoreActionsOpened={isMoreActionsOpened}
                                anchorEl={anchorEl}
                                moreActionsClosed={this.closeMoreActionsHandler}
                                sessionDocumentViewed={
                                  this.openContentSessionDocumentDialog
                                }
                                contentEdited={
                                  this.editContentSessionDocumentHandler
                                }
                                sessionDocumentRenamed={
                                  this.openRenameSessionDocumentHandler
                                }
                                sessionDocumentDeleted={() => {
                                  deleteSessionDocument({
                                    variables: {
                                      sd_id: selectedSessionDocument.sd_id
                                    }
                                  });
                                }}
                              />
                            )}
                          </Mutation>
                          <ContentSessionDocumentDialog
                            opened={isContentSessionDocumentDialogOpened}
                            closed={this.closeContentSessionDocumentDialog}
                            editing={isEditContentSessionDocument}
                            sessionDocument={selectedSessionDocument}
                            contentEdited={
                              this.editContentSessionDocumentHandler
                            }
                            contentEditStopped={
                              this.stopEditContentSessionDocumentHandler
                            }
                            selectedSessionDocumentUpdated={
                              this.updateSelectedSessionDocumentHandler
                            }
                          />
                          <RenameSessionDocumentDialog
                            opened={isRenameSessionDocumentDialogOpened}
                            closed={this.closeRenameSessionDocumentHandler}
                            sessionDocument={selectedSessionDocument}
                            selectedSessionDocumentUpdated={
                              this.updateSelectedSessionDocumentHandler
                            }
                          />
                        </Auxilliary>
                      ) : null}
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

export default withRouter(withStyles(styles)(withSnackbar(SessionPage)));
