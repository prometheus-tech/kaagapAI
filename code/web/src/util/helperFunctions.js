export function getInitials(firstName, lastName) {
  return firstName.charAt(0) + lastName.charAt(0);
}

export function toPronounCase(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
