import React from 'react';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';

function Dropdown(props) {
  const items = props.options.map((option, optionIndex) => {
    return (
      <ListItem
        button
        key={optionIndex}
        selected={optionIndex === props.selectedIndex}
        onClick={event => props.selectedIndexChanged(event, optionIndex)}
      >
        <ListItemText primary={option} />
      </ListItem>
    );
  });

  return (
    <Popover
      open={Boolean(props.anchorElement)}
      anchorEl={props.anchorElement}
      onClose={props.closed}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'left'
      }}
    >
      <List>{items}</List>
    </Popover>
  );
}

export default Dropdown;
