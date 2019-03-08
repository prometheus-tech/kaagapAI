import React, { Component } from 'react';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';

import Layout from './hoc/Layout/Layout';
import ClientsPage from './containers/ClientsPage/ClientsPage';

import { USER_ID, AUTH_TOKEN } from './util/constants';

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
  uri: 'https://kaagapai-dev.herokuapp.com/graphql',
  cache
});

// Remove this upon implementing authentication functionality
localStorage.setItem(USER_ID, parseInt(1));
localStorage.setItem(AUTH_TOKEN, 'kaagapai');

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
