import React, { Component } from 'react';

import { Link as RouterLink, withRouter } from 'react-router-dom';

import SESSION from '../../graphql/queries/session';
import { Query } from 'react-apollo';

import { withStyles } from '@material-ui/core/styles';
import LoadingFullScreen from '../../components/UI/LoadingFullScreen/LoadingFullScreen';

const styles = theme => ({
  root: {
    display: 'flex',
    width: '100vw'
  }
});

class SessionPage extends Component {
  render() {
    const { classes } = this.props;

    const { session_id } = this.props.match.params;

    return (
      <Query query={SESSION} variables={{ session_id: session_id }}>
        {({ loading, error, data }) => {
          if (loading) {
            return <LoadingFullScreen />;
          }

          if (error) {
            return <p>Error</p>;
          }

          console.log(data);

          return (
            <div className={classes.root}>
              <h1>Session Page</h1>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default withRouter(withStyles(styles)(SessionPage));
