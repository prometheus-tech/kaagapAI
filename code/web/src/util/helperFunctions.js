import grey from '@material-ui/core/colors/grey';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

import { AUTH_TOKEN } from './constants';

export function logout(client) {
  localStorage.removeItem(AUTH_TOKEN);
  client.resetStore();
}

export function trimAll(string) {
  return string.replace(/\s\s+/g, ' ').trim();
}

export function getInitials(firstName, lastName) {
  return firstName.charAt(0) + lastName.charAt(0);
}

export function toPronounCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getUTCDate(date) {
  let month = '' + (date.getMonth() + 1);
  let day = '' + date.getDate();
  const year = date.getFullYear();

  if (month.length < 2) {
    month = '0' + month;
  }
  if (day.length < 2) {
    day = '0' + day;
  }

  return [year, month, day].join('-');
}

export function toHumanFileSize(size) {
  const i = Math.floor(Math.log(size) / Math.log(1024));
  return (
    (size / Math.pow(1024, i)).toFixed(2) * 1 +
    ' ' +
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  );
}

export function getSessionDocumentIcon(type) {
  let avatarIconClass = '';
  let iconColor = '';

  if (type.includes('pdf') || type === 'pdf') {
    avatarIconClass = 'fas fa-file-pdf';
    iconColor = red[600];
  } else if (type.includes('text') || type === 'txt') {
    avatarIconClass = 'fas fa-file-alt';
    iconColor = grey[600];
  } else if (type.includes('word') || type === 'doc' || type === 'docx') {
    avatarIconClass = 'fas fa-file-word';
    iconColor = blue[700];
  } else if (type.includes('audio') || type === 'wav') {
    avatarIconClass = 'fas fa-file-audio';
    iconColor = green[300];
  } else {
    avatarIconClass = 'fas fa-file-alt';
    iconColor = 'black';
  }

  return {
    avatarIconClass,
    iconColor
  };
}

export function getDocumentTalkTurns(documents) {
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
}

export function searchMatchingTalkTurnsFromDocuments(documents, keyword) {
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
}
