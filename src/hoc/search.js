import React from 'react';
import { filter } from '../utils';


export default (Component) => {
  return class extends React.PureComponent {

    constructor(props) {
      super(props);

      this.hoc = React.createRef();
      this.form = null;
    }

    reset(needLoad = true) {
      this.hoc.current.reset(needLoad)
    }

    // 由子类进行实现或重写
    refresh() {
      this.hoc.current.refresh()
    }

    // resetFields() {
    //   this.props.form.resetFields();
    // }

    _getSearchParams() {
      return filter(this.form.getFieldsValue())
    }

    render() {
      const props = {
        // 继承了配置
        ...this.props,
        // 新增了 两个函数, 一个是获取参数数据, 一个是进行请求
        params: () => this._getSearchParams(),
        // 每次点击, 都是重置数据
        autoSearchEvent: () => this.reset(),
        // 获取 form 实例
        _bindForm: (form) => { this.form = form }
      }

      return <Component ref={this.hoc} {...props} />
    }
  }
}