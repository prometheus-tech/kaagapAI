import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import SearchField from '../../UI/SearchField/SearchField';
import ViewControl from '../../UI/ViewControl/ViewControl';

const styles = theme => ({
  root: {
    margin: '0px',
    padding: '0px',
    height: '60px',
    width: '100%',
    position: 'absolute',
    backgroundColor: '#f2f2f2',
    boxShadow: '0 0px 2px rgba(0,0,0,0.11), 0 0px 0px rgba(0,0,0,0.10)'
  },
  controlsContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px'
  }
});
class SubHeader extends Component {
  state = {
    isNewClientDialogOpened: false,
    view: 'card'
  };

  changeViewHandler = updatedView => {
    this.setState({
      view: updatedView
    });
  };

  openNewClientDialogHandler = () => {
    this.setState({
      isNewClientDialogOpened: true
    });
  };
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container>
          <Grid item sm={3} md={5} />
          <Grid item sm={8} md={6}>
            <div className={classes.controlsContainer}>
              <SearchField placeholder="Search client..." />
              <ViewControl
                view={this.state.view}
                viewChanged={this.changeViewHandler}
              />
            </div>
          </Grid>
          <Grid item sm={1} md={1} />
        </Grid>
      </div>
    );
  }
}
export default withStyles(styles)(SubHeader);
