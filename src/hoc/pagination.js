import React from 'react';
import { toString } from '../utils';


export default (Component) => {
  return class extends React.PureComponent {
    constructor(props) {
      super(props);
      this.state = {
        _list: [],
        _total: 0,
        _current: 1,
        _pageSize: 10,
        _loading: false,
      }
    }

    // 在生命周期中 使用 props 时要注意其有效性
    _init(props, isInit = false) {
      const { pagination = false, dataSource, total = 0 } = props;
      const { current = 1, pageSize = 10 } = pagination;
      this.setState({
        _list: dataSource, // 初始化数据,可来自外部
        _total: total,
        _current: current,
        _pageSize: pageSize
      }, () => {
        // 初始化 是否要求加载数据
        isInit && this._loadData();
      })
    }

    // 同步初始化数据
    componentWillMount() {
      this._init(this.props, this.props.isInit)
    }

    // 处理异步传入的props, 只设置状态不进行数据加载
    // 避免由于父组件状态更新引起 数据重新获取
    // 不能要, 父组件更新, 状态回到初始值, 也不好
    // 但要解决异步 props 问题
    // componentWillReceiveProps(nextProps) {
    //   this._init(nextProps, false);
    // }

    // 重新触发按钮搜索时
    // 重置 状态回到初始并加载数据
    // 有时只是要求重置状态, 并不要求进行数据加载
    // 可以在异步 props 时进行手动调用, 不在 WillReceiveProps 中进行处理
    reset(needLoad = true) {
      this._init(this.props, needLoad)
    }

    // 刷新 当前状态下进行数据加载
    refresh() {
      this._loadData();
    }

    // 换页 改变状态下进行数据加载
    _pageChange(_current = 1, _pageSize = 10) {
      this.setState({
        _current,
        _pageSize
      }, () => {
        this._loadData();
      })
    }

    _loadData() {
      this.setState({_loading: true});
      const { _current, _pageSize } = this.state;
      const { action, pagination, pageName = "page", pageSizeName = "pageSize",
        valueMap = (res) => {
          return {
            status: res.status,
            dataSource: res.entry,
            total: res.totalRecordSize,
            message: res.message,
          }
        },
        actionError = (msg) => console.error(msg),
        params = () => ({}),
        extraParams = () => ({})
      } = this.props;

      let _val = toString.call(extraParams) === "[object Function]" ? extraParams() : extraParams;
      const values = pagination===false?{
        // 获取外部搜索参数
        ..._val,
        // 获取内部搜索参数,
        ...params(),
      }:{
        // 获取外部搜索参数
        ..._val,
        // 获取内部搜索参数,
        ...params(),
        [pageName]: _current,
        [pageSizeName]: _pageSize
      }

      // return;
      let request = null;
      if (action) {
        request = action(values);
        request.then(res => {
          const { dataSource, total, status, message } = valueMap(res);
          if (status) {
            this.setState({
              _list: dataSource,
              _total: total,
              _loading: false,
            })
          } else {
            actionError(message);
          }
        })
      } else {
        // throw new Error('need action filed')
        console.warn('!!!!!!!!!need action!!!!!!!!')
      }


    }

    render() {
      const { _list, _total, _current, _pageSize, _loading } = this.state;
      const { pagination = true, action, params, extraParams, pageName, pageSizeName, valueMap, actionError, isInit, ...props } = this.props;
      // 追加 pagination 配置
      let _pagination = null;
      if (pagination === false) {
        _pagination = false
      } else {
        const {
          total, current, pageSize,
          showSizeChanger = true,
          onChange = () => null,
          showTotal = (total, range) => `${range[0]}-${range[1]} 条, 共 ${total} 条`,
          onShowSizeChange = () => null,
          ...config
        } = pagination;
        _pagination = {
          total: _total || this.props.total,
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

      return (<Component {...props} dataSource={_list || []} pagination={_pagination} loading={_loading} />)
    }
  }
}
