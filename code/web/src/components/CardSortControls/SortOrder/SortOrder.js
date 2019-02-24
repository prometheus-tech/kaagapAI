import React from 'react';

import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Tooltip from '@material-ui/core/Tooltip';

function SortOrder(props) {
  const icon = props.order === 'asc' ? <ArrowUpward /> : <ArrowDownward />;

  const otherOrder = props.order === 'asc' ? 'desc' : 'asc';

  return (
    <Auxilliary>
      <Tooltip title="Reverse sort direction">
        <IconButton onClick={() => props.orderChanged(otherOrder)}>
          {icon}
        </IconButton>
      </Tooltip>
    </Auxilliary>
  );
}

export default SortOrder;
