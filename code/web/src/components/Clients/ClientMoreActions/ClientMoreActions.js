import React, { Component } from 'react';

import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EditClientModal from '../EditClientModal/EditClientModal';
import DeleteClientDialog from '../DeleteClientDialog/DeleteClientDialog';

class ClientMoreActions extends Component {
  state = {
    anchorEl: null,
    editClientModalOpened: false,
    deleteClientDialogOpened: false
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
    this.setState({ editClientModalOpened: true });
  };

  closeEditClientModalHandler = () => {
    this.setState({ editClientModalOpened: false });
  };

  openDeleteClientDialogHandler = () => {
    this.closeMoreActionsHandler();
    this.setState({ deleteClientDialogOpened: true });
  };

  closeDeleteClientDialogHandler = () => {
    this.setState({ deleteClientDialogOpened: false });
  };

  render() {
    const {
      anchorEl,
      editClientModalOpened,
      deleteClientDialogOpened
    } = this.state;
    const { clientId, clientName } = this.props;
    const open = Boolean(anchorEl);

    const editClientModal = editClientModalOpened ? (
      <EditClientModal
        isOpened={editClientModalOpened}
        closed={this.closeEditClientModalHandler}
        clientId={clientId}
      />
    ) : null;

    const deleteClientDialog = deleteClientDialogOpened ? (
      <DeleteClientDialog
        isOpened={deleteClientDialogOpened}
        closed={this.closeDeleteClientDialogHandler}
        clientId={clientId}
        clientName={clientName}
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
              <ListItemText
                primary="Delete"
                onClick={this.openDeleteClientDialogHandler}
              />
            </ListItem>
          </List>
        </Popover>
        {editClientModal}
        {deleteClientDialog}
      </Auxilliary>
    );
  }
}

export default ClientMoreActions;
