import React, { Component } from 'react';

import CUSTOM_RESULT from '../../../graphql/queries/customResult';
import { Query } from 'react-apollo';
import LoadingFullScreen from '../../../components/UI/LoadingFullScreen/LoadingFullScreen';

class CustomSessionsResultPage extends Component {
  render() {
    const { sessions } = this.props;

    const session_id = sessions.map(session => session.session_id);

    console.log(session_id);

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

          return (
            <div>
              <h1>Custom Results</h1>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default CustomSessionsResultPage;
