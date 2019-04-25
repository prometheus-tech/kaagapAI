import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { Query } from 'react-apollo';
import RESULTS from '../../../graphql/queries/results';

import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import purple from '@material-ui/core/colors/purple';
import LoadingFullScreen from '../../../components/UI/LoadingFullScreen/LoadingFullScreen';
import Grid from '@material-ui/core/Grid';
import KeywordsContainer from './Keywords/KeywordsContainer';
import Categories from './Categories/Categories';
import Emotions from './Emotions/Emotions';
import Entities from './Entities/Entities';

const styles = theme => ({
  extendedButton: {
    background: purple[500],
    color: '#ffffff',
    textTransform: 'capitalize',
    borderRadius: '50px',
    fontSize: 16,
    '&:hover': {
      backgroundColor: purple[700],
      boxShadow: theme.shadows[10]
    },
    padding: '5px 25px 5px 25px',
    marginBottom: theme.spacing.unit * 2
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  floatingButton: {
    position: 'fixed',
    bottom: theme.spacing.unit * 2,
    right: theme.spacing.unit * 2,
    boxShadow: theme.shadows[24],
    color: '#ffffff',
    '&:hover': {
      boxShadow: theme.shadows[10]
    }
  },
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  }
});

class SessionResultsPage extends Component {
  render() {
    const { session_id, documents } = this.props;

    return (
      <Query
        query={RESULTS}
        variables={{ session_id }}
        fetchPolicy="network-only"
      >
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingFullScreen />;
          }

          if (error) {
            return <p>Error</p>;
          }

          return (
            <Auxilliary>
              <Grid container spacing={16}>
                {data.result.keywords ? (
                  <Grid item xs={7}>
                    <KeywordsContainer
                      keywords={data.result.keywords}
                      documents={documents}
                    />
                  </Grid>
                ) : null}
                {data.result.categories ? (
                  <Grid item xs={5}>
                    <Categories categories={data.result.categories} />
                  </Grid>
                ) : null}
                {data.result.emotions && data.result.sentiment ? (
                  <Grid item xs={6}>
                    <Emotions
                      emotions={data.result.emotions}
                      sentiment={data.result.sentiment}
                    />
                  </Grid>
                ) : null}
                {data.result.entities ? (
                  <Grid item xs={12}>
                    <Entities
                      entities={data.result.entities}
                      documents={documents}
                    />
                  </Grid>
                ) : null}
              </Grid>
            </Auxilliary>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(SessionResultsPage);
