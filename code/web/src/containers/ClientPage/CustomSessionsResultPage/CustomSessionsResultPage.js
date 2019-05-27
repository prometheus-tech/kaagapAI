import React, { Component } from 'react';

import CUSTOM_RESULT from '../../../graphql/queries/customSessionResult';
import { Query } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';

import LoadingFullScreen from '../../../components/UI/LoadingFullScreen/LoadingFullScreen';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import EmotionsTrend from '../../../components/Results/EmotionsTrend/EmotionsTrend';
import SentimentsTrend from '../../../components/Results/SentimentsTrend/SentimentsTrend';
import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import SelectSessionsDialog from '../../../components/Client/SelectSessionsDialog/SelectSessionsDialog';
import EmptyCustomSessionsResult from '../../../components/UI/Placeholder/EmptyCustomSessionsResult';

const styles = theme => ({
  paper: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    boxShadow: '0 6px 10px rgba(0,0,0,.08), 0 0 6px rgba(0,0,0,.05)'
  }
});

class CustomSessionsResultPage extends Component {
  state = {
    checkedSessions: [],
    analyzedSessions: []
  };

  toggleCheckedSessionHandler = sessionId => {
    const currentIndex = this.state.checkedSessions.indexOf(sessionId);

    const newCheckedSessions = [...this.state.checkedSessions];

    if (currentIndex === -1) {
      newCheckedSessions.push(sessionId);
    } else {
      newCheckedSessions.splice(currentIndex, 1);
    }

    this.setState({
      checkedSessions: newCheckedSessions
    });
  };

  changeAnalyzedSessions = () => {
    const newAnalyzedSessions = [...this.state.checkedSessions];

    this.setState({
      analyzedSessions: newAnalyzedSessions
    });
  };

  render() {
    const {
      classes,
      sessions,
      isSelectSessionsDialogOpened,
      selectSessionsDialogOpened,
      selectSessionsDialogClosed
    } = this.props;

    const { checkedSessions, analyzedSessions } = this.state;

    return (
      <Auxilliary>
        <SelectSessionsDialog
          opened={isSelectSessionsDialogOpened}
          sessions={sessions}
          checkedSessions={checkedSessions}
          checkSessionsToggled={this.toggleCheckedSessionHandler}
          selectSessionsDialogClosed={selectSessionsDialogClosed}
          analyzeSessions={this.changeAnalyzedSessions}
        />
        {analyzedSessions.length > 0 ? (
          <Query
            query={CUSTOM_RESULT}
            variables={{ session_id: analyzedSessions }}
            errorPolicy="all"
          >
            {({ loading, error, data }) => {
              if (loading) {
                return <LoadingFullScreen />;
              }

              if (error) {
                return <div />;
              }

              const { customSessionResult } = data;
              const { trend } = customSessionResult;

              return (
                <Grid container spacing={16}>
                  <Grid item xs={8}>
                    <Paper className={classes.paper}>
                      <EmotionsTrend trend={trend} />
                    </Paper>
                  </Grid>
                  <Grid item xs={8}>
                    <Paper className={classes.paper}>
                      <SentimentsTrend trend={trend} />
                    </Paper>
                  </Grid>
                </Grid>
              );
            }}
          </Query>
        ) : (
          <EmptyCustomSessionsResult
            selectSessionsDialogOpened={selectSessionsDialogOpened}
          />
        )}
      </Auxilliary>
    );
  }
}

export default withStyles(styles)(CustomSessionsResultPage);
