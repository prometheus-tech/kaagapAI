import React from 'react';

import Auxilliary from '../Auxilliary/Auxilliary';
import Header from '../../components/Navigation/Header/Header';
import Grid from '@material-ui/core/Grid';

function Layout() {
  return (
    <Auxilliary>
      <Header />
      <Grid container>{this.props.children}</Grid>
    </Auxilliary>
  );
}

export default Layout;
