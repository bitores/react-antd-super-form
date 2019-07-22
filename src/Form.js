import React, { Component } from 'react';
import { message, Form } from 'antd';
import createFormItem from './builder';


class _Form extends Component {


  _transFuncToObj(func = {}, form) {
    if (Object.prototype.toString.call(func) === '[object Function]') {
      return func(form)
    } else {
      return func;
    }
  }

  _renderElement(form, getFieldDecorator, autoSearchEvent, data = [], cls) {
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
        ...props
      } = item;
      let ret = null;
      if (visible === false) {
        return;
      } else if (type === 'br') {
        return <br key={index} />
      } else if (type === 'span') {
        return <span key={index} {...props} >{label}</span>
      } else if (type === 'group') {
        ret = this._renderElement(form, getFieldDecorator, autoSearchEvent, item.children, 'group')
      } else if (render) {
        let renderItem = render(form, Form.Item) || <input placeholder="default: render need return"></input>;
        ret = unbind === true ? renderItem : getFieldDecorator(key, this._transFuncToObj(config, form))(renderItem)
      } else {

        let _item = {
          type,
          ...props
        }
        if (bindSearch) _item.autoSearchEvent = autoSearchEvent;
        let renderItem = createFormItem(_item, form);
        ret = type === 'button' ? renderItem : getFieldDecorator(key, this._transFuncToObj(config, form))(renderItem)
      }

      // if (cls === 'group') {
      //   return (<span style={{ paddingRight: 10 }} key={`1_${index}`}>{ret}</span>)
      // }

      // let itemForm = type === 'group' ? <div>{ret}</div> : ret;

      // let itemForm = ret;

      return (<Form.Item label={label} key={index} extra={extra} hasFeedback={hasFeedback} {...formItemLayout}>
        {
          renderFix ? renderFix(ret) : ret
        }
      </Form.Item>)

    })
  }

  render() {
    const { form, formLayout, layout = "horizontal", data = [], autoSearchEvent } = this.props;
    const { getFieldDecorator } = form;

    let _formLayout = formLayout || layout === 'horizontal' ? {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    } : null

    return (<Form layout={layout} {..._formLayout}>
      {
        this._renderElement(form, getFieldDecorator, autoSearchEvent, this._transFuncToObj(data, form))
      }
    </Form>)
  }
}
export default Form.create()(_Form) 