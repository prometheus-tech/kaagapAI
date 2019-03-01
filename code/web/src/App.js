import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import ClientsPage from './containers/ClientsPage/ClientsPage';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'kaagapai.com:4000/graphql'
});

class App extends Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <Layout>
          <ClientsPage />
        </Layout>
      </ApolloProvider>
    );
  }
}

export default App;
