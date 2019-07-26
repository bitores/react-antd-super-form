const filter = function (fieldsValue) {
  const ret = {};
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


  Object.keys(formValues).map(key => {
    if (!key.includes(',')) ret[key] = formValues[key]
  })

  return ret;
}

export { filter };