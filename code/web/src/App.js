import React, { Component } from 'react';

import Layout from './hoc/Layout/Layout';
import ClientsPage from './containers/ClientsPage/ClientsPage';

class App extends Component {
  render() {
    return (
      <Layout>
        <ClientsPage />
      </Layout>
    );
  }
}

export default App;
