'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

require('antd/es/upload/style');
var _Upload = _interopDefault(require('antd/es/upload'));
require('antd/es/steps/style');
var _Steps = _interopDefault(require('antd/es/steps'));
require('antd/es/checkbox/style');
var _Checkbox = _interopDefault(require('antd/es/checkbox'));
require('antd/es/radio/style');
var _Radio = _interopDefault(require('antd/es/radio'));
require('antd/es/mentions/style');
var _Mentions = _interopDefault(require('antd/es/mentions'));
require('antd/es/select/style');
var _Select = _interopDefault(require('antd/es/select'));
require('antd/es/button/style');
var _Button = _interopDefault(require('antd/es/button'));
require('antd/es/time-picker/style');
var _TimePicker = _interopDefault(require('antd/es/time-picker'));
require('antd/es/date-picker/style');
var _DatePicker = _interopDefault(require('antd/es/date-picker'));
require('antd/es/switch/style');
var _Switch = _interopDefault(require('antd/es/switch'));
require('antd/es/slider/style');
var _Slider = _interopDefault(require('antd/es/slider'));
require('antd/es/rate/style');
var _Rate = _interopDefault(require('antd/es/rate'));
require('antd/es/auto-complete/style');
var _AutoComplete = _interopDefault(require('antd/es/auto-complete'));
require('antd/es/cascader/style');
var _Cascader = _interopDefault(require('antd/es/cascader'));
require('antd/es/input-number/style');
var _InputNumber = _interopDefault(require('antd/es/input-number'));
require('antd/es/input/style');
var _Input = _interopDefault(require('antd/es/input'));
var React = require('react');
var React__default = _interopDefault(React);
require('antd/es/form/style');
var _Form2 = _interopDefault(require('antd/es/form'));
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

var events = ['onClick', 'onChange', 'onBlur', 'onFocus', 'onHoverChange', 'onKeyDown', 'onSelect', 'onOk', 'onPressEnter'];

var injectEvent = (function (obj, form) {
  var newObj = _extends({}, obj);

  events.forEach(function (item) {
    if (obj[item]) {
      newObj[item] = function () {
        for (var _len = arguments.length, props = Array(_len), _key = 0; _key < _len; _key++) {
          props[_key] = arguments[_key];
        }

        return obj[item].apply(obj, props.concat([form]));
      };
    }
  });

  return newObj;
});

var AntdElements = {
  // 类一
  input: _Input,
  inputnumber: _InputNumber,
  'textarea': _Input.TextArea,
  'password': _Input.Password,
  cascader: _Cascader,
  autocomplete: _AutoComplete,
  rate: _Rate,
  slider: _Slider,
  switch: _Switch,
  datepicker: _DatePicker,
  rangepicker: _DatePicker.RangePicker,
  monthpicker: _DatePicker.MonthPicker,
  timepicker: _TimePicker,

  // 类二
  button: _Button,

  // 类三
  select: _Select,
  mentions: _Mentions,
  radio: _Radio,
  radiogroup: _Radio,
  radiobutton: _Radio,
  checkbox: _Checkbox,
  checkboxgroup: _Checkbox,

  //
  steps: _Steps,

  // 类四
  upload: _Upload

  //

};

var toString = Object.prototype.toString;
var transToArray = function transToArray(obj) {
  if (toString.call(obj) === '[object Object]') {
    return Object.keys(obj).map(function (key) {
      return { label: obj[key], value: key };
    });
  } else if (toString.call(obj) === '[object Array]') {
    return obj;
  }

  throw new Error('need obj or array');
};

var createFormItem = (function (obj, form) {
  var _obj$type = obj.type,
      type = _obj$type === undefined ? 'defaultType' : _obj$type,
      other = objectWithoutProperties(obj, ['type']);
  // 事件参数注入

  var props = injectEvent(other, form);

  var t = type.toLocaleLowerCase();
  var Component = AntdElements[t];

  var formElement = null;
  switch (t) {
    case 'button':
      {
        var autoSearchEvent = props.autoSearchEvent,
            buttonType = props.buttonType,
            text = props.text,
            pr = objectWithoutProperties(props, ['autoSearchEvent', 'buttonType', 'text']);

        if (autoSearchEvent) {
          if (props.onClick) {
            var old = props.onClick;
            pr.onClick = function (e, form) {
              old(e, form);
              autoSearchEvent(form);
            };
          } else {
            pr.onClick = function () {
              autoSearchEvent(form);
            };
          }
        }

        formElement = React__default.createElement(
          Component,
          _extends({ type: buttonType }, pr),
          text
        );
      }

      break;
    case 'input':
    case 'inputnumber': // InputNumber
    case 'password': // Input.Number
    case 'textarea': // Input.TextArea
    case 'switch':
    case 'slider':
    case 'datepicker':
    case 'rangepicker':
    case 'monthpicker':
    case 'timepicker':
    case 'cascader':
    case 'autocomplete':
    case 'rate':
      {
        formElement = React__default.createElement(Component, props);
      }
      break;

    // case '':
    //   case 'upload':
    // {
    //   let {
    //     innerHTML = () => {
    //       return (<div style={uploadStyle}>
    //         <Icon type={this.state.loading ? 'loading' : 'plus'} />
    //         <div className="ant-upload-text">上传</div>
    //       </div>)
    //     }
    //     , ...pr
    //   } = props;

    //   formElement = <Component {...pr} >
    //     {
    //       innerHTML && innerHTML()
    //     }
    //   </Component>
    // }

    // break;

    case 'select':
    case 'mentions':
      {
        var _props$options = props.options,
            options = _props$options === undefined ? [] : _props$options,
            _pr = objectWithoutProperties(props, ['options']);

        formElement = React__default.createElement(
          Component,
          _pr,
          transToArray(options).map(function (item) {
            return React__default.createElement(
              Component.Option,
              { key: item.key || item.value, value: item.value },
              item.label
            );
          })
        );
      }
      break;

    case 'checkbox':
    case 'radio':
    case 'upload':
      {
        var innerHTML = props.innerHTML,
            _pr2 = objectWithoutProperties(props, ['innerHTML']);

        formElement = React__default.createElement(
          Component,
          _pr2,
          innerHTML && innerHTML()
        );
      }
      break;

    case 'checkboxgroup':
    case 'radiogroup':
      {
        var _props$options2 = props.options,
            _options = _props$options2 === undefined ? [] : _props$options2,
            _pr3 = objectWithoutProperties(props, ['options']);

        formElement = React__default.createElement(
          Component.Group,
          _pr3,
          transToArray(_options).map(function (item) {
            return React__default.createElement(
              Component,
              { key: item.key || item.value, value: item.value },
              item.label
            );
          })
        );
      }

      break;
    case 'radiobutton':
      {
        var _props$options3 = props.options,
            _options2 = _props$options3 === undefined ? [] : _props$options3,
            _pr4 = objectWithoutProperties(props, ['options']);

        formElement = React__default.createElement(
          Component.Group,
          _pr4,
          transToArray(_options2).map(function (item) {
            return React__default.createElement(
              Component.Button,
              { key: item.key || item.value, value: item.value },
              item.label
            );
          })
        );
      }
      break;

    case 'steps':
      {
        var _props$options4 = props.options,
            _options3 = _props$options4 === undefined ? [] : _props$options4,
            _pr5 = objectWithoutProperties(props, ['options']);

        formElement = React__default.createElement(
          Component,
          _pr5,
          transToArray(_options3).map(function (item, ind) {
            return React__default.createElement(Component.Step, _extends({ key: item.key || item.title }, item));
          })
        );
      }
      break;

    default:
      formElement = React__default.createElement('input', { placeholder: 'default element' });
  }

  return formElement;
});

var filter = function filter(fieldsValue) {
  var ret = {};
  var formValues = {};
  var values = _extends({}, fieldsValue);
  // 移除空的字段
  Object.keys(values).forEach(function (key) {
    var val = values[key];
    if (Object.prototype.toString.call(val) !== "[object Undefined]" && val !== '') {
      formValues[key] = val;
    }
  });

  Object.keys(formValues).map(function (key) {
    if (!key.includes(',')) ret[key] = formValues[key];
  });

  return ret;
};

var _Form = function (_Component) {
  inherits(_Form, _Component);

  function _Form() {
    classCallCheck(this, _Form);
    return possibleConstructorReturn(this, (_Form.__proto__ || Object.getPrototypeOf(_Form)).apply(this, arguments));
  }

  createClass(_Form, [{
    key: 'getFieldsValue',
    value: function getFieldsValue() {
      var form = this.props.form;

      var fieldsValue = form.getFieldsValue();

      var formValues = filter(fieldsValue);

      return formValues;
    }
  }, {
    key: '_transFuncToObj',
    value: function _transFuncToObj() {
      var func = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var form = arguments[1];

      if (Object.prototype.toString.call(func) === '[object Function]') {
        return func(form, this);
      } else {
        return func;
      }
    }
  }, {
    key: '_renderElement',
    value: function _renderElement(form, getFieldDecorator, autoSearchEvent) {
      var _this2 = this;

      var data = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

      return data.map(function (item, index) {
        var _item$visible = item.visible,
            visible = _item$visible === undefined ? true : _item$visible,
            label = item.label,
            _item$extra = item.extra,
            extra = _item$extra === undefined ? null : _item$extra,
            _item$hasFeedback = item.hasFeedback,
            hasFeedback = _item$hasFeedback === undefined ? false : _item$hasFeedback,
            _item$formItemLayout = item.formItemLayout,
            formItemLayout = _item$formItemLayout === undefined ? {} : _item$formItemLayout,
            unbind = item.unbind,
            _item$key = item.key,
            key = _item$key === undefined ? 'random_key_' + Math.random() : _item$key,
            _item$config = item.config,
            config = _item$config === undefined ? {} : _item$config,
            render = item.render,
            renderFix = item.renderFix,
            _item$bindSearch = item.bindSearch,
            bindSearch = _item$bindSearch === undefined ? false : _item$bindSearch,
            type = item.type,
            props = objectWithoutProperties(item, ['visible', 'label', 'extra', 'hasFeedback', 'formItemLayout', 'unbind', 'key', 'config', 'render', 'renderFix', 'bindSearch', 'type']);

        var ret = null;
        if (visible === false) {
          return;
        } else if (type === 'br') {
          return React__default.createElement('br', { key: index });
        } else if (type === 'span') {
          return React__default.createElement(
            'span',
            _extends({ key: index }, props),
            label
          );
        } else if (type === 'hidden') {
          return React__default.createElement(
            _Form2.Item,
            { key: index, style: { display: 'none' } },
            getFieldDecorator(key, _this2._transFuncToObj(config, form))(createFormItem({
              type: 'input',
              hidden: true
            }, form))
          );
        } else if (type === 'group') {
          ret = _this2._renderElement(form, getFieldDecorator, autoSearchEvent, item.children);
        } else if (render) {
          var renderItem = render(form, _Form2.Item) || React__default.createElement('input', { placeholder: 'default: render need return' });
          ret = unbind === true ? renderItem : getFieldDecorator(key, _this2._transFuncToObj(config, form))(renderItem);
        } else {

          var _item = _extends({
            type: type
          }, props);
          if (bindSearch) _item.autoSearchEvent = autoSearchEvent;
          var _renderItem = createFormItem(_item, form);
          ret = type === 'button' ? _renderItem : getFieldDecorator(key, _this2._transFuncToObj(config, form, _this2))(_renderItem);
        }

        return React__default.createElement(
          _Form2.Item,
          _extends({ label: label, key: index, extra: extra, hasFeedback: hasFeedback }, formItemLayout),
          renderFix ? renderFix(ret) : ret
        );
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          form = _props.form,
          formLayout = _props.formLayout,
          _props$layout = _props.layout,
          layout = _props$layout === undefined ? "horizontal" : _props$layout,
          _props$data = _props.data,
          data = _props$data === undefined ? [] : _props$data,
          autoSearchEvent = _props.autoSearchEvent;
      var getFieldDecorator = form.getFieldDecorator;


      var _formLayout = formLayout || (layout === 'horizontal' ? {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      } : {});

      return React__default.createElement(
        _Form2,
        _extends({ layout: layout }, _formLayout),
        this._renderElement(form, getFieldDecorator, autoSearchEvent, this._transFuncToObj(data, form))
      );
    }
  }]);
  return _Form;
}(React.Component);

var Form = _Form2.create()(_Form);

var withPagination = (function (Component) {
  return function (_React$Component) {
    inherits(_class, _React$Component);

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
      key: "_init",
      value: function _init(props) {
        var _this2 = this;

        var _props$pagination = props.pagination,
            pagination = _props$pagination === undefined ? false : _props$pagination,
            _props$isInit = props.isInit,
            isInit = _props$isInit === undefined ? false : _props$isInit,
            _props$dataSource = props.dataSource,
            dataSource = _props$dataSource === undefined ? [] : _props$dataSource,
            _props$total = props.total,
            total = _props$total === undefined ? 0 : _props$total;
        var _pagination$current = pagination.current,
            current = _pagination$current === undefined ? 1 : _pagination$current,
            _pagination$pageSize = pagination.pageSize,
            pageSize = _pagination$pageSize === undefined ? 10 : _pagination$pageSize,
            onShowSizeChange = pagination.onShowSizeChange;

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
    }, {
      key: "componentWillReceiveProps",
      value: function componentWillReceiveProps(props) {
        this._init(props);
      }
    }, {
      key: "componentWillMount",
      value: function componentWillMount() {
        this._init(this.props);
      }
    }, {
      key: "_pageChange",
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

      // 好像没用到

    }, {
      key: "reset",
      value: function reset() {
        var _this4 = this;

        var _props = this.props,
            _props$current = _props.current,
            current = _props$current === undefined ? 1 : _props$current,
            _props$pageSize = _props.pageSize,
            pageSize = _props$pageSize === undefined ? 10 : _props$pageSize,
            _props$dataSource2 = _props.dataSource,
            dataSource = _props$dataSource2 === undefined ? [] : _props$dataSource2,
            _props$total2 = _props.total,
            total = _props$total2 === undefined ? 0 : _props$total2;

        this.setState({
          _list: dataSource,
          _total: total,
          _current: current,
          _pageSize: pageSize
        }, function () {
          _this4._loadData();
        });
      }
    }, {
      key: "refresh",
      value: function refresh() {
        this._loadData();
      }
    }, {
      key: "_loadData",
      value: function _loadData() {
        var _babelHelpers$extends,
            _this5 = this;

        var _state = this.state,
            _current = _state._current,
            _pageSize = _state._pageSize;
        var _props2 = this.props,
            action = _props2.action,
            _props2$pageName = _props2.pageName,
            pageName = _props2$pageName === undefined ? "page" : _props2$pageName,
            _props2$pageSizeName = _props2.pageSizeName,
            pageSizeName = _props2$pageSizeName === undefined ? "pageSize" : _props2$pageSizeName,
            _props2$valueMap = _props2.valueMap,
            valueMap = _props2$valueMap === undefined ? function (res) {
          return {
            status: true,
            dataSource: res.entry,
            total: res.totalRecordSize
          };
        } : _props2$valueMap,
            _props2$actionError = _props2.actionError,
            actionError = _props2$actionError === undefined ? function (msg) {
          return console.error(msg);
        } : _props2$actionError,
            _props2$params = _props2.params,
            params = _props2$params === undefined ? function () {
          return {};
        } : _props2$params,
            _props2$extraParams = _props2.extraParams,
            extraParams = _props2$extraParams === undefined ? function () {
          return {};
        } : _props2$extraParams;

        var values = _extends({}, params(), extraParams(), (_babelHelpers$extends = {}, defineProperty(_babelHelpers$extends, pageName, _current), defineProperty(_babelHelpers$extends, pageSizeName, _pageSize), _babelHelpers$extends));

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
            _this5.setState({
              _list: dataSource,
              _total: total
            });
          } else {
            actionError(res.message);
          }
        });
      }
    }, {
      key: "render",
      value: function render() {
        var _this6 = this;

        var _state2 = this.state,
            _state2$_list = _state2._list,
            _list = _state2$_list === undefined ? [] : _state2$_list,
            _total = _state2._total,
            _current = _state2._current,
            _pageSize = _state2._pageSize;

        var _props3 = this.props,
            _props3$pagination = _props3.pagination,
            pagination = _props3$pagination === undefined ? true : _props3$pagination,
            action = _props3.action,
            params = _props3.params,
            extraParams = _props3.extraParams,
            pageName = _props3.pageName,
            pageSizeName = _props3.pageSizeName,
            valueMap = _props3.valueMap,
            actionError = _props3.actionError,
            isInit = _props3.isInit,
            props = objectWithoutProperties(_props3, ["pagination", "action", "params", "extraParams", "pageName", "pageSizeName", "valueMap", "actionError", "isInit"]);
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
              _onChange = _pagination$onChange === undefined ? function () {} : _pagination$onChange,
              _pagination$showTotal = pagination.showTotal,
              showTotal = _pagination$showTotal === undefined ? function (total, range) {
            return range[0] + "-" + range[1] + " \u6761, \u5171 " + total + " \u6761";
          } : _pagination$showTotal,
              _pagination$onShowSiz = pagination.onShowSizeChange,
              _onShowSizeChange = _pagination$onShowSiz === undefined ? function () {} : _pagination$onShowSiz,
              config = objectWithoutProperties(pagination, ["total", "current", "pageSize", "showSizeChanger", "onChange", "showTotal", "onShowSizeChange"]);

          _pagination = _extends({
            total: _total,
            current: _current,
            pageSize: _pageSize,
            onChange: function onChange() {
              _this6._pageChange.apply(_this6, arguments);
              _onChange.apply(undefined, arguments);
            },
            showTotal: showTotal,
            showSizeChanger: showSizeChanger,
            onShowSizeChange: function onShowSizeChange(current, pageSize) {
              _this6._pageChange(current, pageSize);
              _onShowSizeChange(current, pageSize);
            }
          }, config);
        }
        return React__default.createElement(Component, _extends({}, props, { dataSource: _list, pagination: _pagination }));
      }
    }]);
    return _class;
  }(React__default.Component);
});

var Table = withPagination(_Table);

var List = withPagination(_List);

var _class = function (_Component) {
  inherits(_class, _Component);

  function _class() {
    classCallCheck(this, _class);

    var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

    _this.state = {
      isVisible: false
    };

    return _this;
  }

  createClass(_class, [{
    key: 'componentWillMount',
    value: function componentWillMount() {

      this.setState({
        isVisible: this.props.visible
      });
    }
  }, {
    key: 'show',
    value: function show() {
      var isShow = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;


      this.setState({
        isVisible: isShow
      });
    }
  }, {
    key: 'getFieldsValue',
    value: function getFieldsValue() {
      // return this.refs.form.getFieldsValue();
      return this.form.getFieldsValue();
    }
  }, {
    key: '_onCancel',
    value: function _onCancel(callback) {
      this.setState({
        isVisible: false
      }, function () {
        callback && callback();
      });
    }
  }, {
    key: '_afterClose',
    value: function _afterClose(callback) {
      this.form.resetFields();
      callback && callback();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var isVisible = this.state.isVisible;

      var _props = this.props,
          children = _props.children,
          visible = _props.visible,
          _props$onCancel = _props.onCancel,
          _onCancel2 = _props$onCancel === undefined ? function () {} : _props$onCancel,
          _props$afterClose = _props.afterClose,
          _afterClose2 = _props$afterClose === undefined ? function () {} : _props$afterClose,
          _props$onOk = _props.onOk,
          _onOk = _props$onOk === undefined ? function () {} : _props$onOk,
          search = _props.search,
          _props$form = _props.form,
          form = _props$form === undefined ? {} : _props$form,
          pr = objectWithoutProperties(_props, ['children', 'visible', 'onCancel', 'afterClose', 'onOk', 'search', 'form']);

      return React__default.createElement(
        _Modal,
        _extends({
          visible: isVisible,
          onCancel: function onCancel() {
            return _this2._onCancel(_onCancel2);
          },
          afterClose: function afterClose() {
            return _this2._afterClose(_afterClose2);
          },
          onOk: function onOk(e) {
            _onOk(e, _this2.form, function (f) {
              return _this2.show(f);
            });
          }
        }, pr),
        React__default.createElement(Form
        // ref="form"
        , _extends({ wrappedComponentRef: function wrappedComponentRef(inst) {
            return _this2.form = inst && inst.props.form;
          }
        }, form))
      );
    }
  }]);
  return _class;
}(React.Component);

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
  return function (_React$Component) {
    inherits(_class, _React$Component);

    function _class(props) {
      classCallCheck(this, _class);

      var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this, props));

      _this.state = {
        formValues: {}
      };

      _this.hoc = React__default.createRef();
      return _this;
    }

    createClass(_class, [{
      key: '_search',
      value: function _search(fieldsValue) {
        var _this2 = this;

        var formValues = filter(fieldsValue);

        this.setState({
          formValues: formValues
        }, function () {
          // 待实现的接口 : 模拟 interface or 
          _this2.refresh();
        });
      }
      // 由子类进行实现或重写

    }, {
      key: 'refresh',
      value: function refresh() {
        this.hoc.current.refresh();
      }
    }, {
      key: 'resetFields',
      value: function resetFields() {
        this.props.form.resetFields();
        this.setState({
          formValues: {}
        });
      }
    }, {
      key: '_getSearchParams',
      value: function _getSearchParams() {
        return this.state.formValues;
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var props = _extends({}, this.props, {
          // 新增了 两个函数, 一个是获取参数数据, 一个是进行请求
          params: function params() {
            return _this3._getSearchParams();
          },
          autoSearchEvent: function autoSearchEvent(form) {
            return _this3._search(form.getFieldsValue());
          }
        });

        return React__default.createElement(Component, _extends({ ref: this.hoc }, props));
      }
    }]);
    return _class;
  }(React__default.Component);
});

var SuperForm = function (_Component) {
  inherits(SuperForm, _Component);

  function SuperForm(props) {
    classCallCheck(this, SuperForm);

    var _this = possibleConstructorReturn(this, (SuperForm.__proto__ || Object.getPrototypeOf(SuperForm)).call(this, props));

    _this.list = React__default.createRef();
    return _this;
  }

  createClass(SuperForm, [{
    key: 'refresh',
    value: function refresh() {
      this.list.current.refresh();
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          _props$type = _props.type,
          type = _props$type === undefined ? 'table' : _props$type,
          search = _props.search,
          autoSearchEvent = _props.autoSearchEvent,
          table = _props.table,
          props = objectWithoutProperties(_props, ['type', 'search', 'autoSearchEvent', 'table']);


      return React__default.createElement(
        'div',
        null,
        React__default.createElement(
          'div',
          { className: styles.form },
          React__default.createElement(Form, _extends({}, search, { autoSearchEvent: autoSearchEvent }))
        ),
        React__default.createElement(
          'div',
          { className: styles.table },
          type === 'table' ? React__default.createElement(Table, _extends({ ref: this.list }, table, props)) : React__default.createElement(List, _extends({ ref: this.list }, table, props))
        )
      );
    }
  }]);
  return SuperForm;
}(React.Component);

var index = withSearch(SuperForm);

exports.Form = Form;
exports.Table = Table;
exports.List = List;
exports.Modal = _class;
exports.default = index;
//# sourceMappingURL=index.js.map
