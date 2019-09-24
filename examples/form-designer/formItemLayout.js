export default ({ type }) => {
  return {
    label: '样式', // formItemLayout
    type: 'group',
    formItemLayout: {
      style: {
        marginBottom: 0
      }
    },
    children: [
      {
        label: 'display',
        type: 'select',
        key: 'formItemLayout.style.display',
        options: [
          { label: '默认', value: '' },
          { label: 'none', value: 'none' },
          { label: 'block', value: 'block' },
          { label: 'inline', value: 'inline' },
          { label: 'inline-block', value: 'inline-block' },
          { label: 'flex', value: 'flex' },
        ],
        config: {
          initialValue: ''
        },
        formItemLayout: { style: { display: 'inline-block', marginLeft: 10 } },
      },
      {
        label: 'width',
        type: 'inputnumber',
        key: 'formItemLayout.style.width',
        formItemLayout: { style: { display: 'inline-block', marginLeft: 10 } },
      },
      {
        label: 'height',
        type: 'inputnumber',
        key: 'formItemLayout.style.height',
        formItemLayout: { style: { display: 'inline-block', marginLeft: 10 } },
      },
      {
        label: 'marginLeft',
        type: 'inputnumber',
        key: 'formItemLayout.style.margin-left',
        formItemLayout: { style: { display: 'inline-block', marginLeft: 10 } },
      },
      {
        label: 'marginRight',
        type: 'inputnumber',
        key: 'formItemLayout.style.margin-right',
        formItemLayout: { style: { display: 'inline-block', marginLeft: 10 } },
      },
      {
        label: 'marginTop',
        type: 'inputnumber',
        key: 'formItemLayout.style.margin-top',
        formItemLayout: { style: { display: 'inline-block', marginLeft: 10 } },
      },
      {
        label: 'marginBottom',
        type: 'inputnumber',
        key: 'formItemLayout.style.margin-bottom',
        formItemLayout: { style: { display: 'inline-block', marginLeft: 10 } },
      },
    ]
  }
}