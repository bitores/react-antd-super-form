const filter = function (fieldsValue) {
  let formValues = {};
  const values = {
    ...fieldsValue
  };
  // 移除空的字段
  Object.keys(values).forEach(key => {
    let val = values[key];
    if (Object.prototype.toString.call(val) !== "[object Undefined]" && val !== '') {
      formValues[key] = val;
    }
  });
  return formValues;
}


export { filter };