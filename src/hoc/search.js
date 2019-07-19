import React from 'react';

export default (Component) => {
  return class extends React.Component {

    constructor() {
      super();
      this.state = {
        formValues: {},
      }
    }

    _search(fieldsValue) {
      let formValues = {};
      const values = {
        ...fieldsValue
      };
      // 移除空的字段
      Object.keys(values).forEach(key => {
        let val = values[key];
        if (Object.prototype.toString.call(val) !== "[object Undefined]" && val !== '') {
          formValues[key] = val;
        }
      });

      this.setState({
        formValues
      }, () => {
        // 待实现的接口 : 模拟 interface or 
        this.refresh();
      })
    }
    // 由子类进行实现或重写
    refresh() {
      this.refs.hoc.refresh()
      console.log('from hoc search')
    }

    resetFields() {
      this.props.form.resetFields();
      this.setState({
        formValues: {},
      })
    }

    _getSearchParams() {
      return this.state.formValues;
    }

    render() {
      const props = {
        // 继承了配置
        ...this.props,
        // 新增了 两个函数, 一个是获取参数数据, 一个是进行请求
        params: () => this._getSearchParams(),
        onSearch: (form) => this._search(form.getFieldsValue())
      }

      return <Component ref="hoc" {...props} />
    }
  }
}


// 1. 搜索过后, 表单状态才进行了保存, 后期可直接获取
// 2. 想要获取表单数据, 必须进行一次搜索