import React from 'react';

import Auxilliary from '../../../hoc/Auxilliary/Auxilliary';
import IconButton from '@material-ui/core/IconButton';
import ArrowUpward from '@material-ui/icons/ArrowUpward';
import ArrowDownward from '@material-ui/icons/ArrowDownward';

const getNewSortOrder = order => {
  return order === 'desc' ? 'asc' : 'desc';
};

function SortOrder(props) {
  const icon = props.order === 'asc' ? <ArrowUpward /> : <ArrowDownward />;

  return (
    <Auxilliary>
      <IconButton
        onClick={() => props.orderChanged(getNewSortOrder(props.order))}
      >
        {icon}
      </IconButton>
    </Auxilliary>
  );
}

export default SortOrder;
