import {
  Input,
  Select,
  InputNumber,
  Switch,
  Radio,
  Slider,
  Button,
  Upload,
  Icon,
  Rate,
  Checkbox,
  DatePicker
} from 'antd';

export default {
  // 类一
  input: Input,
  number: InputNumber,
  slider: Slider,
  switch: Switch,
  textarea: Input.TextArea,
  datepicker: DatePicker,
  rangepicker: DatePicker.RangePicker,

  // 类二
  button: Button,
  searchbutton: Button,

  // 类三
  select: Select,
  radio: Radio,
  radiobutton: Radio,
  checkbox: Checkbox,

  // 类四
  upload: Upload
}
