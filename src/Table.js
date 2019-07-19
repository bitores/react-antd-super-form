import React, { Component } from 'react';
import { Table } from 'antd';

import withPagination from './hoc/pagination';

export default withPagination(Table)