import React, { Component } from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';

import { SnackbarProvider } from 'notistack';

import Button from '@material-ui/core/Button';
import Layout from './hoc/Layout/Layout';
import ClientsPage from './containers/ClientsPage/ClientsPage';
import ClientPage from './containers/ClientPage/ClientPage';

import { USER_ID, AUTH_TOKEN } from './util/constants';
import SessionPage from './containers/SessionPage/SessionPage';

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'Client':
        return 'client:' + object.c_id;
      case 'Session':
        return 'session:' + object.session_id;
      case 'SessionDocument':
        return 'sesssionDocument:' + object.sd_id;
      default:
        return defaultDataIdFromObject(object);
    }
  }
});

const link = createUploadLink({
  uri: 'https://kaagapai-dev.herokuapp.com/graphql'
});

const client = new ApolloClient({
  link,
  cache
});

// Remove this upon implementing authentication functionality
localStorage.setItem(USER_ID, '67b8ba58-301e-45a3-ba01-ed6d0d229785');
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
              <Route path="/session/:session_id" component={SessionPage} />
            </Layout>
          </SnackbarProvider>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
