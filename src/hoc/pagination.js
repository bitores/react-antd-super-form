import React from 'react';


export default (Component) => {
  return class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        _list: [],
        _total: 0,
        _current: 1,
        _pageSize: 10
      }
    }

    // 在生命周期中 使用 props 时要注意其有效性
    _init(props) {
      const { pagination = false, isInit = false } = props;
      const { current = 1, pageSize = 10, onShowSizeChange } = pagination;
      this.setState({
        _list: [],
        _total: 0,
        _current: current,
        _pageSize: pageSize
      }, () => {
        // 初始化 是否要求加载数据
        isInit && this._loadData();
      })
    }

    componentWillReceiveProps(props) {
      this._init(props)

    }

    componentWillMount() {
      this._init(this.props)
    }

    _pageChange(_current = 1, _pageSize = 10) {
      this.setState({
        _current,
        _pageSize
      }, () => {
        this._loadData();
      })
    }

    reset() {
      const { current = 1, pageSize = 10 } = this.props;
      this.setState({
        _list: [],
        _total: 0,
        _current: current,
        _pageSize: pageSize
      }, () => {
        this._loadData();
      })
    }

    refresh() {
      this._loadData();
    }

    _filter(params = {}) {
      const ret = {};
      Object.keys(params).map(key => {
        if (!key.includes(',')) ret[key] = params[key]
      })

      return ret;
    }

    _loadData() {
      const { _current, _pageSize } = this.state;
      const { action, valueMap = (res) => {
        return {
          status: true,
          list: res.entry,
          total: res.totalRecordSize
        }
      }, actionError = (msg) => console.error(msg), params = () => { return {} } } = this.props;
      const values = {
        ...this._filter(params()),
        page: _current,
        pageSize: _pageSize
      }

      let request = null;
      if (action) {
        request = action(values);

      } else {
        throw new Error('need action filed')
      }

      request.then(res => {
        const { list, total, status } = valueMap(res);
        if (status) {
          this.setState({
            _list: list,
            _total: total
          })
        } else {
          actionError(res.message)
        }
      })
    }

    render() {
      const { _list = [], _total, _current, _pageSize } = this.state;
      const { pagination = true, action, params, valueMap, isInit, ...props } = this.props;
      // 追加 pagination 配置
      let _pagination = null;
      if (pagination === false) {
        _pagination = false
      } else {
        const {
          total, current, pageSize,
          showSizeChanger = true,
          onChange = () => { },
          showTotal = (total, range) => `${range[0]}-${range[1]} 条, 共 ${total} 条`,
          onShowSizeChange = () => { }, ...config
        } = pagination;
        _pagination = {
          total: _total,
          current: _current,
          pageSize: _pageSize,
          onChange: (...pr) => {
            this._pageChange(...pr);
            onChange(...pr);
          },
          showTotal,
          showSizeChanger,
          onShowSizeChange: (current, pageSize) => {
            this._pageChange(current, pageSize);
            onShowSizeChange(current, pageSize)
          },
          ...config
        }
      }
      return (
        <Component {...props} dataSource={_list} pagination={_pagination} />
      )
    }
  }
}
