
// 切换类型时, 对 form resetField 可避免 初始值类型无法相互转化的问题
export default ({ type, form, options }) => {

  let ret = {
    visible: false,
    label: '初始值',
    key: 'config.initialValue',
    placeholder: '设置初始值',
  };
  switch (type) {
    case 'datepicker':
    case 'monthpicker':
    case 'weekpicker':
    case 'timepicker':
    case 'switch':
    case 'input':
    case 'inputnumber': {
      ret.visible = true;
      ret.type = type;
    }
      break;
    case 'rangepicker': {
      ret.visible = true;
      ret.type = type;
      ret.placeholder = ['开始', '结束'];
    }
      break;
    case 'select':
    case 'radio':
    case 'radiobutton': {
      ret.visible = true;
      ret.type = 'select';
      ret.options = options;
    }
      break;
    case 'checkbox': {
      ret.visible = true;
      ret.type = 'select';
      ret.options = options;
      ret.mode = 'multiple';

    } break;
  }

  return ret;
}

