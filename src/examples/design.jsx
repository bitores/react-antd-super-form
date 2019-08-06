import React, { Component } from 'react';
import SearchList, { Form, Modal } from '@/components/SuperForm';
// import SearchList, { Form, Modal } from 'react-antd-super-form';
import moment from 'moment';
// import api from '../../services/order';
import initialValue from './form-designer/initialValue';
import valuePropName from './form-designer/valuePropName';
import button from './form-designer/button';
import switchEle from './form-designer/switch';
import slider from './form-designer/slider';
import span from './form-designer/span';
import upload from './form-designer/upload';
import formItemLayout from './form-designer/formItemLayout';
import events from './form-designer/events';

export default class extends Component {

  constructor() {
    super()
    this.state = {
      confirmDirty: false,
      formItems: [],
      columns: [],
      funcLib: {
        clickEventFunc: {
          params: ['e', 'form'],
          body: `return console.log('==', this)`
        }
      },
      optionLib: {
        OrderType: [
          { label: '订单号', value: 1 },
          { label: '手机号', value: 2 },
          { label: '用户名', value: 3 },
        ],
        SearchType: {
          subBizOrderId: '订单号',
          logisticsNo: '运单号',
          receiverName: '收货人姓名'
        },
        OrderStatus: [
          { label: '待付款', value: 1 },
          { label: '待成团', value: 2 },
          { label: '待发货', value: 3 },
          { label: '已发货', value: 4 },
          { label: '已完成', value: 5 },
          { label: '已关闭', value: 6 },
        ]
      },
      _columns: [],
      _options: []
    }
    this.formDialog = React.createRef();
    this.tableDialog = React.createRef();
    this.optionDialog = React.createRef();
    this.funcDialog = React.createRef();
  }

  componentWillMount() {
    let test = localStorage.test;
    if (test) {
      let _state = JSON.parse(test);
      const { columns = [], formItems = [], optionLib = {}, funcLib = {} } = _state;
      formItems.map(item => {
        let type = item.type,
          initialValue = item.config && item.config.initialValue;
        if (['datepicker', 'monthpicker', 'weekpicker', 'timepicker'].indexOf(type) > -1) {
          item.config.initialValue = moment(initialValue)
        } else if (type === 'rangepicker') {
          item.config.initialValue = initialValue.map(i => {
            return moment(i)
          })
        } else if (type === 'switch') {
          item.config.valuePropName = 'checked'
        } else if (type == 'upload') {

        }
      })


      this.setState({
        formItems,
        columns,
        optionLib,
        funcLib
      })
    }
  }

  _storeState() {
    localStorage.test = JSON.stringify(this.state);
  }

  componentWillUnmount() {
    this._storeState()
  }


  _renderFuncDialog() {
    return (<Modal
      ref={this.funcDialog}
      title="添加功能函数"
      width={800}
      onOk={(e, form, show) => {
        form.validateFields((err, values) => {
          if (err) return;
          console.log(values)
          const { funcLib } = this.state;
          funcLib[values.name] = {
            params: values.params || [],
            body: values.body,
          }
          this.setState({
            funcLib
          }, () => {
            show(false)
            this._storeState()
          })
        })
      }}
      form={{
        data: form => [
          {
            label: '所有函数',
            type: 'select',
            key: ',funcLib',
            placeholder: '查看',
            options: Object.keys(this.state.funcLib).map(k => {
              return { label: k, value: k }
            })
          },
          {
            label: '函数名称',
            type: 'input',
            key: 'name',
            placeholder: '请输入函数名称',
            config: {
              rules: [
                { required: true, message: '必填项' },
                {
                  validator: (rule, value, callback) => {
                    console.log(value, this.state.funcLib, this.state.funcLib[value])
                    if (value && this.state.funcLib[value]) {
                      callback('已存在命名');
                    } else {
                      callback();
                    }
                  },
                },
              ]
            }
          },
          {
            label: '函数参数',
            type: 'select',
            key: 'params',
            mode: 'tags',
            placeholder: '请输入',
            tokenSeparators: [',']
          },
          {
            label: '函数体',
            type: 'textarea',
            key: 'body',
            placeholder: '请输入函数体',
            autosize: {
              minRows: 10,
              maxRows: 100
            }

          }
        ]
      }}
    />)
  }

  _renderOptionDialog() {
    return (<Modal
      ref={this.optionDialog}
      title="添加 option 组"
      width={800}
      onOk={(e, form, show) => {
        form.validateFields((err, values) => {
          if (err) return;

          const { optionLib } = this.state;
          optionLib[values.optionName] = values.option.filter(item => item);
          console.log(values)
          // return;
          this.setState({
            optionLib,
            _options: []
          }, () => {
            show(false)
            this._storeState()
          })

        })
      }}
      form={{
        data: form => [
          {
            label: '所有配置组',
            type: 'select',
            key: ',optionLib',
            placeholder: '请选择配置组',
            options: [
              { label: '新建', value: '' },
              ...Object.keys(this.state.optionLib).map(item => {
                return {
                  label: item,
                  value: item
                }
              })
            ],
            config: {
              initialValue: ''
            },
            onChange: (value) => {
              //
              form.setFieldsValue({
                optionName: value
              })

              let values = this.state.optionLib[value] || [];
              let _options = values.map((item, index) => {
                return {
                  label: <div style={{ display: 'inline' }}><span style={{ color: '#f5222d', paddingRight: '4px', fontFamily: 'SimSun, sans-serif' }}>*</span>option-{index}</div>,
                  type: 'group',
                  formItemLayout: { style: { marginBottom: 0 } },
                  children: [
                    {
                      type: 'input',
                      key: `option[${index}].label`,
                      placeholder: 'label',
                      config: {
                        initialValue: item.label,
                        rules: [
                          {
                            required: true,
                            message: '必填'
                          }
                        ]
                      },
                      formItemLayout: { style: { display: 'inline-block', width: 150 } },
                    },
                    {
                      type: 'span',
                      label: '-',
                      style: {
                        display: 'inline-block',
                        width: 40,
                        textAlign: 'center'
                      }
                    },
                    {
                      type: 'input',
                      key: `option[${index}].value`,
                      placeholder: 'value',
                      config: {
                        initialValue: item.value,
                        rules: [
                          {
                            required: true,
                            message: '必填'
                          }
                        ]
                      },
                      formItemLayout: { style: { display: 'inline-block', width: 150 } },
                    },
                    {
                      type: 'button',
                      size: 'small',
                      icon: 'close',
                      buttonType: 'danger',
                      formItemLayout: { style: { display: 'inline-block', marginRight: 10 } },
                      onClick: () => {
                        const { _options } = this.state;
                        _options[index].visible = false;
                        this.setState({
                          _options
                        })

                      }
                    },
                  ]
                }
              })

              this.setState({
                _options: _options || []
              })
              // _options
            }
          },
          {
            label: '配置组名称',
            type: 'input',
            key: 'optionName',
            placeholder: '请输入配置组名称',
            config: {
              initialValue: form.getFieldValue(",optionLib"),
              rules: [
                { required: true, message: '必填项' },
                {
                  validator: (rule, value, callback) => {
                    if (value && this.state.optionLib[value]) {
                      if (value === form.getFieldValue(',optionLib')) {
                        callback();
                      } else {
                        callback('已存在命名');
                      }

                    } else {
                      callback();
                    }
                  },
                },
              ]
            }
          },
          ...this.state._options,
          {
            type: 'button',
            buttonType: 'dashed',
            onClick: e => {
              const { _options } = this.state;
              let index = _options.length;
              _options.push({
                label: <div style={{ display: 'inline' }}><span style={{ color: '#f5222d', paddingRight: '4px', fontFamily: 'SimSun, sans-serif' }}>*</span>option-{index}</div>,
                type: 'group',
                formItemLayout: { style: { marginBottom: 0 } },
                children: [
                  {
                    type: 'input',
                    key: `option[${index}].label`,
                    placeholder: 'label',
                    config: {
                      rules: [
                        {
                          required: true,
                          message: '必填'
                        }
                      ]
                    },
                    formItemLayout: { style: { display: 'inline-block', width: 150 } },
                  },
                  {
                    type: 'span',
                    label: '-',
                    style: {
                      display: 'inline-block',
                      width: 40,
                      textAlign: 'center'
                    }
                  },
                  {
                    type: 'input',
                    key: `option[${index}].value`,
                    placeholder: 'value',
                    config: {
                      rules: [
                        {
                          required: true,
                          message: '必填'
                        }
                      ]
                    },
                    formItemLayout: { style: { display: 'inline-block', width: 150 } },
                  },
                  {
                    type: 'button',
                    size: 'small',
                    icon: 'close',
                    buttonType: 'danger',
                    formItemLayout: { style: { display: 'inline-block', marginRight: 10 } },
                    onClick: () => {
                      const { _options } = this.state;
                      _options[index].visible = false;
                      // let options = Object.assign([], _options)
                      // options.splice(index, 1)
                      this.setState({
                        _options
                      })

                    }
                  },
                ]
              })

              this.setState({
                _options
              })
            },
            formItemLayout: {
              wrapperCol: {
                offset: 6
              }
            },
            icon: 'plus',
            text: '添加 Option'
          },
        ]
      }}
    />)
  }

  _renderTableDialog() {
    return (<Modal
      ref={this.tableDialog}
      title="设计表格"
      width={800}
      onOk={(e, form, show) => {
        form.validateFields((err, values) => {
          if (err) return;
          console.log(values);
          this.setState({
            _columns: [],
            columns: values._columns
          }, () => {
            show(false)
            this._storeState()
          })
        });
      }}
      form={{
        formLayout: {
          labelCol: {
            span: 3,
          },
          wrapperCol: {
            span: 21
          }
        },
        data: form => [
          ...this.state.columns.map((item, index) => {
            return {
              label: `表头字段-${index}`,
              type: 'group',
              key: `group_${index}`,
              formItemLayout: {
                style: { marginBottom: 0 }
              },
              children: [
                {
                  placeholder: 'title',
                  type: 'input',
                  key: `_columns[${index}].title`,
                  formItemLayout: { style: { display: 'inline-block', width: 100 } },
                  config: {
                    initialValue: item.title,
                    rules: [
                      {
                        required: true, message: '必填'
                      }
                    ]
                  }
                },
                {
                  type: 'span',
                  label: '-',
                  style: {
                    display: 'inline-block',
                    width: 40,
                    textAlign: 'center'
                  }
                },
                {
                  placeholder: 'dataIndex',
                  type: 'input',
                  key: `_columns[${index}].dataIndex`,
                  formItemLayout: { style: { display: 'inline-block', width: 100 } },
                  config: {
                    initialValue: item.dataIndex,
                    rules: [
                      {
                        required: true, message: '必填'
                      }
                    ]
                  }
                },
                {
                  type: 'span',
                  label: '-',
                  style: {
                    display: 'inline-block',
                    width: 40,
                    textAlign: 'center'
                  }
                },
                {
                  placeholder: 'key',
                  type: 'input',
                  key: `_columns[${index}].key`,
                  formItemLayout: { style: { display: 'inline-block', width: 100 } },
                  config: {
                    initialValue: item.key,
                    rules: [
                      {
                        required: true, message: '必填'
                      }
                    ]
                  }
                },
                {
                  type: 'span',
                  // label: '-',
                  style: {
                    display: 'inline-block',
                    width: 40,
                    textAlign: 'center'
                  }
                },
                {
                  type: 'button',
                  // text: '删除',
                  size: 'small',
                  icon: 'close',
                  buttonType: 'danger',
                  formItemLayout: { style: { display: 'inline-block', marginRight: 10 } },
                  onClick: () => {
                    const { columns } = this.state;
                    columns.splice(index, 1)
                    this.setState({
                      columns
                    })
                  }
                },
                {
                  visible: index !== 0,
                  type: 'button',
                  // text: '向上移动',
                  size: 'small',
                  icon: 'up',
                  buttonType: 'link',
                  formItemLayout: { style: { display: 'inline-block', width: 100 } },
                  onClick: () => {
                    const { columns } = this.state;
                    let current = columns[index],
                      up = columns[index - 1];

                    let item = {
                      title: up.title,
                      dataIndex: up.dataIndex,
                      key: up.key
                    }

                    up.title = current.title;
                    up.dataIndex = current.dataIndex;
                    up.key = current.key;

                    current.title = item.title;
                    current.dataIndex = item.dataIndex;
                    current.key = item.key;

                    this.setState({
                      columns
                    })
                  }
                }
              ]
            }
          }),
          ...this.state._columns,
          {
            type: 'button',
            buttonType: 'dashed',
            formItemLayout: {
              wrapperCol: {
                offset: 3
              }
            },
            icon: 'plus',
            text: '添加 表头字段',
            onClick: e => {
              let { columns, _columns } = this.state;
              let index = columns.length + _columns.length;
              _columns.push({
                label: `表头字段-${index}`,
                type: 'group',
                formItemLayout: {
                  style: { marginBottom: 0 }
                },
                children: [
                  {
                    placeholder: 'title',
                    type: 'input',
                    key: `_columns[${index}].title`,
                    formItemLayout: { style: { display: 'inline-block', width: 100 } },
                    config: {
                      rules: [
                        {
                          required: true, message: '必填'
                        }
                      ]
                    }
                  },
                  {
                    type: 'span',
                    label: '-',
                    style: {
                      display: 'inline-block',
                      width: 40,
                      textAlign: 'center'
                    }
                  },
                  {
                    placeholder: 'dataIndex',
                    type: 'input',
                    key: `_columns[${index}].dataIndex`,
                    formItemLayout: { style: { display: 'inline-block', width: 100 } },
                    config: {
                      rules: [
                        {
                          required: true, message: '必填'
                        }
                      ]
                    }
                  },
                  {
                    type: 'span',
                    label: '-',
                    style: {
                      display: 'inline-block',
                      width: 40,
                      textAlign: 'center'
                    }
                  },
                  {
                    placeholder: 'key',
                    type: 'input',
                    key: `_columns[${index}].key`,
                    formItemLayout: { style: { display: 'inline-block', width: 100 } },
                    config: {
                      rules: [
                        {
                          required: true, message: '必填'
                        }
                      ]
                    }
                  },
                  {
                    type: 'span',
                    // label: '-',
                    style: {
                      display: 'inline-block',
                      width: 40,
                      textAlign: 'center'
                    }
                  },
                  {
                    type: 'button',
                    // text: '删除',
                    size: 'small',
                    icon: 'close',
                    buttonType: 'danger',
                    formItemLayout: { style: { display: 'inline-block', width: 100 } },
                    onClick: () => {
                      _columns.splice(index - columns.length, 1)
                      this.setState({
                        _columns
                      })
                    }
                  }
                ]
              })
              this.setState({
                _columns
              })
            }
          }
        ]
      }}
    />)
  }

  _renderFormDialog() {
    return <Modal
      ref={this.formDialog}
      title="添加组件"
      width={800}
      onOk={(e, form, show) => {

        form.validateFields((err, values) => {
          if (err) return;
          const { formItems } = this.state;
          Object.keys(values).map(k => {
            if (k.includes(',') || Object.prototype.toString.call(values[k]) === '[object Undefined]') {
              delete values[k]
            }
          })
          //config.valuePropName

          // if (['slider'].indexOf(values.type) > -1) {
          //   values.style = {
          //     minWidth: 30
          //   }
          // }

          formItems.push(values)
          console.log(formItems)
          this.setState({
            formItems
          }, () => {
            show(false)
            this._storeState()
          })
        });

      }}
      form={{
        data: form => [
          {
            label: '已建组件',
            type: 'select',
            key: 'all,',
            placeholder: '查看已建组件',
            options: this.state.formItems.map((item, index) => {
              return { label: item.label || item.text, value: index }
            }),
            onChange: (value) => {
              form.setFieldsValue(this.state.formItems[value])
            }
          },
          {
            label: '组件类型',
            type: 'group',
            formItemLayout: {
              style: {
                marginBottom: 0
              }
            },
            children: [
              {
                formItemLayout: { style: { display: 'inline-block', minWidth: 150 } },
                type: 'select',
                key: 'type',
                config: {
                  rules: [
                    {
                      required: true,
                      message: '请选择'
                    }
                  ]
                },
                options: ['input', 'select', 'button', 'inputnumber', 'textarea', 'radio', 'checkbox', 'datepicker', 'rangepicker', 'monthpicker', 'weekpicker', 'timepicker', 'switch', 'upload', 'cascader', 'radiobutton', 'slider', 'steps', 'br', 'span', 'group'].map(item => {
                  return {
                    label: item.replace(/\b(\w)|\s(\w)/g, m => {
                      return m.toUpperCase()
                    }),
                    value: item
                  }
                }),
                placeholder: '请选择',
                onChange: () => {
                  form.resetFields();
                }
              },
              {
                visible: ['button'].indexOf(form.getFieldValue('type')) === -1,
                type: 'switch',
                key: 'disabled',
                checkedChildren: '只读',
                unCheckedChildren: '读写',
                config: {
                  initialValue: false,
                  valuePropName: 'checked'
                },
                formItemLayout: { style: { display: 'inline-block', marginLeft: 10 } },
              },
              {
                visible: ['button'].indexOf(form.getFieldValue('type')) === -1,
                type: 'switch',
                key: 'config.rules[0].required',
                checkedChildren: '必填',
                unCheckedChildren: '可空',
                config: {
                  initialValue: false,
                  valuePropName: 'checked'
                },
                formItemLayout: { style: { display: 'inline-block', marginLeft: 10 } },
              },
              {
                visible: form.getFieldValue('type') === "button",
                type: 'switch',
                key: 'bindSearch',
                checkedChildren: '绑定搜索',
                unCheckedChildren: '不绑定搜索',
                config: {
                  initialValue: false,
                  valuePropName: 'checked'
                },
                formItemLayout: { style: { display: 'inline-block', marginLeft: 10 } },
              },
              {
                visible: ['input', 'inputnumber', 'select', 'textarea'].indexOf(form.getFieldValue('type')) > -1,
                type: 'input',
                key: 'placeholder',
                placeholder: '请输入占位文字',
                formItemLayout: { style: { display: 'inline-block', width: 140, marginLeft: 10 } },
              },
            ]
          },

          ...button({
            type: form.getFieldValue('type')
          }),
          {
            visible: ['button', 'br'].indexOf(form.getFieldValue('type')) === -1,
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
          },
          {
            visible: ['button', 'br', 'span'].indexOf(form.getFieldValue('type')) === -1,
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
          },
          {
            visible: ['select', 'radio', 'checkbox', 'radiobutton'].indexOf(form.getFieldValue('type')) > -1,
            label: '常用选项库',
            type: 'select',
            key: 'options',
            placeholder: '请配置选项内容',
            options: Object.keys(this.state.optionLib).map(k => {
              return { label: k, value: k }
            }),
            config: {
              rules: [
                { required: true, message: '请选择' }
              ]
            }
          },
          // start 初始值
          initialValue({
            type: form.getFieldValue('type'),
            options: this.state.optionLib[form.getFieldValue('options')]
          }),
          // 隐藏域 附加值
          valuePropName({
            type: form.getFieldValue('type'),
          }),

          events({
            type: form.getFieldValue('type'),
            form,
            options: Object.keys(this.state.funcLib).map(k => {
              return { label: k, value: k }
            }),
            bindSearch: form.getFieldValue("bindSearch") === true
          }),

          ...switchEle({
            type: form.getFieldValue('type'),
          }),

          ...slider({
            type: form.getFieldValue('type')
          }),

          span({
            type: form.getFieldValue('type')
          }),

          // formItemLayout({
          //   type: form.getFieldValue('type')
          // })

          upload({
            type: form.getFieldValue('type')
          })
        ]
      }}
    />
  }

  render() {
    const { formItems: _formItems = [], columns = [] } = this.state;
    // 处理事件
    let formItems = _formItems.map(item => {
      let _item = Object.assign({}, item);

      if (['select', 'radio', 'checkbox', 'radiobutton'].indexOf(_item.type) > -1) {
        let _options = _item.options;
        let options = [];
        if (Object.prototype.toString.call(_options) === '[object String]') {
          options = this.state.optionLib[_options]
        }

        _item.options = options;
      }

      if (_item.eventName) {

        if (_item.eventPrivate) {
          // 私有
          _item[_item.eventName] = new Function(..._item.eventParams, _item.eventBody).bind(this);

        } else {
          // 公有
          let eventPublicName = _item.eventPublicName;
          if (eventPublicName && Object.prototype.toString.call(eventPublicName) === "[object String]") {

            let func = this.state.funcLib[eventPublicName],
              params = func.params || [],
              body = func.body;
            _item[_item.eventName] = new Function(...params, body).bind(this)
          }
        }

        // 删除附加属性
        delete _item.eventName;
        delete _item.eventParams;
        delete _item.eventBody;

        delete _item.eventPrivate;
        delete _item.eventPublicName;
      }

      // }

      return _item;
    })
    return <div>
      <Form
        layout="inline"
        data={[
          {
            type: 'button',
            buttonType: 'dashed',
            onClick: e => {
              this.formDialog.current.show()
            },
            icon: 'plus',
            text: '设计搜索区'
          },
          {
            type: 'button',
            buttonType: 'dashed',
            onClick: e => {
              this.tableDialog.current.show()
            },
            icon: 'plus',
            text: '设计表格区'
          },
          {
            type: 'button',
            buttonType: 'dashed',
            onClick: e => {
              this.optionDialog.current.show()
            },
            icon: 'plus',
            text: '添加options组'
          },
          {
            type: 'button',
            buttonType: 'dashed',
            onClick: e => {
              this.funcDialog.current.show()
            },
            icon: 'plus',
            text: '添加功能函数'
          },
        ]}
      />
      <SearchList
        type="table"
        search={
          {
            layout: 'inline',
            data: (form) => {
              const { getFieldDecorator } = form;
              return [
                ...formItems,
              ]
            }
          }
        }
        table={{
          // action: api.queryList,
          rowKey: "id",
          action: () => {
            return new Promise((resolve, reject) => {
              resolve({
                entry: [
                  {
                    id: 1,
                    a: '1'
                  },
                  {
                    id: 2,
                    a: '1'
                  }
                ],
                status: false,
                message: '测试'
              });
            })
          },
          columns,
        }}
      />
      {
        this._renderTableDialog()
      }
      {
        this._renderFormDialog()
      }
      {
        this._renderOptionDialog()
      }
      {
        this._renderFuncDialog()
      }
    </div>
  }
}


