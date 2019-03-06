import React, { Component } from 'react';

import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EditClientModal from '../EditClientModal/EditClientModal';

class ClientMoreActions extends Component {
  state = {
    anchorEl: null,
    editModalOpened: false
  };

  openMoreActionsHandler = event => {
    this.setState({
      anchorEl: event.currentTarget
    });
  };

  closeMoreActionsHandler = () => {
    this.setState({
      anchorEl: null
    });
  };

  openEditClientModalHandler = () => {
    this.closeMoreActionsHandler();
    this.setState({ editModalOpened: true });
  };

  closeEditClientModalHandler = () => {
    this.setState({ editModalOpened: false });
  };

  render() {
    const { anchorEl, editModalOpened } = this.state;
    const { clientId } = this.props;
    const open = Boolean(anchorEl);

    const modal = editModalOpened ? (
      <EditClientModal
        isOpened={editModalOpened}
        closed={this.closeEditClientModalHandler}
        clientId={clientId}
      />
    ) : null;

    return (
      <Auxilliary>
        <IconButton onClick={this.openMoreActionsHandler}>
          <MoreVertIcon />
        </IconButton>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={this.closeMoreActionsHandler}
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
            <ListItem button onClick={this.openEditClientModalHandler}>
              <ListItemText primary="Edit" />
            </ListItem>
            <ListItem button>
              <ListItemText primary="Delete" />
            </ListItem>
          </List>
        </Popover>
        {modal}
      </Auxilliary>
    );
  }
}

export default ClientMoreActions;
