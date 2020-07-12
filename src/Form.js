import React, { useState, memo, useEffect, useRef } from 'react';
import { Form, Input, Row, Col } from 'antd';
import { filter, diff } from './utils';

function createFormItem(obj, form) {
  // console.log(obj.cType.name)
  const { cType: AntdComponent, child, innerHTML, bindSearchEvent, ...props } = obj;
  // const AntdComponent = obj.cType;
  if (bindSearchEvent) {
    if (obj.onClick) {
      // const onClick = obj.onClick;
      props.onClick = e => {
        obj.onClick(e, form)
        bindSearchEvent(form);
      }
    } else {
      props.onClick = () => {
        bindSearchEvent(form);
      }
    }
  }

  return <AntdComponent {...props}>{child || (innerHTML && innerHTML())}</AntdComponent>
}

export default memo((props, ref) => {
  const [initialValues] = useState({});
  const [form] = Form.useForm();
  const { _bindForm = () => { }, formLayout, layout = "horizontal", data = [], autoSearchEvent } = props;


  const innerFormLayout = formLayout || (layout === 'horizontal' ? {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  } : {});

  _bindForm(form);

  function getFieldsValue() {
    const fieldsValue = form.getFieldsValue();

    return filter(fieldsValue);

  }

  const transFuncToObj = (func = {}) => {
    let ret = null;
    if (Object.prototype.toString.call(func) === '[object Function]') {
      ret = func(form, this)
    } else {
      ret = func;
    }

    return ret;
  }

  function transConfig({ initialValue, ...config }) {
    return config;
  }

  const renderElement = (bindSearchEvent, formData = [], initialValues = {}) => {
    return formData.map((item, _) => {
      const {
        // 组件是否渲染
        visible = true,

        // Form.Item 属性
        unbind,
        key = `random_key_${Math.random()}`,
        formItem = {}, // form item 属性
        config = {}, // form item 验证配置
        label,
        extra = null,
        hasFeedback = false,

        // 完全自定义组件渲染(即不包含在已有组件列表中)
        render,
        // 在原组件基本上修改组件
        renderFix,

        // button 是否绑定 搜索事件
        bindSearch = false,

        // 组件类型
        cType,
        // 组件固有属性
        ...itemProps
      } = item;

      const formItemProps = {
        name: key,
        label,
        extra,
        hasFeedback,
        ...formItem,
        ...transConfig(config)
      }

      if (config.hasOwnProperty('initialValue')) {
        initialValues[item.key] = config.initialValue;
      } else {
        console.log('no config', item.key)
      }


      let ret = null;
      if (visible !== false) {
        if (cType === 'br') {
          ret = <p style={{
            display: 'block',
            width: '100%',
            height: 0,
            margin: 0,
            padding: 0
          }} />
        } else if (cType === 'span') {
          ret = <span  {...itemProps} >{label}</span>
        } else if (cType === 'hidden') {
          ret = (<Form.Item noStyle key={key}  {...formItemProps}>
            {
              createFormItem({
                cType: Input,
                hidden: true,
              }, form)

            }
          </Form.Item>)
        } else if (cType === 'group') {
          const curCom = renderElement(bindSearchEvent, item.children, initialValues)
          ret = (<Form.Item noStyle key={key} {...formItemProps}>
            {
              curCom
            }
          </Form.Item>)

        } else if (render) {
          const renderItem = render(form, Form.Item);
          ret = (<Form.Item key={key} {...formItemProps}>
            {
              renderFix ? renderFix(renderItem) : renderItem
            }
          </Form.Item>)

        } else if(cType === 'row'){
          const curCom = renderElement(bindSearchEvent, item.children, initialValues)
          ret = (<Row {...itemProps}>
            {
              curCom
            }
          </Row>)
        } else if(cType === 'col'){
          const curCom = renderElement(bindSearchEvent, item.children, initialValues)
          ret = (<Col {...itemProps}>
            {
              curCom
            }
          </Col>)
        } else {
          const eleConfig = {
            cType,
            ...itemProps
          }

          if (bindSearch) {
            eleConfig.bindSearchEvent = bindSearchEvent
          }

          const renderItem = createFormItem(eleConfig, form);

          const curCom =renderFix ? renderFix(renderItem) : renderItem;

          ret = unbind? curCom : (<Form.Item key={key} {...formItemProps}>
            {
              curCom
            }
          </Form.Item>)
        }
      }

      return ret;
    })
  }

  const renderItems = renderElement(autoSearchEvent, transFuncToObj(data), initialValues);
  const values = Object.assign({}, initialValues);
  const valueRef = useRef({})

  useEffect(() => {

    form.setFieldsValue(diff(valueRef.current, values) || {})
    valueRef.current = values;
  }, [values])


  return (<Form layout={layout} {...innerFormLayout} form={form} initialValues={values}>
    {
      renderItems
    }
    {
      React.Children.map(props.children, child => child)
    }
  </Form>)
})
