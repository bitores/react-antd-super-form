
import React, { useState, useRef, useImperativeHandle, forwardRef, memo } from 'react';
import { Modal } from 'antd';
import SuperTable from './index';
import { toString, filter } from './utils';

// 此 Modal 仅对于 form 来讲
const Dialog = forwardRef((props, ref) => {
  // 不接收动态属性变化
  const [isVisible, setIsVisible] = useState(props.visible || false);
  // const form = AntdForm.useForm()
  const formRef = useRef();

  const {
    children,
    visible,
    onCancel = () => { },
    afterClose = () => { },
    onOk = (e, form, show) => { },
    footer = (cancel, ok) => { },
    search, form: formData = {},
    table, formStyle, tableStyle,tablePropos,
    //
    action = false, extraParams, actionError, actionSuccess,
    //
    ...pr
  } = props;

  useImperativeHandle(ref, () => ({
    show
  }))

  function show(isShow = true, callback) {
    setIsVisible(isShow);
    callback && callback();
  }

  const _onCancel = (callback) => {
    show(false, callback)
  }

  const _afterClose = (callback) => {
    console.log('_afterClose', formRef.current)
    formRef.current && formRef.current.resetFields()
    callback && callback()
  }

  const _getSearchParams = () => {
    return filter(form.getFieldsValue())
  }

  // 处理 自动 action start
  const autoHandleSubmit = () => {
    const { action, extraParams = {}, actionError = (res) => { console.log(res) }, actionSuccess = (res) => { console.log(res) }, valueMap = (res) => {
      return {
        status: res.status
      }
    }, } = props;
    let _val = toString.call(extraParams) === "[object Function]" ? extraParams() : extraParams;
    let values = {
      ..._val,
      ..._getSearchParams()
    }
    action(values).then(res => {
      const { status } = valueMap(res)
      if (status) {
        show(false, () => actionSuccess('操作成功'))
      } else {
        actionError(res.message)
      }
    }).catch(err => {
      actionError(err.message)
    })
  }



  // 处理 自动 action end


  let _onCancelDialog = () => { _onCancel(onCancel) },
    _onOk = action !== false ? autoHandleSubmit : (e) => { onOk(e, formRef.current, (f) => show(f)) };


  return (
    <Modal
      visible={isVisible}
      onCancel={_onCancelDialog}
      afterClose={() => _afterClose(afterClose)}
      onOk={_onOk}
      footer={toString.call(footer) === "[object Array]" ? footer : footer(_onCancelDialog, _onOk, formRef)}
      {...pr}
    >
      <SuperTable 
        ref={formRef}
        search={formData}
        table={table}
        formStyle={formStyle}
        tableStyle={tableStyle}
      />
      {/* <Form _bindForm={(form) => { formRef.current = form; }} {...formData} /> */}
      {
        React.Children.map(props.children, child => child)
      }
    </Modal>
  )
  // }
})

Dialog.info = Modal.info;
Dialog.error = Modal.error;
Dialog.warning = Modal.warning;
Dialog.success = Modal.success;
Dialog.confirm = Modal.confirm;

export default Dialog;