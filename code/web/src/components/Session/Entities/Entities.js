import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import purple from '@material-ui/core/colors/purple';
import grey from '@material-ui/core/colors/grey';
import EntityMapper from './EntityMapper/EntityMapper';

import { getDocumentTalkTurns } from '../../../util/helperFunctions';
import RangeBar from '../../UI/RangeBar/RangeBar';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 4,
    height: '475px',
    overflowY: 'scroll',
    width: '100%',
    boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)'
  },
  entitiesContainer: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  paperHeader: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  entityMapper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 4,
    boxShadow: 'none',
    width: '100%',
    height: '475px',
    overflowY: 'scroll'
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
  },
  entities: {
    color: grey[500],
    fontWeight: '400',
    fontSize: theme.spacing.unit * 2,
    textTransform: 'uppercase',
    letterSpacing: '2px',
    marginTop: theme.spacing.unit * 1
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
    const {
      entities,
      classes,
      documents,
      contentSessionDocumentDialogOpened
    } = this.props;

    const { selectedEntity } = this.state;

    const preprocessedDocuments = getDocumentTalkTurns(documents);

    return (
      <Grid container spacing={16}>
        <Grid item xs={8}>
          <Paper className={classes.paper}>
            <Grid item xs={12} className={classes.paperHeader}>
              <Typography variant="h5" className={classes.entities}>
                Entities
              </Typography>
            </Grid>
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
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper className={classes.entityMapper}>
            {selectedEntity ? (
              <EntityMapper
                entity={selectedEntity}
                documents={preprocessedDocuments}
                contentSessionDocumentDialogOpened={
                  contentSessionDocumentDialogOpened
                }
              />
            ) : (
              <Typography>No Entity selected.</Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(Entities);
