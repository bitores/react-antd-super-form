// initialValue 默认与 value 关联, 但此函数处理 非 Value 关联
export default ({ type, form }) => {
  let ret = {
    visible: false,
    type: 'hidden',
    key: 'config.valuePropName',
  };
  switch (type) {
    case 'switch': {
      ret.visible = true;
      ret.config = { initialValue: 'checked' };
    } break;
    case 'upload': {
      ret.visible = true;
      ret.config = { initialValue: 'fileList' };
    } break;

  }
  return ret;
}