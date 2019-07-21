const events = ['onClick', 'onChange', 'onBlur', 'onFocus', 'onHoverChange', 'onKeyDown', 'onSelect', 'onOk', 'onPressEnter'];

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
