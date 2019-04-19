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
import FolderIcon from '@material-ui/icons/Folder';
import Divider from '@material-ui/core/Divider';
import SessionDocumentCards from '../../components/Session/SessionDocumentCards/SessionDocumentCards';
import orange from '@material-ui/core/colors/orange';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import Icon from '@material-ui/core/Icon';
import NewSessionDocumentDialog from '../../components/Session/NewSessionDocumentDialog/NewSessionDocumentDialog';
import grey from '@material-ui/core/colors/grey';
import purple from '@material-ui/core/colors/purple';
import ContentSessionDocumentDialog from '../../components/Session/ContentSessionDocumentDialog/ContentSessionDocumentDialog';
import SessionDocumentMoreActionsPopper from '../../components/Session/SessionDocumentMoreActionsPopper/SessionDocumentMoreActionsPopper';
import RenameSessionDocumentDialog from '../../components/Session/RenameSessionDocumentDialog/RenameSessionDocumentDialog';
import { cloneDeep } from 'apollo-utilities';
import SearchField from '../../components/UI/SearchField/SearchField';
import Tooltip from '@material-ui/core/Tooltip';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

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
  breadCrumbLink: {
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
  breadCrumbLinkSession: {
    fontSize: theme.spacing.unit * 2,
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
    borderRadius: '50px',
    padding: '5px 15px 5px 15px',
    color: orange[800]
  },
  divider: {
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2
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
    padding: '5px 25px 5px 25px',
    marginBottom: theme.spacing.unit * 2
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
  },
  actionButton: {
    display: 'flex',
    alignItems: 'center'
  },
  iconInfo: {
    marginLeft: theme.spacing.unit,
    borderRadius: '100%',
    '&:hover, &:focus': {
      color: orange[800],
      backgroundColor: grey[300]
    }
  },
  tabsRoot: {
    marginBottom: theme.spacing.unit * 4
  },
  tabsIndicator: {
    backgroundColor: purple[500]
  },
  tabRoot: {
    textTransform: 'initial',
    minWidth: 120,
    fontWeight: 400,
    fontSize: 16,
    marginRight: theme.spacing.unit * 2,
    '&:hover': {
      color: purple[500],
      opacity: 1
    },
    '&$tabSelected': {
      color: purple[500],
      fontWeight: 500
    },
    '&:focus': {
      color: purple[500]
    }
  },
  tabSelected: {}
});

class SessionPage extends Component {
  state = {
    isNewSessionDocumentDialogOpened: false,
    file: null,
    selectedSessionDocument: null,
    isMoreActionsOpened: false,
    anchorEl: null,
    isContentSessionDocumentDialogOpened: false,
    isEditContentSessionDocument: false,
    isRenameSessionDocumentDialogOpened: false,
    tabValue: 0
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

  changeTabValueHandler = (e, value) => {
    this.setState({ tabValue: value });
  };

  render() {
    const { classes } = this.props;

    const { session_id } = this.props.match.params;

    const {
      isNewSessionDocumentDialogOpened,
      file,
      isContentSessionDocumentDialogOpened,
      isEditContentSessionDocument,
      isMoreActionsOpened,
      anchorEl,
      selectedSessionDocument,
      isRenameSessionDocumentDialogOpened,
      tabValue
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
                            >
                              <FolderIcon className={classes.breadCrumbIcon} />
                              {session.session_name}
                            </Typography>
                          </Breadcrumbs>
                        </Grid>
                        <Grid item xs={6}>
                          <div className={classes.actionButton}>
                            <SearchField placeholder="Search document..." />
                            <Tooltip title="View session information">
                              <IconButton
                                component="span"
                                className={classes.iconInfo}
                              >
                                <InfoIcon fontSize="small" />
                              </IconButton>
                            </Tooltip>
                          </div>
                        </Grid>
                      </Grid>
                      <Divider light className={classes.divider} />
                      <Tabs
                        value={tabValue}
                        onChange={this.changeTabValueHandler}
                        classes={{
                          root: classes.tabsRoot,
                          indicator: classes.tabsIndicator
                        }}
                      >
                        <Tab
                          label="Documents"
                          classes={{
                            root: classes.tabRoot,
                            selected: classes.tabSelected
                          }}
                          disableRipple
                        />
                        <Tab
                          label="Results"
                          classes={{
                            root: classes.tabRoot,
                            selected: classes.tabSelected
                          }}
                          disableRipple
                        />
                      </Tabs>
                      {tabValue === 0 && (
                        <Auxilliary>
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
                                      deleteSessionDocument: {
                                        sd_id,
                                        file_name
                                      }
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
                                    moreActionsClosed={
                                      this.closeMoreActionsHandler
                                    }
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
                        </Auxilliary>
                      )}
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
