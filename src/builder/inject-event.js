const events = ['onClick', 'onChange', 'onBlur', 'onFocus', 'onOk', 'onPressEnter'];

export default (obj, form) => {
  const newObj = {
    ...obj
  }

  events.forEach((item) => {
    if (obj[item]) {
      newObj[item] = (...props) => obj[item](...props, form)
    }
  })

  return newObj;
}
