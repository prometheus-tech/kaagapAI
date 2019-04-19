import React, { Component } from 'react';

import { Link as RouterLink, withRouter } from 'react-router-dom';

import CLIENT from '../../graphql/queries/client';
import SESSION from '../../graphql/queries/session';
import { Query } from 'react-apollo';

import { withSnackbar } from 'notistack';

import { withStyles } from '@material-ui/core/styles';
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
import orange from '@material-ui/core/colors/orange';
import { loadCSS } from 'fg-loadcss/src/loadCSS';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/InfoOutlined';
import grey from '@material-ui/core/colors/grey';
import purple from '@material-ui/core/colors/purple';
import SearchField from '../../components/UI/SearchField/SearchField';
import Tooltip from '@material-ui/core/Tooltip';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SessionDocumentsPage from './SessionDocumentsPage/SessionDocumentsPage';

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
    tabValue: 0
  };

  componentDidMount() {
    loadCSS(
      'https://use.fontawesome.com/releases/v5.1.0/css/all.css',
      document.querySelector('#insertion-point-jss')
    );
  }

  changeTabValueHandler = (e, value) => {
    this.setState({ tabValue: value });
  };

  render() {
    const { classes } = this.props;

    const { session_id } = this.props.match.params;

    const { tabValue } = this.state;

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
                        <SessionDocumentsPage
                          session_id={session_id}
                          documents={session.documents}
                        />
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
