import React, { Component } from 'react';

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

class SuperForm extends Component {
  constructor(props) {
    super(props)
    this.list = React.createRef();
    this.form = React.createRef();
  }

  refresh() {
    this.list.current.refresh();
  }

  render() {
    const {
      type = 'table',   // 类型
      search, autoSearchEvent, _bindForm, // search form 配置, onSearch 为自动传入事件
      table,  // table or list 配置
      // 样式
      formStyle = {},
      tableStyle = {},
      ...props,
    } = this.props;
    return (
      <div>
        <div className={styles.form} style={formStyle}>
          <Form ref={this.form} {...search} autoSearchEvent={autoSearchEvent} _bindForm={_bindForm} />
        </div>
        <div className={styles.table} style={tableStyle}>
          {
            type === 'table' ? <Table ref={this.list} {...table} {...props} /> : <List ref={this.list} {...table} {...props} />
          }
        </div>

      </div>
    )
  }
}

export default withSearch(SuperForm) 