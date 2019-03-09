import React from 'react';

import CLIENT_BASIC_INFO from '../../../graphql/fragments/clientBasicInfo';
import { ApolloConsumer } from 'react-apollo';

import Modal from '@material-ui/core/Modal';
import EditClientForm from './EditClientForm/EditClientForm';

function EditClientModal(props) {
  const { isOpened, clientId, closed } = props;

  return (
    <ApolloConsumer>
      {client => {
        const clientData = client.readFragment({
          fragment: CLIENT_BASIC_INFO,
          id: clientId
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