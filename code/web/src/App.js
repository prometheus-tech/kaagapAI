import React, { Component } from 'react';

import { HashRouter, Route, Switch } from 'react-router-dom';

import { ApolloClient } from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache, defaultDataIdFromObject } from 'apollo-cache-inmemory';
import { createUploadLink } from 'apollo-upload-client';
import { setContext } from 'apollo-link-context';
import { onError } from 'apollo-link-error';

import { SnackbarProvider } from 'notistack';

import Button from '@material-ui/core/Button';

import SignIn from './containers/SignIn/SignIn';
import SignUp from './containers/SignUp/SignUp';
import ClientsPage from './containers/ClientsPage/ClientsPage';
import ClientPage from './containers/ClientPage/ClientPage';
import SessionPage from './containers/SessionPage/SessionPage';
import ArchivesPage from './containers/ArchivesPage/ArchivesPage';

import { AUTH_TOKEN } from './util/constants';

import { logout } from './util/helperFunctions';

import { createHashHistory } from 'history';

const history = createHashHistory();

const cache = new InMemoryCache({
  dataIdFromObject: object => {
    switch (object.__typename) {
      case 'Client':
        return 'client:' + object.c_id;
      case 'Session':
        return 'session:' + object.session_id;
      case 'SessionDocument':
        return 'sesssionDocument:' + object.sd_id;
      case 'Result':
        return 'result:' + object.result_id;
      case 'Sentiment':
        return 'sentiment:' + object.sentiment_id;
      case 'Keyword':
        return 'keyword:' + object.keyword_id;
      case 'Category':
        return 'category:' + object.category_id;
      case 'Entity':
        return 'entity:' + object.entity_id;
      case 'Emotion':
        return 'emotion:' + object.emotion_id;
      case 'Archives':
        return 'archives:' + object.archives_id;
      case 'CustomResult':
        return 'customResult:' + object.custom_result_id;
      case 'CustomSentiment':
        return 'customSentiment:' + object.custom_sentiment_id;
      case 'CustomKeyword':
        return 'customKeyword:' + object.custom_keyword_id;
      case 'CustomCategory':
        return 'customCategory:' + object.custom_category_id;
      case 'CustomEntity':
        return 'customEntity:' + object.custom_entity_id;
      case 'CustomEmotion':
        return 'customEmotion:' + object.custom_emotion_id;
      case 'Trend':
        return 'trend:' + object.trend_id;
      case 'TalkTurn':
        return 'talkTurn:' + object.talk_turn_id;
      case 'AppearanceDocument':
        return 'appearanceDocument:' + object.appearance_document_id;
      case 'TextAppearance':
        return 'textAppearance:' + object.appearance_id;
      case 'TextOccurence':
        return 'textOccurrence:' + object.text_occurrence_id;
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
    graphQLErrors.map(({ message, locations, path, extensions }) => {
      switch (extensions.code) {
        case 'UNAUTHENTICATED':
          logout(client);
          history.push('/signin');
          break;
        default:
          console.log(
            `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Code: ${
              extensions.code
            }`
          );
      }

      return null;
    });
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
        <HashRouter>
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
              <Route exact path="/" component={ClientsPage} />
              <Route path="/archives" component={ArchivesPage} />
              <Route path="/client/:c_id" component={ClientPage} />
              <Route path="/session/:session_id" component={SessionPage} />
            </Switch>
          </SnackbarProvider>
        </HashRouter>
      </ApolloProvider>
    );
  }
}

export default App;
