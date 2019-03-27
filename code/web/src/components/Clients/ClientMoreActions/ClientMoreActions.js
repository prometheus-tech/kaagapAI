import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import EditClientDialog from '../EditClientDialog/EditClientDialog';
import DeleteClientDialog from '../DeleteClientDialog/DeleteClientDialog';

const styles = theme => ({
  root:{
    background: '#33333',
  }
});
class ClientMoreActions extends Component {
  state = {
    anchorEl: null,
    editClientDialogOpened: false,
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

  openEditClientDialogHandler = () => {
    this.closeMoreActionsHandler();
    this.setState({ editClientDialogOpened: true });
  };

  closeEditClientDialogHandler = () => {
    this.setState({ editClientDialogOpened: false });
  };

  openDeleteClientDialogHandler = () => {
    this.closeMoreActionsHandler();
    this.setState({ deleteClientDialogOpened: true });
  };

  closeDeleteClientDialogHandler = () => {
    this.setState({ deleteClientDialogOpened: false });
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
      editClientDialogOpened,
      deleteClientDialogOpened
    } = this.state;
    const { client } = this.props;
    const { c_id, fname, lname } = client;
    const open = Boolean(anchorEl);
    const {classes} = this.props;
    return (
      <Auxilliary>
        <IconButton disableRipple={true} className={classes.root} onClick={this.openMoreActionsHandler}>
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
            <ListItem button onClick={e => this.openEditClientDialogHandler(e)}>
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
        <EditClientDialog
          isOpened={editClientDialogOpened}
          closed={this.closeEditClientDialogHandler}
          client={client}
        />
        <DeleteClientDialog
          isOpened={deleteClientDialogOpened}
          closed={this.closeDeleteClientDialogHandler}
          clientId={c_id}
          fname={fname}
          lname={lname}
        />
      </Auxilliary>
    );
  }
}

export default withStyles(styles)(ClientMoreActions);
