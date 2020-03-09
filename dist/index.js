'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('antd/es/input/style');
var _Input = _interopDefault(require('antd/es/input'));
require('antd/es/form/style');
var _Form = _interopDefault(require('antd/es/form'));
var React = require('react');
var React__default = _interopDefault(React);
require('antd/es/table/style');
var _Table = _interopDefault(require('antd/es/table'));
require('antd/es/list/style');
var _List = _interopDefault(require('antd/es/list'));
require('antd/es/modal/style');
var _Modal = _interopDefault(require('antd/es/modal'));

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};

var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

var toString = Object.prototype.toString;

var filter = function filter(fieldsValue) {
  var ret = {};
  var formValues = {};
  var values = _extends({}, fieldsValue);
  // 移除空的字段
  Object.keys(values).forEach(function (key) {
    var val = values[key];
    if (toString.call(val) !== "[object Undefined]" && val !== '') {
      if (toString.call(val) == "[object String]") {
        val = val.trim();
        if (val !== '') {
          formValues[key] = val;
        }
      } else {
        formValues[key] = val;
      }
    }
  });

  Object.keys(formValues).map(function (key) {
    if (!key.includes(',')) ret[key] = formValues[key];
  });

  return ret;
};

function diff(o, n) {
  // for Array & Object
  // 如果类型不一样， n 为全新
  var dType = toString.call(n);
  if (dType !== toString.call(o)) return n;
  var diffData = undefined;
  switch (dType) {
    case "[object Number]":
    case "[object String]":
    case "[object Boolean]":
      {
        if (o !== n) diffData = n;
      }
break;
    case "[object Array]":
      {
        if (o.length !== n.length) diffData = n;else {
          var r = o.reduce(function (total, item, i) {
            var r = diff(item, n[i]);
            if (r !== undefined) {
              total.push(n[i]);
            }            return total;
          }, []);
          if (r.length > 0) diffData = n;
        }
      }
break;
    case "[object Object]":
      {
        var keys = Object.keys(n);
        if (keys.length !== Object.keys(o).length) diffData = n;else {
          var _r = keys.reduce(function (total, key) {
            var r = diff(o[key], n[key]);
            if (r !== undefined) {
              return _extends({}, total, defineProperty({}, key, n[key]));
            }

            return total;
          }, undefined);

          if (_r !== undefined) {
            diffData = _r;
          }
        }
      }break;
  }

  return diffData;
}

var _this = undefined;

function createFormItem(obj, form) {
  // console.log(obj.cType.name)
  var AntdComponent = obj.cType,
      child = obj.child,
      innerHTML = obj.innerHTML,
      bindSearchEvent = obj.bindSearchEvent,
      props = objectWithoutProperties(obj, ['cType', 'child', 'innerHTML', 'bindSearchEvent']);
  // const AntdComponent = obj.cType;

  if (bindSearchEvent) {
    if (obj.onClick) {
      // const onClick = obj.onClick;
      props.onClick = function (e) {
        obj.onClick(e, form);
        bindSearchEvent(form);
      };
    } else {
      props.onClick = function () {
        bindSearchEvent(form);
      };
    }
  }

  return React__default.createElement(
    AntdComponent,
    props,
    child || innerHTML && innerHTML()
  );
}

var Form = React.memo(function (props, ref) {
  var _useState = React.useState({}),
      _useState2 = slicedToArray(_useState, 1),
      initialValues = _useState2[0];

  var _Form$useForm = _Form.useForm(),
      _Form$useForm2 = slicedToArray(_Form$useForm, 1),
      form = _Form$useForm2[0];

  var _props$_bindForm = props._bindForm,
      _bindForm = _props$_bindForm === undefined ? function () {} : _props$_bindForm,
      formLayout = props.formLayout,
      _props$layout = props.layout,
      layout = _props$layout === undefined ? "horizontal" : _props$layout,
      _props$data = props.data,
      data = _props$data === undefined ? [] : _props$data,
      autoSearchEvent = props.autoSearchEvent;

  var innerFormLayout = formLayout || (layout === 'horizontal' ? {
    labelCol: { span: 6 },
    wrapperCol: { span: 14 }
  } : {});

  _bindForm(form);

  var transFuncToObj = function transFuncToObj() {
    var func = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var ret = null;
    if (Object.prototype.toString.call(func) === '[object Function]') {
      ret = func(form, _this);
    } else {
      ret = func;
    }

    return ret;
  };

  function transConfig(_ref) {
    var initialValue = _ref.initialValue,
        config = objectWithoutProperties(_ref, ['initialValue']);

    return config;
  }

  var renderElement = function renderElement(bindSearchEvent) {
    var formData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    var initialValues = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    return formData.map(function (item, _) {
      var _item$visible = item.visible,
          visible = _item$visible === undefined ? true : _item$visible,
          unbind = item.unbind,
          _item$key = item.key,
          key = _item$key === undefined ? 'random_key_' + Math.random() : _item$key,
          _item$formItem = item.formItem,
          formItem = _item$formItem === undefined ? {} : _item$formItem,
          _item$config = item.config,
          config = _item$config === undefined ? {} : _item$config,
          label = item.label,
          _item$extra = item.extra,
          extra = _item$extra === undefined ? null : _item$extra,
          _item$hasFeedback = item.hasFeedback,
          hasFeedback = _item$hasFeedback === undefined ? false : _item$hasFeedback,
          render = item.render,
          renderFix = item.renderFix,
          _item$bindSearch = item.bindSearch,
          bindSearch = _item$bindSearch === undefined ? false : _item$bindSearch,
          cType = item.cType,
          itemProps = objectWithoutProperties(item, ['visible', 'unbind', 'key', 'formItem', 'config', 'label', 'extra', 'hasFeedback', 'render', 'renderFix', 'bindSearch', 'cType']);


      var formItemProps = _extends({
        name: key,
        label: label,
        extra: extra,
        hasFeedback: hasFeedback
      }, formItem, transConfig(config));

      if (config.hasOwnProperty('initialValue')) {
        initialValues[item.key] = config.initialValue;
      } else {
        console.log('no config', item.key);
      }

      var ret = null;
      if (visible !== false) {
        if (cType === 'br') {
          ret = React__default.createElement('p', { style: {
              display: 'block',
              width: '100%',
              height: 0,
              margin: 0,
              padding: 0
            } });
        } else if (cType === 'span') {
          ret = React__default.createElement(
            'span',
            itemProps,
            label
          );
        } else if (cType === 'hidden') {
          ret = React__default.createElement(
            _Form.Item,
            _extends({ noStyle: true, key: key }, formItemProps),
            createFormItem({
              cType: _Input,
              hidden: true
            }, form)
          );
        } else if (cType === 'group') {
          ret = React__default.createElement(
            _Form.Item,
            _extends({ key: key }, formItemProps),
            renderElement(bindSearchEvent, item.children, initialValues)
          );
        } else if (render) {
          var renderItem = render(form, _Form.Item);
          ret = React__default.createElement(
            _Form.Item,
            _extends({ key: key }, formItemProps),
            renderFix ? renderFix(renderItem) : renderItem
          );
        } else {

          var eleConfig = _extends({
            cType: cType
          }, itemProps);

          if (bindSearch) {
            eleConfig.bindSearchEvent = bindSearchEvent;
          }

          var _renderItem = createFormItem(eleConfig, form);

          ret = React__default.createElement(
            _Form.Item,
            _extends({ key: key }, formItemProps),
            renderFix ? renderFix(_renderItem) : _renderItem
          );
        }
      }

      return ret;
    });
  };

  var renderItems = renderElement(autoSearchEvent, transFuncToObj(data), initialValues);
  var values = Object.assign({}, initialValues);
  var valueRef = React.useRef({});

  React.useEffect(function () {

    form.setFieldsValue(diff(valueRef.current, values) || {});
    valueRef.current = values;
  }, [values]);

  return React__default.createElement(
    _Form,
    _extends({ layout: layout }, innerFormLayout, { form: form, initialValues: values }),
    renderItems,
    React__default.Children.map(props.children, function (child) {
      return child;
    })
  );
});

var withPagination = (function (Component) {
  return function (_React$PureComponent) {
    inherits(_class, _React$PureComponent);

    function _class(props) {
      classCallCheck(this, _class);

      var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

      _this.state = {
        _list: [],
        _total: 0,
        _current: 1,
        _pageSize: 10
      };
      return _this;
    }

    // 在生命周期中 使用 props 时要注意其有效性


    createClass(_class, [{
      key: '_init',
      value: function _init(props) {
        var _this2 = this;

        var isInit = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var _props$pagination = props.pagination,
            pagination = _props$pagination === undefined ? false : _props$pagination,
            dataSource = props.dataSource,
            _props$total = props.total,
            total = _props$total === undefined ? 0 : _props$total;
        var _pagination$current = pagination.current,
            current = _pagination$current === undefined ? 1 : _pagination$current,
            _pagination$pageSize = pagination.pageSize,
            pageSize = _pagination$pageSize === undefined ? 10 : _pagination$pageSize;

        this.setState({
          _list: dataSource, // 初始化数据,可来自外部
          _total: total,
          _current: current,
          _pageSize: pageSize
        }, function () {
          // 初始化 是否要求加载数据
          isInit && _this2._loadData();
        });
      }

      // 同步初始化数据

    }, {
      key: 'componentWillMount',
      value: function componentWillMount() {
        this._init(this.props, this.props.isInit);
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

    }, {
      key: 'reset',
      value: function reset() {
        var needLoad = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        this._init(this.props, needLoad);
      }

      // 刷新 当前状态下进行数据加载

    }, {
      key: 'refresh',
      value: function refresh() {
        this._loadData();
      }

      // 换页 改变状态下进行数据加载

    }, {
      key: '_pageChange',
      value: function _pageChange() {
        var _this3 = this;

        var _current = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

        var _pageSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;

        this.setState({
          _current: _current,
          _pageSize: _pageSize
        }, function () {
          _this3._loadData();
        });
      }
    }, {
      key: '_loadData',
      value: function _loadData() {
        var _babelHelpers$extends,
            _this4 = this;

        var _state = this.state,
            _current = _state._current,
            _pageSize = _state._pageSize;
        var _props = this.props,
            action = _props.action,
            _props$pageName = _props.pageName,
            pageName = _props$pageName === undefined ? "page" : _props$pageName,
            _props$pageSizeName = _props.pageSizeName,
            pageSizeName = _props$pageSizeName === undefined ? "pageSize" : _props$pageSizeName,
            _props$valueMap = _props.valueMap,
            valueMap = _props$valueMap === undefined ? function (res) {
          return {
            status: res.status,
            dataSource: res.entry,
            total: res.totalRecordSize
          };
        } : _props$valueMap,
            _props$actionError = _props.actionError,
            actionError = _props$actionError === undefined ? function (msg) {
          return console.error(msg);
        } : _props$actionError,
            _props$params = _props.params,
            params = _props$params === undefined ? function () {
          return {};
        } : _props$params,
            _props$extraParams = _props.extraParams,
            extraParams = _props$extraParams === undefined ? function () {
          return {};
        } : _props$extraParams;


        var _val = toString.call(extraParams) === "[object Function]" ? extraParams() : extraParams;
        var values = _extends({}, _val, params(), (_babelHelpers$extends = {}, defineProperty(_babelHelpers$extends, pageName, _current), defineProperty(_babelHelpers$extends, pageSizeName, _pageSize), _babelHelpers$extends));

        // return;
        var request = null;
        if (action) {
          request = action(values);
        } else {
          throw new Error('need action filed');
        }

        request.then(function (res) {
          var _valueMap = valueMap(res),
              dataSource = _valueMap.dataSource,
              total = _valueMap.total,
              status = _valueMap.status;

          if (status) {
            _this4.setState({
              _list: dataSource,
              _total: total
            });
          } else {
            actionError(res.message);
          }
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this5 = this;

        var _state2 = this.state,
            _list = _state2._list,
            _total = _state2._total,
            _current = _state2._current,
            _pageSize = _state2._pageSize;
        var _props2 = this.props,
            _props2$pagination = _props2.pagination,
            pagination = _props2$pagination === undefined ? true : _props2$pagination,
            action = _props2.action,
            params = _props2.params,
            extraParams = _props2.extraParams,
            pageName = _props2.pageName,
            pageSizeName = _props2.pageSizeName,
            valueMap = _props2.valueMap,
            actionError = _props2.actionError,
            isInit = _props2.isInit,
            props = objectWithoutProperties(_props2, ['pagination', 'action', 'params', 'extraParams', 'pageName', 'pageSizeName', 'valueMap', 'actionError', 'isInit']);
        // 追加 pagination 配置

        var _pagination = null;
        if (pagination === false) {
          _pagination = false;
        } else {
          var total = pagination.total,
              current = pagination.current,
              pageSize = pagination.pageSize,
              _pagination$showSizeC = pagination.showSizeChanger,
              showSizeChanger = _pagination$showSizeC === undefined ? true : _pagination$showSizeC,
              _pagination$onChange = pagination.onChange,
              _onChange = _pagination$onChange === undefined ? function () {
            return null;
          } : _pagination$onChange,
              _pagination$showTotal = pagination.showTotal,
              showTotal = _pagination$showTotal === undefined ? function (total, range) {
            return range[0] + '-' + range[1] + ' \u6761, \u5171 ' + total + ' \u6761';
          } : _pagination$showTotal,
              _pagination$onShowSiz = pagination.onShowSizeChange,
              _onShowSizeChange = _pagination$onShowSiz === undefined ? function () {
            return null;
          } : _pagination$onShowSiz,
              config = objectWithoutProperties(pagination, ['total', 'current', 'pageSize', 'showSizeChanger', 'onChange', 'showTotal', 'onShowSizeChange']);

          _pagination = _extends({
            total: _total || this.props.total,
            current: _current,
            pageSize: _pageSize,
            onChange: function onChange() {
              _this5._pageChange.apply(_this5, arguments);
              _onChange.apply(undefined, arguments);
            },
            showTotal: showTotal,
            showSizeChanger: showSizeChanger,
            onShowSizeChange: function onShowSizeChange(current, pageSize) {
              _this5._pageChange(current, pageSize);
              _onShowSizeChange(current, pageSize);
            }
          }, config);
        }

        return React__default.createElement(Component, _extends({}, props, { dataSource: _list || [], pagination: _pagination }));
      }
    }]);
    return _class;
  }(React__default.PureComponent);
});

var Table = withPagination(_Table);

var List = withPagination(_List);

// 此 Modal 仅对于 form 来讲
var Dialog = React.forwardRef(function (props, ref) {
  // 不接收动态属性变化
  var _useState = React.useState(props.visible || false),
      _useState2 = slicedToArray(_useState, 2),
      isVisible = _useState2[0],
      setIsVisible = _useState2[1];
  // const form = AntdForm.useForm()


  var formRef = React.useRef();

  var children = props.children,
      visible = props.visible,
      _props$onCancel = props.onCancel,
      onCancel = _props$onCancel === undefined ? function () {} : _props$onCancel,
      _props$afterClose = props.afterClose,
      _afterClose2 = _props$afterClose === undefined ? function () {} : _props$afterClose,
      _props$onOk = props.onOk,
      onOk = _props$onOk === undefined ? function (e, form, show) {} : _props$onOk,
      _props$footer = props.footer,
      footer = _props$footer === undefined ? function (cancel, ok) {} : _props$footer,
      search = props.search,
      _props$form = props.form,
      formData = _props$form === undefined ? {} : _props$form,
      _props$action = props.action,
      action = _props$action === undefined ? false : _props$action,
      extraParams = props.extraParams,
      actionError = props.actionError,
      actionSuccess = props.actionSuccess,
      pr = objectWithoutProperties(props, ['children', 'visible', 'onCancel', 'afterClose', 'onOk', 'footer', 'search', 'form', 'action', 'extraParams', 'actionError', 'actionSuccess']);

  React.useImperativeHandle(ref, function () {
    return {
      show: show
    };
  });

  function show() {
    var isShow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var callback = arguments[1];

    setIsVisible(isShow);
    callback && callback();
  }

  var _onCancel = function _onCancel(callback) {
    show(false, callback);
  };

  var _afterClose = function _afterClose(callback) {
    console.log('_afterClose', formRef.current);
    formRef.current && formRef.current.resetFields();
    callback && callback();
  };

  var _getSearchParams = function _getSearchParams() {
    return filter(form.getFieldsValue());
  };

  // 处理 自动 action start
  var autoHandleSubmit = function autoHandleSubmit() {
    var action = props.action,
        _props$extraParams = props.extraParams,
        extraParams = _props$extraParams === undefined ? {} : _props$extraParams,
        _props$actionError = props.actionError,
        actionError = _props$actionError === undefined ? function (res) {
      console.log(res);
    } : _props$actionError,
        _props$actionSuccess = props.actionSuccess,
        actionSuccess = _props$actionSuccess === undefined ? function (res) {
      console.log(res);
    } : _props$actionSuccess,
        _props$valueMap = props.valueMap,
        valueMap = _props$valueMap === undefined ? function (res) {
      return {
        status: res.status
      };
    } : _props$valueMap;

    var _val = toString.call(extraParams) === "[object Function]" ? extraParams() : extraParams;
    var values = _extends({}, _val, _getSearchParams());
    action(values).then(function (res) {
      var _valueMap = valueMap(res),
          status = _valueMap.status;

      if (status) {
        show(false, function () {
          return actionSuccess('操作成功');
        });
      } else {
        actionError(res.message);
      }
    }).catch(function (err) {
      actionError(err.message);
    });
  };

  // 处理 自动 action end


  var _onCancelDialog = function _onCancelDialog() {
    _onCancel(onCancel);
  },
      _onOk = action !== false ? autoHandleSubmit : function (e) {
    onOk(e, formRef.current, function (f) {
      return show(f);
    });
  };

  return React__default.createElement(
    _Modal,
    _extends({
      visible: isVisible,
      onCancel: _onCancelDialog,
      afterClose: function afterClose() {
        return _afterClose(_afterClose2);
      },
      onOk: _onOk,
      footer: toString.call(footer) === "[object Array]" ? footer : footer(_onCancelDialog, _onOk)
    }, pr),
    React__default.createElement(Form, _extends({ _bindForm: function _bindForm(form) {
        formRef.current = form;
      } }, formData)),
    React__default.Children.map(props.children, function (child) {
      return child;
    })
  );
  // }
});

Dialog.info = _Modal.info;
Dialog.error = _Modal.error;
Dialog.warning = _Modal.warning;
Dialog.success = _Modal.success;
Dialog.confirm = _Modal.confirm;

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style$$1 = document.createElement('style');
  style$$1.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style$$1, head.firstChild);
    } else {
      head.appendChild(style$$1);
    }
  } else {
    head.appendChild(style$$1);
  }

  if (style$$1.styleSheet) {
    style$$1.styleSheet.cssText = css;
  } else {
    style$$1.appendChild(document.createTextNode(css));
  }
}

var css = ".style_form__115ZV,\n.style_table__2ELRL {\n  background: #fff;\n  padding: 20px;\n  border-radius: 5px;\n  margin-bottom: 10px;\n}\n";
var styles = { "form": "style_form__115ZV", "table": "style_table__2ELRL" };
styleInject(css);

var withSearch = (function (Component) {
  return function (_React$PureComponent) {
    inherits(_class, _React$PureComponent);

    function _class(props) {
      classCallCheck(this, _class);

      var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

      _this.hoc = React__default.createRef();
      _this.form = null;
      return _this;
    }

    createClass(_class, [{
      key: 'reset',
      value: function reset() {
        var needLoad = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        this.hoc.current.reset(needLoad);
      }

      // 由子类进行实现或重写

    }, {
      key: 'refresh',
      value: function refresh() {
        this.hoc.current.refresh();
      }

      // resetFields() {
      //   this.props.form.resetFields();
      // }

    }, {
      key: '_getSearchParams',
      value: function _getSearchParams() {
        return filter(this.form.getFieldsValue());
      }
    }, {
      key: 'render',
      value: function render() {
        var _this2 = this;

        var props = _extends({}, this.props, {
          // 新增了 两个函数, 一个是获取参数数据, 一个是进行请求
          params: function params() {
            return _this2._getSearchParams();
          },
          // 每次点击, 都是重置数据
          autoSearchEvent: function autoSearchEvent() {
            return _this2.reset();
          },
          // 获取 form 实例
          _bindForm: function _bindForm(form) {
            _this2.form = form;
          }
        });

        return React__default.createElement(Component, _extends({ ref: this.hoc }, props));
      }
    }]);
    return _class;
  }(React__default.PureComponent);
});

var SuperForm = function SuperForm(props, ref) {

  var list = React.useRef();
  var form = React.useRef();

  React.useImperativeHandle(ref, function () {
    return {
      reset: function reset() {
        var needLoad = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

        list.current.reset(needLoad);
      },
      refresh: function refresh() {
        list.current.refresh();
      }
    };
  });

  var _props$type = props.type,
      type = _props$type === undefined ? 'table' : _props$type,
      search = props.search,
      autoSearchEvent = props.autoSearchEvent,
      _bindForm = props._bindForm,
      table = props.table,
      extra = props.extra,
      _props$formStyle = props.formStyle,
      formStyle = _props$formStyle === undefined ? {} : _props$formStyle,
      _props$tableStyle = props.tableStyle,
      tableStyle = _props$tableStyle === undefined ? {} : _props$tableStyle,
      pr = objectWithoutProperties(props, ['type', 'search', 'autoSearchEvent', '_bindForm', 'table', 'extra', 'formStyle', 'tableStyle']);

  return React__default.createElement(
    'div',
    null,
    React__default.createElement(
      'div',
      { className: styles.form, style: formStyle },
      React__default.createElement(Form, _extends({}, search, { autoSearchEvent: autoSearchEvent, _bindForm: _bindForm }))
    ),
    extra,
    React__default.createElement(
      'div',
      { className: styles.table, style: tableStyle },
      type === 'table' ? React__default.createElement(Table, _extends({ ref: list }, table, pr)) : React__default.createElement(List, _extends({ ref: list }, table, pr))
    )
  );
};

var index = withSearch(React.forwardRef(SuperForm));

exports.Form = Form;
exports.Table = Table;
exports.List = List;
exports.Modal = Dialog;
exports.default = index;
//# sourceMappingURL=index.js.map
