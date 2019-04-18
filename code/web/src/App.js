import React, { Component } from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';

import { SnackbarProvider } from 'notistack';

import Button from '@material-ui/core/Button';

import Layout from './hoc/Layout/Layout';
import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUp';
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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    // graphQLErrors.map(({ message, locations, path }) =>
    //   console.log(
    //     `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
    //   )
    // );

    graphQLErrors.map(e => console.log(`[GraphQL error]: ${e}`));
  }

  if (networkError) {
    console.log(`[Network error]: ${networkError}`);
  }
});

const client = new ApolloClient({
  link: authLink.concat(errorLink).concat(link),
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
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
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
