/** Checks the mail for validity  */
// eslint-disable-next-line import/prefer-default-export
export const isEmail = (email: string) => {
  /** Check for the existence of the '@' character in the string */
  const atIndex = email.indexOf("@");
  if (atIndex === -1) {
    return false;
  }

  /** Check for the existence of the '.' character after the '@' character */
  const dotIndex = email.indexOf(".", atIndex);
  if (dotIndex === -1 || dotIndex === atIndex + 1) {
    return false;
  }

  /** Check that the domain part has at least one character */
  const domain = email.substring(dotIndex + 1);
  if (domain.length === 0) {
    return false;
  }

  /** If all checks are successful, the address is valid */
  return true;
};
