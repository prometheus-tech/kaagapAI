import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import purple from '@material-ui/core/colors/purple';
import RangeBar from '../../UI/RangeBar/RangeBar';

const styles = theme => ({
  categoryContainer: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  categoryItemContent: {
    borderBottom: '1px solid #e8e8e8',
    paddingTop: theme.spacing.unit * 3,
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
  },
  scoreGrid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rangeBarItem: {
    paddingRight: theme.spacing.unit * 3
  },
  subLabel: {
    fontWeight: 500,
    fontSize: 16,
    color: theme.palette.grey[800]
  }
});

function Categories(props) {
  const { categories, classes } = props;

  return (
    <Grid container className={classes.categoryContainer}>
      <Grid item xs={12}>
        <Grid container alignItems="center">
          <Grid item xs={8}>
            <Typography className={classes.header}>Hierarchy</Typography>
          </Grid>
          <Grid item xs={4}>
            <Typography className={classes.header}>Score</Typography>
          </Grid>
        </Grid>
      </Grid>
      {categories.map(category => {
        return (
          <Grid
            key={category.custom_category_id}
            item
            xs={12}
            className={classes.categoryItemContent}
          >
            <Grid container alignItems="center">
              <Grid item xs={8}>
                <Typography className={classes.label}>
                  {category.label}
                </Typography>
              </Grid>
              <Grid item xs={4}>
                <Grid container className={classes.scoreGrid}>
                  <Grid item xs={10} className={classes.rangeBarItem}>
                    <RangeBar value={category.score} maxValue={1} />
                  </Grid>
                  <Grid item xs={2}>
                    <Typography component="span" className={classes.subLabel}>
                      {Math.round(category.score * 100) / 100}
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        );
      })}
    </Grid>
  );
}

export default withStyles(styles)(Categories);
