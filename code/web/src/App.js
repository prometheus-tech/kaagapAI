import React, { Component } from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';

import { SnackbarProvider } from 'notistack';

import Button from '@material-ui/core/Button';
import Layout from './hoc/Layout/Layout';
import ClientsPage from './containers/ClientsPage/ClientsPage';
import ClientPage from './containers/ClientPage/ClientPage';

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
        <BrowserRouter>
          <SnackbarProvider
            maxSnack={1}
            preventDuplicate
            action={[
              <Button color="secondary" size="small">
                {'Dismiss'}
              </Button>
            ]}
          >
            <Layout>
              <Route exact path="/" component={ClientsPage} />
              <Route path="/client/:c_id" component={ClientPage} />
            </Layout>
          </SnackbarProvider>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
