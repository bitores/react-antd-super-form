export const withOptions = ['select', 'radio', 'checkbox', 'radiobutton'];
export default ({ type, options }) => {
  return {
    visible: withOptions.indexOf(type) > -1,
    label: '子选项目',
    type: 'select',
    key: 'options',
    placeholder: '请配置选项内容',
    options,
    config: {
      rules: [
        { required: true }
      ]
    }
  }
}