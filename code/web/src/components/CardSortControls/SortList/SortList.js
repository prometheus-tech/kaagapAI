import React from 'react';

import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';

function SortList(props) {
  const menuList = props.options.map((option, optionIndex) => {
    return (
      <MenuItem
        key={optionIndex}
        selected={optionIndex === props.selectedIndex}
        onClick={event => props.selectedIndexChanged(event, optionIndex)}
      >
        {option}
      </MenuItem>
    );
  });

  return (
    <Auxilliary>
      <Button onClick={event => props.optionsOpened(event.currentTarget)}>
        {props.options[props.selectedIndex]}
      </Button>
      <Menu
        anchorEl={props.anchorElement}
        open={Boolean(props.anchorElement)}
        onClose={props.optionsClosed}
      >
        {menuList}
      </Menu>
    </Auxilliary>
  );
}

export default SortList;
