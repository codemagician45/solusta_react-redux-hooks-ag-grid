export const objectToArray = (obj) => {
  return Object.keys(obj).map((key, index) => {
    return obj[key];
  });
};

export const arrayToObject = (arr) => {
  const returnObj = {};
  arr.map((item, index) => {
    returnObj[item.id] = item;
  });
  return returnObj;
}
