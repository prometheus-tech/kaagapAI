import React, { Component } from 'react';

import { Link as RouterLink, withRouter } from 'react-router-dom';

import CLIENT from '../../graphql/queries/client';
import { Query } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
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

const styles = theme => ({
  root: {
    display: 'flex'
  },
  content: {
    flexGrow: 1,
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginRight: 350
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginRight: 0
  },
  secondaryHeader: {
    marginBottom: theme.spacing.unit * 2
  },
  breadCrumbIcon: {
    marginRight: theme.spacing.unit
  },
  breadCrumb: {
    fontSize: theme.spacing.unit * 2.5
  },
  breadCrumbLink: {
    fontSize: theme.spacing.unit * 2.5,
    display: 'flex',
    alignItems: 'center'
  }
});

class ClientPage extends Component {
  state = {
    isClientDetailsOpened: false
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

  render() {
    const { classes } = this.props;

    const { c_id } = this.props.match.params;

    const { isClientDetailsOpened } = this.state;

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
