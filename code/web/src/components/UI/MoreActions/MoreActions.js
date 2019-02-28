import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Popover from '@material-ui/core/Popover';

const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white
      }
    }
  },
  primary: {},
  icon: {}
});

function MoreActions(props) {
  const { classes } = props;

  const items = props.options.map((option, optionIndex) => {
    return (
      <MenuItem className={classes.menuItem} onClick={props.clicked}>
        <ListItemIcon>{option.itemIcon}</ListItemIcon>
        <ListItemText
          classes={{ primary: classes.primary }}
          inset
          primary={option.label}
        />
      </MenuItem>
    );
  });

  return (
    <Popover
      open={Boolean(props.anchorElement)}
      anchorEl={props.anchorElement}
      onClose={props.closed}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
    >
      <Paper>
        <MenuList>{items}</MenuList>
      </Paper>
    </Popover>
  );
}

export default withStyles(styles)(MoreActions);
