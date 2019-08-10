import React from 'react';
import { Modal } from 'antd';
import Form from './Form';


export default class extends React.PureComponent {

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
      onOk = (e, form, show) => { },
      footer = (cancel, ok) => { },
      search, form = {},
      ...pr
    } = this.props;

    let _onCancel = () => this._onCancel(onCancel),
      _onOk = (e) => { onOk(e, this.form, (f) => this.show(f)) };

    return (
      <Modal
        visible={isVisible}
        onCancel={_onCancel}
        afterClose={() => this._afterClose(afterClose)}
        onOk={_onOk}
        footer={footer(_onCancel, _onOk)}
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