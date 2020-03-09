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


function diff(o, n) { // for Array & Object
  // 如果类型不一样， n 为全新
  const dType = toString.call(n);
  if (dType !== toString.call(o)) return n;
  let diffData = undefined;
  switch (dType) {
    case "[object Number]":
    case "[object String]":
    case "[object Boolean]": {
      if (o !== n) diffData = n;
    }
      ; break;
    case "[object Array]": {
      if (o.length !== n.length) diffData = n;
      else {
        let r = o.reduce((total, item, i) => {
          let r = diff(item, n[i]);
          if (r !== undefined) {
            total.push(n[i])
          };
          return total;
        }, [])
        if (r.length > 0) diffData = n;

      }
    }
      ; break;
    case "[object Object]": {
      let keys = Object.keys(n);
      if (keys.length !== Object.keys(o).length) diffData = n;
      else {
        let r = keys.reduce((total, key) => {
          let r = diff(o[key], n[key]);
          if (r !== undefined) {
            return {

              ...total,

              [key]: n[key]

            }
          }

          return total
        }, undefined)



        if (r !== undefined) { diffData = r; }
      }


    }; break;
  }

  return diffData
}


export { filter, transToArray, toString, diff, }