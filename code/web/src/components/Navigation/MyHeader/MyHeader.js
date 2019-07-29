import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Logo from '../../../assets/kaagapai-logo.svg';
import IconButton from '@material-ui/core/IconButton';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import { Link as RouterLink, withRouter } from 'react-router-dom';
import MyBreadcrumb from '../MyBreadcrumb/MyBreadcrumb';

import { ApolloConsumer } from 'react-apollo';

import { logout } from '../../../util/helperFunctions';

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  appBar: {
    backgroundColor: '#FFFFFF',
    zIndex: 5,
    boxShadow: '0 0px 5px rgba(0,0,0,0.11), 0 0px 0px rgba(0,0,0,0.10)',
    borderBottom: '1px solid #E6E6E6'
  },
  logo: {
    width: '30px',
    marginRight: theme.spacing.unit * 2
  },
  logoButton: {
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  logoContainer: {
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center'
  },
  primaryButton: {
    background: 'linear-gradient(to top, #8f94fb, #4e54c8)',
    color: '#FFFFFF',
    textAlign: 'left',
    border: 0,
    textTransform: 'capitalize',
    marginRight: theme.spacing.unit * 4,
    paddingTop: 8,
    paddingBottom: 8
  },
  primaryButtonWrapper: {
    borderRight: '1px solid #E6E6E6',
    display: 'inline-block',
    marginRight: theme.spacing.unit
  }
});

class MyHeader extends Component {
  state = {
    anchorEl: null
  };

  openMenuHandler = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  closeMenuHandler = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {
      classes,
      primaryButtonAction,
      primaryButtonIcon,
      primaryButtonLabel,
      breadcrumbData
    } = this.props;

    const { anchorEl } = this.state;

    const isMenuOpened = Boolean(anchorEl);

    const ButtonHomeLink = props => <RouterLink to="/" {...props} />;

    const ButtonAccountLink = props => <RouterLink to="/account" {...props} />;

    return (
      <ApolloConsumer>
        {client => (
          <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
              <Toolbar>
                <div className={classes.logoContainer}>
                  <Button
                    component={ButtonHomeLink}
                    disableRipple={true}
                    disableTouchRipple={true}
                    className={classes.logoButton}
                  >
                    <img src={Logo} alt="kaagapAI" className={classes.logo} />
                  </Button>
                  {breadcrumbData ? (
                    <MyBreadcrumb breadcrumbData={breadcrumbData} />
                  ) : null}
                </div>
                <div>
                  <div className={classes.primaryButtonWrapper}>
                    {primaryButtonAction ? (
                      <Button
                        variant="outlined"
                        className={classes.primaryButton}
                        onClick={primaryButtonAction}
                      >
                        {primaryButtonIcon ? primaryButtonIcon : null}{' '}
                        {primaryButtonLabel}
                      </Button>
                    ) : null}
                  </div>
                  <IconButton component={RouterLink} to="/archives">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={this.openMenuHandler}>
                    <AccountCircleIcon />
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={isMenuOpened}
              onClose={this.closeMenuHandler}
            >
              <MenuItem component={ButtonAccountLink}>Account</MenuItem>
              <MenuItem
                onClick={() => {
                  logout(client);
                  this.props.history.push('/signin');
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default withStyles(styles)(withRouter(MyHeader));
