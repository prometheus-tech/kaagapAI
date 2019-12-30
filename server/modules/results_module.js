const getDocumentTalkTurns = documents => {
  let documentTalkTurns = [];

  // Remove consecutive newlines
  for (let i = 0; i < documents.length; i++) {
    const documentWithoutConsecutiveSpaces = documents[i].content.replace(
      /[\r\n]+/g,
      '\n'
    );

    documentTalkTurns.push({
      ...documents[i],
      formattedContent: [...documentWithoutConsecutiveSpaces.split(/\n/)] // Array of talkturns (an element is a paragraph)
    });
  }

  return documentTalkTurns;
};

const searchMatchingTalkTurnsFromDocuments = (documents, keyword) => {
  let matchingDocuments = [];
  let matchingTalkTurns = [];

  for (let i = 0; i < documents.length; i++) {
    for (let j = 0; j < documents[i].formattedContent.length; j++) {
      const regexString = '(^|[\\s\\W])(' + keyword + ')([\\s\\W]|$)';
      const matchRegex = new RegExp(regexString, 'gi');

      const matches = matchRegex.exec(documents[i].formattedContent[j]);

      if (matches != null) {
        matchingTalkTurns.push(documents[i].formattedContent[j].trim());
      }
    }

    if (matchingTalkTurns.length > 0) {
      matchingDocuments.push({ ...documents[i], matchingTalkTurns });
    }

    matchingTalkTurns = [];
  }

  return matchingDocuments;
};

module.exports = {
  getDocumentTalkTurns,
  searchMatchingTalkTurnsFromDocuments
};
