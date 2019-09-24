const withoutLabel = ['button', 'br'];
export default ({ type }) => {
  return {
    visible: withoutLabel.indexOf(type) === -1,
    label: '组件标签',
    type: 'input',
    key: 'label',
    placeholder: '请输入如: 标签',
    config: {
      rules: [
        {
          required: true,
          message: '请输入'
        }
      ]
    }
  }
}