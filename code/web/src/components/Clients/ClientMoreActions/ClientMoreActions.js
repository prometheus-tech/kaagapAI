import React, { Component } from 'react';

import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

class ClientMoreActions extends Component {
  state = {
    anchorEl: null
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null
    });
  };

  render() {
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    return (
      <Auxilliary>
        <IconButton onClick={this.handleClick}>
          <MoreVertIcon />
        </IconButton>
        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left'
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left'
          }}
        >
          <List>
            <ListItem button>
              <ListItemText primary="Edit" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Remove" />
            </ListItem>
          </List>
        </Popover>
      </Auxilliary>
    );
  }
}

export default ClientMoreActions;
