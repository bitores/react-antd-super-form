export default ({ type }) => {
  return [
    {
      visible: type === 'switch',
      label: '设置触发状态',
      type: 'group',
      formItemLayout: {
        style: {
          marginBottom: 0
        }
      },
      children: [
        {
          type: 'input',
          key: 'checkedChildren',
          placeholder: 'checkedChildren, 开',
          formItemLayout: { style: { display: 'inline-block', width: 150 } },
          config: {
            initialValue: '开'
          }
        },
        {
          type: 'input',
          key: 'unCheckedChildren',
          placeholder: 'unCheckedChildren, 关',
          formItemLayout: { style: { display: 'inline-block', width: 150, marginLeft: 10 } },
          config: {
            initialValue: '关'
          }
        },
      ]
    }
  ]
}