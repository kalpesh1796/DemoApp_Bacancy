import moment from "moment";

export const dateFormat = (date) => {
  const cDate = moment(date, "MMM DD YYYY HH:mm:ss");
  const diff = moment().diff(cDate, "days");
  if (diff >= 0) {
    return cDate.format("MMM DD YYYY");
  } else {
    return cDate.fromNow();
  }
};