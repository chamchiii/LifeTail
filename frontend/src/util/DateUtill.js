const dateToStringYMD = (dateParma) => {
  const date = new Date(dateParma);
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();

  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}.${month}.${day}`;
};

export { dateToStringYMD };
