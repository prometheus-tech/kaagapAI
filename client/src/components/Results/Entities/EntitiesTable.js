import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import RangeBar from '../../UI/RangeBar/RangeBar';
import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
  entitiesTableContainer: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  header: {
    fontWeight: 500,
    fontSize: 16,
    color: theme.palette.grey[600]
  },
  mainLabel: {
    fontWeight: 500,
    fontSize: 16,
    color: purple[500]
  },
  subLabel: {
    fontWeight: 500,
    fontSize: 16,
    color: theme.palette.grey[800]
  },
  entityItem: {
    cursor: 'pointer'
  },
  entityItemContent: {
    borderBottom: '1px solid #e8e8e8',
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3
  },
  scoreGrid: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  rangeBarItem: {
    paddingRight: theme.spacing.unit * 2
  }
});

function EntitiesTable({ classes, entities, resultType, entitySelected }) {
  return (
    <Grid container className={classes.entitiesTableContainer}>
      <Grid item xs={12}>
        <Grid container>
          <Grid item xs={12}>
            <Grid container alignItems="center">
              <Grid item xs={4}>
                <Typography className={classes.header}>Name</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.header}>Type</Typography>
              </Grid>
              <Grid item xs={4}>
                <Typography className={classes.header}>Score</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12}>
            {entities.map(entity => {
              return (
                <Grid
                  key={
                    resultType === 'Custom'
                      ? entity.custom_entity_id
                      : entity.entity_id
                  }
                  item
                  xs={12}
                  className={classes.entityItem}
                  onClick={() => {
                    entitySelected(entity);
                  }}
                >
                  <Grid
                    container
                    alignItems="center"
                    className={classes.entityItemContent}
                  >
                    <Grid item xs={4}>
                      <Typography className={classes.mainLabel}>
                        {entity.text}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography className={classes.subLabel}>
                        {entity.type}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Grid container className={classes.scoreGrid}>
                        <Grid item xs={10} className={classes.rangeBarItem}>
                          <RangeBar value={entity.relevance} maxValue={1} />
                        </Grid>
                        <Grid item xs={2}>
                          <Typography
                            component="span"
                            className={classes.subLabel}
                          >
                            {Math.round(entity.relevance * 100) / 100}
                          </Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              );
            })}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default withStyles(styles)(EntitiesTable);
