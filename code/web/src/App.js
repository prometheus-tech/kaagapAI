import React, { Component } from 'react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';

import Layout from './hoc/Layout/Layout';
import ClientsPage from './containers/ClientsPage/ClientsPage';

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'Client':
        return object.c_id;
      default:
        return defaultDataIdFromObject(object);
    }
  }
});

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql',
  cache
});

cache.writeData({
  data: {
    currentUserId: parseInt(1)
  }
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
