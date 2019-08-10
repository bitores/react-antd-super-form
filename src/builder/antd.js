import {
  Input,
  InputNumber,
  Select,
  Mentions,

  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Cascader,
  Icon,
  Rate,
  Checkbox,
  DatePicker,
  TimePicker,
  AutoComplete,
  Steps
} from 'antd';

// import Func from './Func';
// import WrapperInput from './WrapperInput';
// import WrapperSwitch from './WrapperSwitch';
// import WrapperUpload from './WrapperUpload';

export default {
  // 类一
  input: Input,
  inputnumber: InputNumber,
  'textarea': Input.TextArea,
  'password': Input.Password,
  cascader: Cascader,
  autocomplete: AutoComplete,
  rate: Rate,
  slider: Slider,
  switch: Switch,
  datepicker: DatePicker,
  rangepicker: DatePicker.RangePicker,
  monthpicker: DatePicker.MonthPicker,
  weekpicker: DatePicker.WeekPicker,
  timepicker: TimePicker,

  // 类二
  button: Button,

  // 类三
  select: Select,
  mentions: Mentions,
  radio: Radio.Group,
  radiogroup: Radio.Group,
  radiobutton: Radio,
  checkbox: Checkbox.Group,
  checkboxgroup: Checkbox.Group,

  //
  steps: Steps,

  // 类四
  upload: Upload,
  uploaddragger: Upload.Dragger,

  // 自定义
  // func: Func,
  // switch2: WrapperSwitch,
  // wrapperinput: WrapperInput,
  // wrapperupload: WrapperUpload,
}
