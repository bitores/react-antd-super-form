// 这里处理不需要 key 值的 元素
const withoutKey = ['button', 'br', 'span'];
export default ({ type }) => {
  return {
    visible: withoutKey.indexOf(type) === -1,
    label: '组件字段',
    type: 'input',
    key: 'key',
    placeholder: '请输入如: key',
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