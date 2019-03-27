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
