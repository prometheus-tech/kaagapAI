import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { blueGrey } from '@material-ui/core/colors';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import ArrowDropDown from '@material-ui/icons/ArrowDropDown';

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
  return (
    <Grid container spacing={0}>
      <Grid item xs={12} className={classes.dropDownGrid}>
        <Typography
          component="span"
          gutterBottom={false}
          className={classes.listLabel}
          onClick={event => props.opened(event.currentTarget)}
        >
          {props.label}
        </Typography>
        <ArrowDropDown />
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(ClientListDropdownHeader);
