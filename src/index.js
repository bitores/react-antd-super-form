import React, { useImperativeHandle, forwardRef, useRef } from 'react';

import Form from './Form';
import Table from './Table';
import List from './List';
import Modal from './Modal';

import styles from './style.less';
import withSearch from './hoc/search';

export {
  Form,
  Table,
  List,
  Modal,
}

const SuperForm = (props, ref) => {

  const list = useRef();
  const form = useRef();

  useImperativeHandle(ref, () => ({
    reset: (needLoad = true) => {
      list.current.reset(needLoad);
    },
    refresh: () => {
      list.current.refresh();
    }
  }))

  const {
    type = 'table',   // 类型
    search, autoSearchEvent, _bindForm, // search form 配置, onSearch 为自动传入事件
    table,  // table or list 配置
    extra,
    // 样式
    formStyle = {},
    tableStyle = {},
    ...pr
  } = props;
  return (
    <div>
      <div className={styles.form} style={formStyle}>
        <Form  {...search} autoSearchEvent={autoSearchEvent} _bindForm={_bindForm} />
      </div>
      {extra}
      <div className={styles.table} style={tableStyle}>
        {
          type === 'table' ? <Table ref={list} {...table} {...pr} /> : <List ref={list} {...table} {...pr} />
        }
      </div>

    </div>
  )

}

export default withSearch(forwardRef(SuperForm)) 