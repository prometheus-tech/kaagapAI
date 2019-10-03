import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { withStyles } from '@material-ui/core/styles';
import AccountCircle from '@material-ui/icons/AccountCircle';
import DeleteIcon from '@material-ui/icons/Delete';
import MoreIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import blueGrey from '@material-ui/core/colors/blueGrey';
import 'typeface-overpass';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Add from '@material-ui/icons/Add';
import blue from '@material-ui/core/colors/blue';

import Logo from '../../../assets/kaagapai-logo.svg';

import { logout } from '../../../util/helperFunctions';

import { Link as RouterLink, withRouter } from 'react-router-dom';

import { ApolloConsumer } from 'react-apollo';

const styles = theme => ({
  root: {
    width: '100%',
    height: '60px',
    background: '#ffffff',
    boxShadow: '0 0px 5px rgba(0,0,0,0.11), 0 0px 0px rgba(0,0,0,0.10)',
    zIndex: theme.zIndex.drawer + 1,
    padding: '0px',
    margin: '0px'
  },
  extendedButton: {
    background: 'linear-gradient(to top, #8f94fb, #4e54c8)',
    color: '#ffffff',
    textTransform: 'capitalize',
    borderRadius: '10px',
    fontSize: 15,
    '&:hover': {
      backgroundColor: blue[900]
    },
    margin: theme.spacing.unit,
    padding: '3px 15px 3px 15px',
    boxShadow: 'none'
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  nameLogo: {
    color: blueGrey[600],
    marginLeft: 10
  },
  logo: {
    width: 40,
    height: 40
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  logoAppNameButton: {
    textTransform: 'initial',
    '&:hover': {
      backgroundColor: 'transparent'
    }
  },
  logoAppNameContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  divider: {
    height: '40px',
    // width: '1px',
    border: '0px'
  }
});

class Header extends Component {
  state = {
    anchorEl: null,
    mobileMoreAnchorEl: null
  };

  handleProfileMenuOpen = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleMenuClose = () => {
    this.setState({ anchorEl: null });
    this.handleMobileMenuClose();
  };

  handleMobileMenuOpen = event => {
    this.setState({ mobileMoreAnchorEl: event.currentTarget });
  };

  handleMobileMenuClose = () => {
    this.setState({ mobileMoreAnchorEl: null });
  };

  render() {
    const { anchorEl, mobileMoreAnchorEl } = this.state;
    const { classes } = this.props;
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

    const ButtonLink = props => <RouterLink to="/" {...props} />;

    return (
      <ApolloConsumer>
        {client => (
          <div className={classes.root}>
            <AppBar position="fixed" className={classes.root}>
              <Toolbar>
                <Button
                  component={ButtonLink}
                  className={classes.logoAppNameButton}
                  disableRipple={true}
                  disableTouchRipple={true}
                >
                  <div className={classes.logoAppNameContainer}>
                    <img src={Logo} className={classes.logo} alt="kaagapAI" />
                    <Typography
                      variant="h6"
                      className={classes.nameLogo}
                      noWrap
                    >
                      kaagapAI
                    </Typography>
                  </div>
                </Button>
                <div className={classes.grow} />
                <Fab
                  color="primary"
                  variant="outlined"
                  className={classes.extendedButton}
                  onClick={this.openNewClientDialogHandler}
                >
                  <Add className={classes.extendedIcon} /> New Client
                </Fab>
                <hr className={classes.divider} />
                <div className={classes.sectionDesktop}>
                  <IconButton component={RouterLink} to="/archives">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    aria-owns={isMenuOpen ? 'material-appbar' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleProfileMenuOpen}
                  >
                    <AccountCircle />
                  </IconButton>
                </div>
                <div className={classes.sectionMobile}>
                  <IconButton
                    aria-haspopup="true"
                    onClick={this.handleMobileMenuOpen}
                    color="inherit"
                  >
                    <MoreIcon />
                  </IconButton>
                </div>
              </Toolbar>
            </AppBar>
            <Menu
              anchorEl={anchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={isMenuOpen}
              onClose={this.handleMenuClose}
            >
              <MenuItem
                onClick={this.handleMenuClose}
                component={RouterLink}
                to="/account"
              >
                Profile
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logout(client);
                  this.props.history.push('/signin');
                }}
              >
                Logout
              </MenuItem>
            </Menu>
            <Menu
              anchorEl={mobileMoreAnchorEl}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={isMobileMenuOpen}
              onClose={this.handleMenuClose}
              color="primary"
            >
              <MenuItem onClick={this.handleProfileMenuOpen}>
                <IconButton color="inherit">
                  <AccountCircle />
                </IconButton>
                <p>Profile</p>
              </MenuItem>
            </Menu>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(withRouter(Header));
