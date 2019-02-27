import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';
import Popover from '@material-ui/core/Popover';

const styles = theme => ({
  dropdownGrid: {
    display: 'flex',
    alignItems: 'center'
  }
});

function Dropdown(props) {
  const { classes } = props;

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
    <Grid container spacing={0}>
      <Grid item xs={12} className={classes.dropdownGrid}>
        <Typography
          component="span"
          gutterBottom={false}
          onClick={event => props.opened(event.currentTarget)}
        >
          {props.options[props.selectedIndex]}
        </Typography>
        <ArrowDropDown />
      </Grid>
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
    </Grid>
  );
}

export default withStyles(styles)(Dropdown);
