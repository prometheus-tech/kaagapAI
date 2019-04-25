import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import purple from '@material-ui/core/colors/purple';
import EntityMapper from './EntityMapper/EntityMapper';

import { getDocumentTalkTurns } from '../../../util/helperFunctions';
import RangeBar from '../../UI/RangeBar/RangeBar';

const styles = theme => ({
  entitiesContainer: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  paperHeader: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
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
  entityItemContent: {
    borderBottom: '1px solid #e8e8e8',
    paddingTop: theme.spacing.unit * 2,
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

class Entities extends Component {
  state = {
    selectedEntity: null
  };

  selectEntityHandler = entity => {
    this.setState({ selectedEntity: entity });
  };

  render() {
    const { entities, classes, documents } = this.props;

    const { selectedEntity } = this.state;

    const preprocessedDocuments = getDocumentTalkTurns(documents);

    return (
      <Paper elevation={1}>
        <Grid container spacing={16} className={classes.entitiesContainer}>
          <Grid item xs={12} className={classes.paperHeader}>
            <Typography variant="h5">Entities</Typography>
          </Grid>
          <Grid item xs={12}>
            <Grid container spacing={16}>
              <Grid item xs={7}>
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
                        <Typography className={classes.header}>
                          Score
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                  {entities.map(entity => {
                    return (
                      <Grid
                        key={entity.entity_id}
                        item
                        xs={12}
                        onClick={() => {
                          this.selectEntityHandler(entity);
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
                              <Grid
                                item
                                xs={10}
                                className={classes.rangeBarItem}
                              >
                                <RangeBar
                                  value={entity.relevance}
                                  maxValue={1}
                                />
                              </Grid>
                              <Grid item xs={2}>
                                <Typography
                                  component="span"
                                  className={classes.subLabel}
                                >
                                  {entity.relevance}
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
              {selectedEntity ? (
                <Grid item xs={5}>
                  <EntityMapper
                    entity={selectedEntity}
                    documents={preprocessedDocuments}
                  />
                </Grid>
              ) : null}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default withStyles(styles)(Entities);
