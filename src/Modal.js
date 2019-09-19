import React from 'react';
import { Modal, message } from 'antd';
import Form from './Form';
import { toString, filter } from './utils';

// 此 Modal 仅对于 form 来讲
export default class Dialog extends React.PureComponent {
  // 不接收动态属性变化
  constructor(props) {
    super(props)
    this.state = {
      isVisible: props.visible || false,
    }

  }

  show(isShow = true, callback) {
    this.setState({
      isVisible: isShow,
    }, callback)
  }

  _onCancel(callback) {
    this.show(false, callback)
  }

  _afterClose(callback) {
    this.form.resetFields()
    callback && callback()
  }

  _getSearchParams() {
    return filter(this.form.getFieldsValue())
  }

  // 处理 自动 action start
  autoHandleSubmit = () => {
    const { action, extraParams = {}, actionError = (res) => { console.log(res) }, actionSuccess = (res) => { console.log(res) }, valueMap = (res) => {
      return {
        status: res.status
      }
    }, } = this.props;
    let _val = toString.call(extraParams) === "[object Function]" ? extraParams() : extraParams;
    let values = {
      ..._val,
      ...this._getSearchParams()
    }
    action(values).then(res => {
      const { status } = valueMap(res)
      if (status) {
        this.show(false, () => actionSuccess('操作成功'))
      } else {
        actionError(res.message)
      }
    }).catch(err => {
      actionError(err.message)
    })
  }
  // 处理 自动 action end

  render() {
    const { isVisible } = this.state;
    const {
      children,
      visible,
      onCancel = () => { },
      afterClose = () => { },
      onOk = (e, form, show) => { },
      footer = (cancel, ok) => { },
      search, form = {},
      //
      action = false, extraParams, actionError, actionSuccess,
      //
      ...pr
    } = this.props;

    let _onCancel = () => this._onCancel(onCancel),
      _onOk = action !== false ? this.autoHandleSubmit : (e) => { onOk(e, this.form, (f) => this.show(f)) };

    return (
      <Modal
        visible={isVisible}
        onCancel={_onCancel}
        afterClose={() => this._afterClose(afterClose)}
        onOk={_onOk}
        footer={toString.call(footer) === "[object Array]" ? footer : footer(_onCancel, _onOk)}
        {...pr}
      >
        <Form
          wrappedComponentRef={(inst) => this.form = inst && inst.props.form}
          {...form}
        />
        {
          React.Children.map(this.props.children, function (child) {
            return child;
          })
        }
      </Modal>
    )
  }
}

Dialog.info = Modal.info;
Dialog.error = Modal.error;
Dialog.warning = Modal.warning;
Dialog.success = Modal.success;
Dialog.confirm = Modal.confirm;