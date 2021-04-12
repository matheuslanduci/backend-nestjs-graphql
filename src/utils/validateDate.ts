// Validation taken from https://github.com/excitement-engineer/graphql-iso-date

// Explanation: https://github.com/excitement-engineer/graphql-iso-date/blob/461125713024ded17c092a2ce7ce48e6f7112d65/src/utils/validator.js

function leapYear(year: number): boolean {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

export function validateDate(dateString: string): boolean {
  const RFC_3339_REGEX = /^(\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]))$/;

  if (!RFC_3339_REGEX.test(dateString)) {
    return false;
  }

  const year = Number(dateString.substr(0, 4));
  const month = Number(dateString.substr(5, 2));
  const day = Number(dateString.substr(8, 2));

  switch (month) {
    case 2:
      if (leapYear(year) && day > 29) {
        return false;
      } else if (!leapYear(year) && day > 28) {
        return false;
      }
      return true;
    case 4:
    case 6:
    case 9:
    case 11:
      if (day > 30) {
        return false;
      }
      break;
  }

  return true;
}
