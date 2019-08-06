const _cache = {
  input: {
    onChange: ['e', 'form'],
    onPressEnter: ['e', 'form'],
  },
  button: {
    onClick: ['e', 'form']
  },
  select: {
    onChange: ['value', 'options', 'form'],
    onSelect: ['value', 'form'],
    onSearch: ['value', 'options', 'form'],
  }
}
export default ({ type, form, options, bindSearch = false }) => {
  return {
    visible: bindSearch == false && Object.keys(_cache).indexOf(type) > -1,
    label: '事件',
    type: 'group',
    formItemLayout: {
      style: {
        marginBottom: 0
      }
    },
    children: [
      {
        placeholder: '函数名称',
        type: 'select',
        key: 'eventName',
        formItemLayout: {
          style: {
            display: 'inline-block',
            width: 100
          }
        },
        options: [
          { label: '不设置', value: '' },
          ...Object.keys(_cache[type] || {}).map(item => {
            return { label: item, value: item }
          })
        ],
        config: {
          initialValue: ''
        },
        onChange: (value, option, form) => {
          if (!!value == false) {
            form.setFieldsValue({
              eventParams: [],
              eventBody: "",
              eventPrivate: false,
            })
          } else {

            form.setFieldsValue({
              eventParams: _cache[type][value] || [],
              eventBody: "",
              eventPrivate: false,
            })
          }

        }
      },
      {
        placeholder: '函数参数,以逗号隔开',
        type: 'select',
        key: 'params',
        mode: 'tags',
        disabled: true,
        tokenSeparators: [','],
        key: 'eventParams',
        formItemLayout: {
          style: {
            display: 'inline-block',
            width: 200,
            marginLeft: 10
          }
        },
      },
      {
        type: 'switch',
        key: 'eventPrivate',
        checkedChildren: '公有',
        unCheckedChildren: '私有',
        config: {
          initialValue: false,
          valuePropName: 'checked'
        },
        formItemLayout: { style: { display: 'inline-block', marginLeft: 10 } },
      },
      {
        visible: !!form.getFieldValue("eventPrivate") == false,
        placeholder: '请输入函数体',
        type: 'textarea',
        key: 'eventBody',
        autosize: {
          minRows: 10,
          maxRows: 100
        }
      },
      {
        visible: !!form.getFieldValue("eventPrivate") == true,
        type: 'select',
        key: 'eventPublicName',
        placeholder: '请选择公共事件的处理函数',
        options
      },
    ]
  }
}