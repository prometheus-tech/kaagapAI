import React, { Component } from 'react';

import EDIT_SESSION_DOCUMENT from '../../../graphql/mutations/editSessionDocument';
import { Mutation } from 'react-apollo';

import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';

import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import Button from '@material-ui/core/Button';

class RenameSessionDocumentDialog extends Component {
  constructor(props) {
    super(props);

    const {
      sd_id,
      file_name,
      date_added,
      type,
      content
    } = props.sessionDocument;

    const fileNameDestructured = file_name.split('.');

    this.state = {
      sd_id,
      file_name: fileNameDestructured[0],
      date_added,
      type,
      content,
      file_name_extension: fileNameDestructured[1]
    };

    this.inputChangeHandler = this.inputChangeHandler.bind(this);
  }

  componentWillReceiveProps({
    sessionDocument: { sd_id, file_name, date_added, type, content }
  }) {
    const fileNameDestructured = file_name.split('.');

    this.setState({
      sd_id,
      file_name: fileNameDestructured[0],
      date_added,
      type,
      content,
      file_name_extension: fileNameDestructured[1]
    });
  }

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { opened, closed, selectedSessionDocumentUpdated } = this.props;

    const {
      sd_id,
      file_name,
      date_added,
      type,
      content,
      file_name_extension
    } = this.state;

    const updatedSessionDocument = {
      sd_id: sd_id,
      file_name: file_name.trim() + '.' + file_name_extension.trim(),
      date_added: date_added,
      type: type,
      content: content
    };

    return (
      <Mutation
        mutation={EDIT_SESSION_DOCUMENT}
        optimisticResponse={{
          __typename: 'Mutation',
          editSessionDocument: {
            __typename: 'SessionDocument',
            ...updatedSessionDocument
          }
        }}
      >
        {editSessionDocument => {
          return (
            <Dialog open={opened} onClose={closed} maxWidth="xs" fullWidth>
              <ValidatorForm
                onSubmit={() => {
                  editSessionDocument({
                    variables: {
                      sd_id,
                      file_name:
                        file_name.trim() + '.' + file_name_extension.trim(),
                      content
                    }
                  });

                  selectedSessionDocumentUpdated({
                    ...updatedSessionDocument
                  });

                  closed();
                }}
              >
                <DialogTitle>Rename Document</DialogTitle>
                <DialogContent>
                  <TextValidator
                    value={file_name}
                    variant="outlined"
                    fullWidth
                    name="file_name"
                    onChange={this.inputChangeHandler}
                    margin="dense"
                    validators={['required', 'trim', 'maxStringLength:' + 100]}
                    errorMessages={[
                      'This field is required',
                      'This field must contain at least one non-whitespace character',
                      'File name must not exceed 100 characters'
                    ]}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={closed}>Cancel</Button>
                  <Button type="submit" color="primary">
                    Rename
                  </Button>
                </DialogActions>
              </ValidatorForm>
            </Dialog>
          );
        }}
      </Mutation>
    );
  }
}

export default RenameSessionDocumentDialog;
