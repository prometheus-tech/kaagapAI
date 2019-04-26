import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import purple from '@material-ui/core/colors/purple';
import grey from '@material-ui/core/colors/grey';
import Paper from '@material-ui/core/Paper';
import RangeBar from '../../UI/RangeBar/RangeBar';

const styles = theme => ({
  paper: {
    marginTop: theme.spacing.unit * 5,
    border: '1px solid #f3f3f3',
    boxShadow: 'none'
  },
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
  paperHeader: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
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
  },
  category: {
    color: grey[500],
    fontWeight: '400',
    fontSize: theme.spacing.unit * 2,
    textTransform: 'uppercase',
    letterSpacing: '2px'
  }
});

function Categories(props) {
  const { categories, classes } = props;

  return (
    <Paper className={classes.paper}>
      <Grid container className={classes.categoryContainer}>
        <Grid item xs={12} className={classes.paperHeader}>
          <Typography variant="h5" className={classes.category}>
            Categories
          </Typography>
        </Grid>
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
              key={category.category_id}
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
    </Paper>
  );
}

export default withStyles(styles)(Categories);
