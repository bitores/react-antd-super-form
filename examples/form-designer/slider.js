export default ({ type }) => {
  return [
    {
      visible: type === 'slider',
      label: '其它属性',
      type: 'group',
      formItemLayout: {
        style: {
          marginBottom: 0,
          display: 'block'
        }
      },
      children: [
        {
          // type: 'hidden',
          type: 'inputnumber',
          key: 'style.width',
          config: {
            initialValue: 30
          },
          placeholder: '宽',
          formItemLayout: { style: { display: 'inline-block', marginLeft: 10 } },
        },
        {
          type: 'inputnumber',
          key: 'style.height',
          config: {
            initialValue: 30
          },
          placeholder: '高',
          formItemLayout: { style: { display: 'inline-block', marginLeft: 10 } },
        },
        {
          type: 'switch',
          key: 'vertical',
          checkedChildren: '垂直',
          unCheckedChildren: '水平',
          config: {
            initialValue: false,
            valuePropName: 'checked'
          },
          formItemLayout: { style: { display: 'inline-block', marginLeft: 10 } },
        },
        {
          type: 'switch',
          key: 'range',
          checkedChildren: '双滑块',
          unCheckedChildren: '单滑块',
          config: {
            initialValue: false,
            valuePropName: 'checked'
          },
          formItemLayout: { style: { display: 'inline-block', marginLeft: 10 } },
        }
      ]
    }
  ]
}
