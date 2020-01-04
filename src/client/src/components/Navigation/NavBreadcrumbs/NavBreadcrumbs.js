import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import { Link as RouterLink } from 'react-router-dom';

import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';

const styles = theme => ({
  breadcrumbLinkButton: {
    fontSize: theme.spacing.unit * 2,
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
    padding: '5px 15px 5px 15px',
    borderRadius: '50px',
    '&:hover': {
      backgroundColor: grey[300]
    }
  },
  currentBreadcrumbItem: {
    fontSize: theme.spacing.unit * 2,
    display: 'flex',
    alignItems: 'center',
    fontWeight: '500',
    borderRadius: '50px',
    padding: '5px 15px 5px 15px',
    color: 'black'
  }
});

function NavBreadcrumbs({ classes, breadcrumbData }) {
  return (
    <Breadcrumbs separator={<NavigateNextIcon />}>
      {breadcrumbData.map((breadcrumbItem, index) => {
        if (index < breadcrumbData.length - 1) {
          return (
            <ButtonBase
              key={index}
              component={RouterLink}
              color="inherit"
              to={breadcrumbItem.path}
              className={classes.breadcrumbLinkButton}
            >
              {breadcrumbItem.icon} {breadcrumbItem.label}
            </ButtonBase>
          );
        } else {
          return (
            <Typography key={index} className={classes.currentBreadcrumbItem}>
              {breadcrumbItem.icon} {breadcrumbItem.label}
            </Typography>
          );
        }
      })}
    </Breadcrumbs>
  );
}

export default withStyles(styles)(NavBreadcrumbs);
