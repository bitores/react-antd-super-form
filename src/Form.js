import React, { useState, memo, useEffect, useRef } from 'react';
import { message, Form } from 'antd';
import createFormItem from './builder';
import { filter, diffObject } from './utils';

export default memo((props, ref) => {
  const [initialValues, setInitialValues] = useState({});
  const [form] = Form.useForm();
  const { _bindForm = () => { }, formLayout, layout = "horizontal", data = [], autoSearchEvent } = props;


  let _formLayout = formLayout || (layout === 'horizontal' ? {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 },
  } : {});

  _bindForm(form);

  function getFieldsValue() {
    const fieldsValue = form.getFieldsValue();

    return filter(fieldsValue);

  }

  const _transFuncToObj = (func = {}) => {
    if (Object.prototype.toString.call(func) === '[object Function]') {
      return func(form, this)
    } else {
      return func;
    }
  }

  function _transConfig({ initialValue, ...config }) {
    return config;
  }

  const renderElement = (autoSearchEvent, data = [], initialValues = {}) => {
    return data.map((item, index) => {
      const {
        // 组件是否渲染
        visible = true,

        // Form.Item 属性
        label,
        extra = null,
        hasFeedback = false,
        formItemLayout = {},

        // getFieldDecorator 参数
        unbind,
        key = `random_key_${Math.random()}`,
        config = {},

        // 自定义组件渲染(即不包含在已有组件列表中)
        render,
        // 在一些特殊布局中使用
        renderFix,

        // button 是否绑定 搜索事件
        bindSearch = false,

        // 组件类型
        type,
        // 组件固有属性
        ...itemProps
      } = item;

      if (config.hasOwnProperty('initialValue')) {
        // console.log(config, item.key, initialValues)
        initialValues[item.key] = config.initialValue;
        // delete config.initialValue;
        // setInitialValues(initialValues);
      } else {
        console.log('no config', item.key)
      }


      let ret = null;
      if (visible === false) {
        return;
      } else if (type === 'br') {
        return <p key={index} style={{
          // flex: 1,
          display: 'block',
          width: '100%',
          height: 0,
          margin: 0,
          padding: 0
        }
        } ></p>
      } else if (type === 'span') {
        return <span key={index} {...itemProps} >{label}</span>
      } else if (type === 'hidden') {
        return (<Form.Item key={index} style={{ display: 'none' }} name={key} {..._transConfig(config)}>
          {
            createFormItem({
              type: 'input',
              hidden: true,
            }, form)

          }
        </Form.Item>)
      } else if (type === 'group') {
        return (<Form.Item label={label} key={index} extra={extra} hasFeedback={hasFeedback} {...formItemLayout}>
          {
            renderElement(autoSearchEvent, item.children, initialValues)
          }
        </Form.Item>)

      } else if (render) {
        let renderItem = render(form, Form.Item) || <input placeholder="default: render need return"></input>;
        ret = unbind === true ? renderItem : renderItem;

      } else {

        let _item = {
          type,
          ...itemProps
        }
        if (bindSearch) {
          _item.autoSearchEvent = autoSearchEvent;
        }
        let renderItem = createFormItem(_item, form);
        ret = (type === 'button' || unbind === true) ? renderItem : renderItem;
      }

      return (<Form.Item label={label} key={index} extra={extra} hasFeedback={hasFeedback} {...formItemLayout} name={key} {..._transConfig(config)}>
        {
          renderFix ? renderFix(ret) : ret
        }
      </Form.Item>)

    })
  }

  // useEffect(()=>{

  // },[])

  // useEffect(() => {
  const renderItems = renderElement(autoSearchEvent, _transFuncToObj(data), initialValues);


  const values = Object.assign({}, initialValues);

  const valueRef = useRef({})


  useEffect(() => {

    console.log('')

    form.setFieldsValue(diffObject(valueRef.current, values))
    console.log('==========111', valueRef.current, values, diffObject(valueRef.current, values))
    valueRef.current = values;
  }, [values])


  // }, [])





  // setInitialValues(initialValues)


  return (<Form layout={layout} {..._formLayout} form={form} initialValues={values}>
    {
      renderItems
    }
    {
      React.Children.map(props.children, function (child) {
        return child;
      })
    }
  </Form>)
})
// export default Form.create()(_Form)