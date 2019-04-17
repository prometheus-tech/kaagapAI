import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';

import { SnackbarProvider } from 'notistack';

import Button from '@material-ui/core/Button';

import Layout from './hoc/Layout/Layout';
import Login from './containers/Login/Login';
import ClientsPage from './containers/ClientsPage/ClientsPage';
import ClientPage from './containers/ClientPage/ClientPage';
import SessionPage from './containers/SessionPage/SessionPage';

import { AUTH_TOKEN } from './util/constants';

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
  uri: 'http://kaagapai-dev.com:4000/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN);
  return {
    headers: {
      ...headers,
      authorization: token ? token : ''
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(link),
  cache
});

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
            <Switch>
              <Route path="/login" component={Login} />
              <Layout>
                <Route exact path="/" component={ClientsPage} />
                <Route path="/client/:c_id" component={ClientPage} />
                <Route path="/session/:session_id" component={SessionPage} />
              </Layout>
            </Switch>
          </SnackbarProvider>
        </BrowserRouter>
      </ApolloProvider>
    );
  }
}

export default App;
