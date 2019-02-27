import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Popover from '@material-ui/core/Popover';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const styles = theme => ({
  listLabel: {
    fontSize: 15,
    fontWeight: 600,
    color: blueGrey[600]
  },
  dropDownGrid: {
    display: 'flex',
    alignItems: 'center'
  }
});

function ClientListDropdownHeader(props) {
  const { classes } = props;

  const listItems = props.options.map((option, optionIndex) => {
    return (
      <ListItem
        button
        key={optionIndex}
        selected={optionIndex === props.dropdownSettings.selectedIndex}
        onClick={event =>
          props.dropdownSelectedIndexChanged(event, optionIndex)
        }
      >
        <ListItemText primary={option} />
      </ListItem>
    );
  });

  return (
    <Grid container spacing={0}>
      <Grid item xs={12} className={classes.dropDownGrid}>
        <Typography
          component="span"
          gutterBottom={false}
          className={classes.listLabel}
          onClick={event => props.optionsOpened(event.currentTarget)}
        >
          {props.options[props.dropdownSettings.selectedIndex]}
        </Typography>
        <ArrowDropDown />
      </Grid>
      <Popover
        open={Boolean(props.dropdownSettings.anchorElement)}
        anchorEl={props.dropdownSettings.anchorElement}
        onClose={props.optionsClosed}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
      >
        <List>{listItems}</List>
      </Popover>
    </Grid>
  );
}

export default withStyles(styles)(ClientListDropdownHeader);
