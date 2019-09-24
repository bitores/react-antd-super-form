
export default ({ type }) => {

  return [
    {
      visible: type === "button",
      label: '按钮文案',
      type: 'input',
      key: 'text',
      config: {
        rules: [
          {
            required: true,
            message: '请输入'
          }
        ]
      },
      placeholder: '请输入'
    },

    {
      visible: type === "button",
      label: '按钮样式',
      type: 'group',
      formItemLayout: {
        style: {
          marginBottom: 0
        }
      },
      children: [
        {
          type: 'select',
          key: 'buttonType',
          config: {
            initialValue: ''
          },
          options: {
            '': '默认',
            'primary': "primary",
            'dashed': "dashed",
            'danger': "danger",
            'link': "link",

          },
          formItemLayout: { style: { display: 'inline-block' } },
        },
        {
          type: 'select',
          key: 'size',
          config: {
            initialValue: 'default'
          },
          options: {
            'default': "默认",
            'large': "large",
            'small': "small",
          },
          formItemLayout: { style: { display: 'inline-block', marginLeft: 10 } },
        },
        {
          type: 'select',
          key: 'shape',
          options: {
            'circle': "circle",
            'round': "round",
          },
          formItemLayout: { style: { display: 'inline-block', minWidth: 50, marginLeft: 10 } },
        },
      ]
    }

  ]

}