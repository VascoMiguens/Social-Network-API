module.exports = {
  format_date: (date) => {
    const momentDate = moment(date);
    return momentDate.format("MMMM Do YYYY, h:mm:ss a");
  },
};
