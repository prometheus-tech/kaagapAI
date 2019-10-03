import React from 'react';

import AppearanceDocument from './AppearanceDocument/AppearanceDocument';

function TextAppearance({ text, textAppearance, type, pageTabValueChanged }) {
  return textAppearance.appearance_documents.map(appearanceDocument => (
    <AppearanceDocument
      key={appearanceDocument.appearance_document_id}
      text={text}
      sessionId={textAppearance.session_id}
      sessionName={textAppearance.session_name}
      appearanceDocument={appearanceDocument}
      type={type}
      pageTabValueChanged={pageTabValueChanged}
    />
  ));
}

export default TextAppearance;
