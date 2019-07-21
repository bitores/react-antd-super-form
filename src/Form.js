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

  _renderElement(form, getFieldDecorator, onSearch, data = [], cls) {
    return data.map((item, index) => {
      const {
        // 元素非固有属性 - 过滤
        label,
        // - for getFieldDecorator
        unbind,
        // for all
        visible = true,
        key = `random_key_${Math.random()}`,
        config = {},
        // - for 元素
        render,
        bindSearch = false,
        // - for 元素
        type,
        // form form Item ele
        formItemLayout = {},
        // cb
        renderFix,
        // for Form.Item
        extra = null,
        hasFeedback = false,
        // 元素固有属性
        ...props
      } = item;
      let ret = null;
      if (visible === false) {
        return;
      } else if (type === 'br') {
        return <br key={index} />
      } else if (type === 'group') {
        ret = this._renderElement(form, getFieldDecorator, onSearch, item.children, 'group')
      } else if (render) {
        let renderItem = render(form, Form.Item) || <input placeholder="default: render need return"></input>;
        ret = unbind === true ? renderItem : getFieldDecorator(key, this._transFuncToObj(config, form))(renderItem)
      } else {

        let _item = {
          type,
          ...props
        }
        if (bindSearch) _item.onSearch = onSearch;
        let renderItem = createFormItem(_item, form);
        ret = type === 'button' ? renderItem : getFieldDecorator(key, this._transFuncToObj(config, form))(renderItem)
      }

      if (cls === 'group') {
        return (<span style={{ paddingRight: 10 }} key={`1_${index}`}>{ret}</span>)
      }

      let itemForm = type === 'group' ? <div>{ret}</div> : ret;

      return (<Form.Item label={label} key={index} extra={extra} hasFeedback={hasFeedback} {...formItemLayout}>
        {
          renderFix ? renderFix(itemForm) : itemForm
        }
      </Form.Item>)

    })
  }

  render() {
    const { form, formLayout, layout = "horizontal", data = [], onSearch } = this.props;
    const { getFieldDecorator } = form;

    let _formLayout = formLayout || layout === 'horizontal' ? {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    } : null

    return (<Form layout={layout} {..._formLayout}>
      {
        this._renderElement(form, getFieldDecorator, onSearch, this._transFuncToObj(data, form))
      }
    </Form>)
  }
}
export default Form.create()(_Form) 