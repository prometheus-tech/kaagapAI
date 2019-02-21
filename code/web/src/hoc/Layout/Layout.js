import React from 'react';

import Aux from '../Aux/Aux';
import Header from '../../components/Navigation/Header/Header';

function Layout(props) {
  return (
    <Aux>
      <Header />
      <main>
        {/* Wrap props.children with Grid of Material UI */}
        {props.children}
      </main>
    </Aux>
  );
}

export default Layout;
