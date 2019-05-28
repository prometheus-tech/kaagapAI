import React from 'react';

import { withStyles } from '@material-ui/core/styles';

import { Link as RouterLink } from 'react-router-dom';

import Breadcrumbs from '@material-ui/lab/Breadcrumbs';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import FolderIcon from '@material-ui/icons/Folder';
import Icon from '@material-ui/core/Icon';

import { getSessionDocumentIcon } from '../../../util/helperFunctions';

const styles = theme => ({
  root: {
    padding: theme.spacing.unit
  },
  avatar: {
    background: 'none',
    marginRight: -16,
    textAlign: 'center'
  }
});

const StyledBreadcrumb = withStyles(theme => ({
  root: {
    backgroundColor: theme.palette.grey[100],
    height: 24,
    color: theme.palette.grey[800],
    fontWeight: theme.typography.fontWeightRegular,
    '&:hover, &:focus': {
      backgroundColor: theme.palette.grey[300]
    },
    '&:active': {
      boxShadow: theme.shadows[1],
      backgroundColor: emphasize(theme.palette.grey[300], 0.12)
    }
  }
}))(Chip);

function FileBreadcrumb({
  classes,
  breadcrumbData,
  type,
  pageTabValueChanged
}) {
  const extensionType = breadcrumbData[1].label.split('.')[1];

  const avatarIconClass = getSessionDocumentIcon(extensionType).avatarIconClass;
  const iconColor = getSessionDocumentIcon(extensionType).iconColor;

  return (
    <Breadcrumbs>
      {type === 'sessions' ? (
        <StyledBreadcrumb
          label={breadcrumbData[0].label}
          component={RouterLink}
          to={breadcrumbData[1].to}
          avatar={
            <Avatar className={classes.avatar}>
              <FolderIcon />
            </Avatar>
          }
        />
      ) : null}
      <StyledBreadcrumb
        label={breadcrumbData[1].label}
        onClick={e => {
          pageTabValueChanged(e, 0);
        }}
        avatar={
          <Avatar className={classes.avatar}>
            <Icon
              className={avatarIconClass}
              style={{ color: iconColor, fontSize: '16px' }}
            />
          </Avatar>
        }
      />
    </Breadcrumbs>
  );
}

export default withStyles(styles)(FileBreadcrumb);
