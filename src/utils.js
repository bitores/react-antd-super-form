let toString = Object.prototype.toString;

const filter = function (fieldsValue) {
  const ret = {};
  let formValues = {};
  const values = {
    ...fieldsValue
  };
  // 移除空的字段
  Object.keys(values).forEach(key => {
    let val = values[key];
    if (toString.call(val) !== "[object Undefined]" && val !== '') {
      if (toString.call(val) == "[object String]") {
        val = val.trim();
        if (val !== '') {
          formValues[key] = val;
        }

      } else {
        formValues[key] = val;
      }

    }
  });

  Object.keys(formValues).map(key => {
    if (!key.includes(',')) ret[key] = formValues[key]
  })

  return ret;
}

const transToArray = (obj) => {
  if (toString.call(obj) === '[object Object]') {
    return Object.keys(obj).map(key => {
      return { label: obj[key], value: key }
    })
  } else if (toString.call(obj) === '[object Array]') {
    return obj;
  }

  throw new Error('need obj or array')
}


export { filter, transToArray, toString };