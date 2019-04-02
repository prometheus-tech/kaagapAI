import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';

import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import ClientInformationField from './ClientInformationField/ClientInformationField';
import Moment from 'react-moment';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Avatar from '@material-ui/core/Avatar';
import PersonIcon from '@material-ui/icons/Person';
import CloseIcon from '@material-ui/icons/Close';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import EditClientDialog from '../../Clients/EditClientDialog/EditClientDialog';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { CssBaseline } from '@material-ui/core';

const drawerWidth = '25';

const styles = theme => ({
  drawer: {
    width: drawerWidth + '%',
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth + '%'
  },
  infoHeader: {
    display: 'flex',
    alignItems: 'center'
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: theme.spacing.unit * 2,
    ...theme.mixins.toolbar
  },
  clientDetailsContainer: {
    padding: theme.spacing.unit * 2
  },
  avatar: {
    marginRight: 20,
    backgroundColor: '#0091ea'
  },
  toolbar: theme.mixins.toolbar,
  header: {
    fontSize: theme.spacing.unit * 2.5,
    marginBottom: 0
  },
  section: {
    padding: theme.spacing.unit * 2
  },
  sectionHeader: {
    fontWeight: 500,
    color: theme.palette.grey[800]
  },
  closeInfo: {
    marginLeft: '2rem'
  },
  editIcon: {
    marginRight: theme.spacing.unit
  }
});

class ClientInformation extends Component {
  state = {
    editClientDialogOpened: false
  };

  openEditClientDialogHandler = () => {
    this.setState({ editClientDialogOpened: true });
  };

  closeEditClientDialogHandler = () => {
    this.setState({ editClientDialogOpened: false });
  };

  render() {
    const { classes, client, isOpened, closed } = this.props;

    const { editClientDialogOpened } = this.state;

    const { fname, lname, gender, birthdate, date_added, last_opened } = client;

    const clientName = fname + ' ' + lname;

    return (
      <div>
        <CssBaseline />
        <Drawer
          className={classes.drawer}
          classes={{ paper: classes.drawerPaper }}
          anchor="right"
          open={isOpened}
          onClose={closed}
          variant="persistent"
        >
          <div className={classes.toolbar} />
          <div className={classes.drawerHeader}>
            <div className={classes.infoHeader}>
              <Avatar className={classes.avatar}>
                <PersonIcon />
              </Avatar>
              <Typography className={classes.header}>{clientName}</Typography>
            </div>
            <IconButton
              className={classes.closeInfo}
              component="span"
              onClick={closed}
            >
              <CloseIcon />
            </IconButton>
          </div>
          <Divider />
          <div className={classes.section}>
            <Typography className={classes.sectionHeader}>
              Personal Information
            </Typography>
          </div>
          <Divider />
          <Grid container className={classes.clientDetailsContainer}>
            <ClientInformationField
              gutters={true}
              label="First name"
              value={fname}
            />
            <ClientInformationField
              gutters={true}
              label="Last name"
              value={lname}
            />
            <ClientInformationField
              gutters={true}
              label="Gender"
              value={gender === 'M' ? 'Male' : 'Female'}
            />
            <ClientInformationField
              gutters={true}
              label="Birthdate"
              value={
                <Moment format="MMM D, YYYY" withTitle>
                  {birthdate}
                </Moment>
              }
            />
            <Grid item xs={12} align="left">
              {/* <IconButton onClick={this.openEditClientDialogHandler}>
                <EditIcon fontSize="small" />
              </IconButton> */}
              <Button
                color="primary"
                variant="outlined"
                aria-label="Edit"
                onClick={this.openEditClientDialogHandler}
              >
                <Icon fontSize="small" className={classes.editIcon}>
                  edit_icon
                </Icon>
                Edit
              </Button>
            </Grid>
          </Grid>
          <Divider />
          <div className={classes.section}>
            <Typography className={classes.sectionHeader}>
              Other Information
            </Typography>
          </div>
          <Divider />
          <Grid container className={classes.clientDetailsContainer}>
            <ClientInformationField
              gutters={true}
              label="Date added"
              value={
                <Moment format="MMM D, YYYY" withTitle>
                  {date_added}
                </Moment>
              }
            />
            <ClientInformationField
              gutters={true}
              label="Last opened"
              value={
                <Moment format="MMM D, YYYY" withTitle>
                  {last_opened}
                </Moment>
              }
            />
          </Grid>
          <EditClientDialog
            opened={editClientDialogOpened}
            closed={this.closeEditClientDialogHandler}
            client={client}
          />
        </Drawer>
      </div>
    );
  }
}

export default withStyles(styles)(ClientInformation);
