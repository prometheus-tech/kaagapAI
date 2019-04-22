import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
  categoryContainer: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  categoryItemContent: {
    display: 'flex',
    justifyContent: 'space-between',
    borderBottom: '1px solid #e8e8e8',
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 3
  },
  label: {
    fontWeight: 500,
    fontSize: 16,
    color: purple[500]
  },
  header: {
    fontWeight: 500,
    fontSize: 16,
    color: theme.palette.grey[600]
  }
});

function Categories(props) {
  const { categories, classes } = props;

  return (
    <Grid container className={classes.categoryContainer}>
      <Grid item xs={12}>
        <Grid container alignItems="center">
          <Grid item md={6}>
            <div
              className={classes.categoryItemContent}
              style={{ borderBottom: 'none' }}
            >
              <Typography className={classes.header}>Hierarchy</Typography>
              <Typography className={classes.header}>Score</Typography>
            </div>
          </Grid>
        </Grid>
      </Grid>
      {categories.map(category => {
        return (
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item md={6}>
                <div className={classes.categoryItemContent}>
                  <Typography className={classes.label}>
                    {category.label}
                  </Typography>
                  <Typography>{category.score}</Typography>
                </div>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default withStyles(styles)(Categories);