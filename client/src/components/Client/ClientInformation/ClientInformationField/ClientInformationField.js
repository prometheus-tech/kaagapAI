import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  label: {
    color: theme.palette.grey[600]
  },
  field: {
    marginBottom: theme.spacing.unit * 1.5,
    color: 'rgba(0, 0, 0, 0.87)'
  }
});

function ClientInformationField(props) {
  const { classes, label, value, gutters } = props;

  return (
    <Grid item xs={12} className={gutters ? classes.field : ''}>
      <Grid container>
        <Grid item xs={5}>
          <Typography className={classes.label}>{label}</Typography>
        </Grid>
        <Grid item xs={7}>
          <Typography className={classes.value}>{value}</Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(ClientInformationField);
