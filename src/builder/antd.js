import {
  Input,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Cascader,
  Icon,
  Rate,
  Checkbox,
  DatePicker
} from 'antd';

export default {
  // 类一
  'input': Input,
  'number': InputNumber,
  'textarea': Input.TextArea,
  'password': Input.Password,
  slider: Slider,
  switch: Switch,
  datepicker: DatePicker,
  rangepicker: DatePicker.RangePicker,

  // 类二
  button: Button,

  // 类三
  select: Select,
  radio: Radio,
  'radio.button': Radio,
  checkbox: Checkbox,

  // 类四
  upload: Upload,
  cascader: Cascader
}
