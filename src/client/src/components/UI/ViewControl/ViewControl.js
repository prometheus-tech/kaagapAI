import React from 'react';

import { toPronounCase } from '../../../util/helperFunctions';

import IconButton from '@material-ui/core/IconButton';
import ViewList from '@material-ui/icons/ViewList';
import ViewModule from '@material-ui/icons/ViewModule';
import Tooltip from '@material-ui/core/Tooltip';

function ViewControl(props) {
  const { view, viewChanged } = props;

  const icon = view === 'list' ? <ViewModule /> : <ViewList />;

  const otherView = view === 'list' ? 'card' : 'list';

  return (
    <Tooltip title={toPronounCase(otherView) + ' view'}>
      <IconButton
        onClick={() => {
          viewChanged(otherView);
        }}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
}

export default ViewControl;
