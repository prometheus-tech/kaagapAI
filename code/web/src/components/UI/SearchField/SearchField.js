import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';

const styles = theme => ({
  paper: {
    padding: '2px 8px',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
      boxShadow: theme.shadows[2]
    }
  },
  input: {
    marginLeft: '8px',
    '&:focus': {
      
    }
  }
});

function SearchField(props) {
  const { classes, label } = props;

  return (
    <Paper className={classes.paper} elevation={0}>
      <IconButton disabled>
        <SearchIcon />
      </IconButton>
      <InputBase
        fullWidth={true}
        className={classes.input}
        placeholder={'Search ' + label}
      />
    </Paper>
  );
}

export default withStyles(styles)(SearchField);
