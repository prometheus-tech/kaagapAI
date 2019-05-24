import React, { Component } from 'react';

import CUSTOM_RESULT from '../../../graphql/queries/customSessionResult';
import { Query } from 'react-apollo';
import LoadingFullScreen from '../../../components/UI/LoadingFullScreen/LoadingFullScreen';
import EmotionsTrend from '../../../components/Results/EmotionsTrend';

class CustomSessionsResultPage extends Component {
  render() {
    const { sessions } = this.props;

    const session_id = sessions.map(session => session.session_id);

    return (
      <Query
        query={CUSTOM_RESULT}
        variables={{ session_id: session_id }}
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
            <div>
              <h1>Custom Results</h1>
              <EmotionsTrend trend={trend} sessions={sessions} />
            </div>
          );
        }}
      </Query>
    );
  }
}

export default CustomSessionsResultPage;
