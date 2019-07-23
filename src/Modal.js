import React, { Component } from 'react';
import { Modal } from 'antd';
import Form from './Form';


export default class extends Component {

  constructor() {
    super()
    this.state = {
      isVisible: false,
    }

  }

  componentWillMount() {

    this.setState({
      isVisible: this.props.visible
    })
  }

  show(isShow = true) {

    this.setState({
      isVisible: isShow,
    })
  }

  getFieldsValue() {
    // return this.refs.form.getFieldsValue();
    return this.form.getFieldsValue();
  }

  _onCancel(callback) {
    this.setState({
      isVisible: false
    }, () => {
      callback && callback()
    })
  }

  _afterClose(callback) {
    this.form.resetFields()
    callback && callback()
  }

  render() {
    const { isVisible } = this.state;
    const {
      children,
      visible,
      onCancel = () => { },
      afterClose = () => { },
      onOk = () => { },
      search, form = {},
      ...pr
    } = this.props;



    return (
      <Modal
        visible={isVisible}
        onCancel={() => this._onCancel(onCancel)}
        afterClose={() => this._afterClose(afterClose)}
        onOk={(e) => { onOk(e, this.form, (f) => this.show(f)) }}
        {...pr}
      >
        <Form
          // ref="form"
          wrappedComponentRef={(inst) => this.form = inst && inst.props.form}
          {...form}
        />
      </Modal>
    )
  }


}