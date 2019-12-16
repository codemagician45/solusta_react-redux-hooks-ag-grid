// convert Object to Array
export const objectToArray = (obj) => {
  return Object.keys(obj).map((key, index) => {
    return obj[key];
  });
};

// convert Array to Object
export const arrayToObject = (arr) => {
  const returnObj = {};
  arr.map((item, index) => {
    returnObj[item.id] = item;
  });
  return returnObj;
}

// Convert image file content to base64
export const toBase64 = file => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result);
  reader.onerror = error => reject(error);
});
