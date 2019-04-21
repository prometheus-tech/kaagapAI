import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import { Query, Mutation } from 'react-apollo';
import RESULTS from '../../../graphql/queries/results';
import GENERATE_RESULTS from '../../../graphql/mutations/generateResults';

import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import Hidden from '@material-ui/core/Hidden';
import Fab from '@material-ui/core/Fab';
import purple from '@material-ui/core/colors/purple';
import InsertChartIcon from '@material-ui/icons/InsertChart';
import AddIcon from '@material-ui/icons/Add';
import LoadingFullScreen from '../../../components/UI/LoadingFullScreen/LoadingFullScreen';
import KeywordsContainer from './KeywordsContainer/KeywordsContainer';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

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
  expansionPanelContainer: {
    padding: 24
  }
});

class SessionResultsPage extends Component {
  render() {
    const { classes, session_id } = this.props;

    return (
      <Query query={RESULTS} variables={{ session_id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingFullScreen />;
          }

          if (error) {
            return <p>Error</p>;
          }

          const { keywords, sentiment, emotions } = data.result;

          return (
            <Mutation mutation={GENERATE_RESULTS}>
              {generateResults => (
                <Auxilliary>
                  <Hidden smDown>
                    <Fab
                      color="primary"
                      variant="extended"
                      className={classes.extendedButton}
                      onClick={() =>
                        generateResults({ variables: { session_id } })
                      }
                    >
                      <InsertChartIcon className={classes.extendedIcon} />{' '}
                      Generate Results
                    </Fab>
                  </Hidden>
                  <Hidden mdUp>
                    <Fab
                      size="large"
                      color="primary"
                      className={classes.floatingButton}
                      disableRipple={false}
                      disableFocusRipple={false}
                    >
                      <AddIcon />
                    </Fab>
                  </Hidden>
                  <div className={classes.expansionPanelContainer}>
                    <ExpansionPanel>
                      <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography variant="h6">Keywords</Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails>
                        <KeywordsContainer keywords={keywords} />
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  </div>
                </Auxilliary>
              )}
            </Mutation>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(styles)(SessionResultsPage);
