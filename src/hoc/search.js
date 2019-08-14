import React from 'react';
import { filter } from '../utils';


export default (Component) => {
  return class extends React.PureComponent {

    constructor(props) {
      super(props);
      this.state = {
        formValues: {},
      }

      this.hoc = React.createRef();
      this.form = null;
    }

    _search(fieldsValue) {
      // let formValues = filter(fieldsValue);

      // this.setState({
      //   formValues
      // }, () => {
      //   // 待实现的接口 : 模拟 interface or 
      //   this.refresh();
      // })

      // 待实现的接口 : 模拟 interface or 
      this.refresh();
    }
    // 由子类进行实现或重写
    refresh() {
      this.hoc.current.refresh()
    }

    resetFields() {
      this.props.form.resetFields();
      // this.setState({
      //   formValues: {},
      // })
    }

    _getSearchParams() {
      // return this.state.formValues;
      return filter(this.form.getFieldsValue())
    }

    render() {
      const props = {
        // 继承了配置
        ...this.props,
        // 新增了 两个函数, 一个是获取参数数据, 一个是进行请求
        params: () => this._getSearchParams(),
        autoSearchEvent: () => this.refresh(),
        _bindForm: (form) => { this.form = form }
      }

      return <Component ref={this.hoc} {...props} />
    }
  }
}