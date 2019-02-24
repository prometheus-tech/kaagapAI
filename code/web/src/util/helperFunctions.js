export function camelize(str) {
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function(letter, index) {
      return index === 0 ? letter.toLowerCase() : letter.toUpperCase();
    })
    .replace(/\s+/g, '');
}

export function toPronounCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function getInitials(firstName, lastName) {
  return firstName.charAt(0) + lastName.charAt(0);
}