export const parseDateObjtoBirthdayFormat = (dateObj) => {
  if (!dateObj || !(dateObj instanceof Date)) {
    return "";
  }
  const dateStr = dateObj.toLocaleDateString("en-GB", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });
  const splitStr = dateStr.split("/");
  const reversed = splitStr.reverse();
  return reversed.join("-");
};

export const parseData = (data, dateRange) => {
  const output = {};
  const filteredData = filterDataByDateRange(data, dateRange);
  filteredData.forEach((e) => {
    if (output.hasOwnProperty(e.country)) {
      output[e.country].push(e);
    } else {
      output[e.country] = [e];
    }
  });
  return output;
};

export const filterDataByDateRange = (data, dateRange) => {
  return data.filter((e) => inDateRange(e, dateRange));
};

const inDateRange = (elem, dateRange) => {
  const { from, till } = dateRange;
  let inRange = true;
  let elemDate;
  try {
    elemDate = new Date(elem.birthday);
  } catch (error) {
    //elemDate in unexpected format
    return false;
  }
  if (from && !isNaN(from.getDate())) {
    inRange = inRange && from.getTime() <= elemDate.getTime();
  }
  if (till && !isNaN(till.getDate())) {
    inRange = inRange && till.getTime() >= elemDate.getTime();
  }
  return inRange;
};
