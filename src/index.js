import React, { Component } from 'react';

import Form from './Form';
import Table from './Table';
import List from './List';
import Modal from './Modal';

import styles from './style.css';
import withSearch from './hoc/search';

export {
  Form,
  Table,
  List,
  Modal,
}

class SuperForm extends Component {

  refresh() {
    this.refs.list.refresh();
  }

  render() {
    const {
      type = 'table',   // 类型
      search, onSearch, // search form 配置, onSearch 为自动传入事件
      table, ...props  // table or list 配置
    } = this.props;

    return (
      <div>
        <div className={styles.form}>
          <Form {...search} onSearch={onSearch} />
        </div>
        <div className={styles.table}>
          {
            type === 'table' ? <Table ref="list" {...table} {...props} /> : <List ref="list" {...table} {...props} />
          }
        </div>

      </div>
    )
  }
}

export default withSearch(SuperForm) 