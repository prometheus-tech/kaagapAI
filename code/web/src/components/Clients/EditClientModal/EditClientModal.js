import React from 'react';

import { CLIENT_BASIC_INFO_FRAGMENT } from '../../../fragments/fragments';
import { ApolloConsumer } from 'react-apollo';

import Modal from '@material-ui/core/Modal';
import EditClientForm from './EditClientForm/EditClientForm';

function EditClientModal(props) {
  const { isOpened, clientId, closed } = props;

  const c_id = parseInt(clientId);

  return (
    <ApolloConsumer>
      {client => {
        const clientData = client.readFragment({
          fragment: CLIENT_BASIC_INFO_FRAGMENT,
          id: c_id
        });

        return (
          <Modal open={isOpened}>
            <EditClientForm closed={closed} client={clientData} />
          </Modal>
        );
      }}
    </ApolloConsumer>
  );
}

export default EditClientModal;
