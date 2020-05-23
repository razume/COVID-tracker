export const formatDate = (date) => {
  return `${date.getFullYear()}-${
    date.getMonth() < 9 ? "0" + (date.getMonth() + 1) : date.getMonth() + 1
  }-${date.getDate < 9 ? "0" + date.getDate() : date.getDate()}
          `;
};

export const formatDateSmall = (date) => {
  return `${date[5]}${date[6]}/${date[8]}${date[9]}`;
};

export const alphabetical = (a, b) => {
  const countryA = a.Country.toUpperCase();
  const countryB = b.Country.toUpperCase();
  if (countryA < countryB) {
    return -1;
  }
  if (countryA > countryB) {
    return 1;
  }

  return 0;
};
