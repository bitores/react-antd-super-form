import 'antd/es/upload/style';
import _Upload from 'antd/es/upload';
import 'antd/es/steps/style';
import _Steps from 'antd/es/steps';
import 'antd/es/checkbox/style';
import _Checkbox from 'antd/es/checkbox';
import 'antd/es/radio/style';
import _Radio from 'antd/es/radio';
import 'antd/es/mentions/style';
import _Mentions from 'antd/es/mentions';
import 'antd/es/select/style';
import _Select from 'antd/es/select';
import 'antd/es/button/style';
import _Button from 'antd/es/button';
import 'antd/es/time-picker/style';
import _TimePicker from 'antd/es/time-picker';
import 'antd/es/date-picker/style';
import _DatePicker from 'antd/es/date-picker';
import 'antd/es/switch/style';
import _Switch from 'antd/es/switch';
import 'antd/es/slider/style';
import _Slider from 'antd/es/slider';
import 'antd/es/rate/style';
import _Rate from 'antd/es/rate';
import 'antd/es/auto-complete/style';
import _AutoComplete from 'antd/es/auto-complete';
import 'antd/es/cascader/style';
import _Cascader from 'antd/es/cascader';
import 'antd/es/input-number/style';
import _InputNumber from 'antd/es/input-number';
import 'antd/es/input/style';
import _Input from 'antd/es/input';
import React, { Component } from 'react';
import 'antd/es/form/style';
import _Form2 from 'antd/es/form';
import 'antd/es/table/style';
import _Table from 'antd/es/table';
import 'antd/es/list/style';
import _List from 'antd/es/list';
import 'antd/es/modal/style';
import _Modal from 'antd/es/modal';

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
  var Component$$1 = AntdElements[t];

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

        formElement = React.createElement(
          Component$$1,
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
        formElement = React.createElement(Component$$1, props);
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

        formElement = React.createElement(
          Component$$1,
          _pr,
          transToArray(options).map(function (item) {
            return React.createElement(
              Component$$1.Option,
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

        formElement = React.createElement(
          Component$$1,
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

        formElement = React.createElement(
          Component$$1.Group,
          _pr3,
          transToArray(_options).map(function (item) {
            return React.createElement(
              Component$$1,
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

        formElement = React.createElement(
          Component$$1.Group,
          _pr4,
          transToArray(_options2).map(function (item) {
            return React.createElement(
              Component$$1.Button,
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

        formElement = React.createElement(
          Component$$1,
          _pr5,
          transToArray(_options3).map(function (item, ind) {
            return React.createElement(Component$$1.Step, _extends({ key: item.key || item.title }, item));
          })
        );
      }
      break;

    default:
      formElement = React.createElement('input', { placeholder: 'default element' });
  }

  return formElement;
});

var _Form = function (_Component) {
  inherits(_Form, _Component);

  function _Form() {
    classCallCheck(this, _Form);
    return possibleConstructorReturn(this, (_Form.__proto__ || Object.getPrototypeOf(_Form)).apply(this, arguments));
  }

  createClass(_Form, [{
    key: '_transFuncToObj',
    value: function _transFuncToObj() {
      var func = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var form = arguments[1];

      if (Object.prototype.toString.call(func) === '[object Function]') {
        return func(form);
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
          return React.createElement('br', { key: index });
        } else if (type === 'span') {
          return React.createElement(
            'span',
            _extends({ key: index }, props),
            label
          );
        } else if (type === 'group') {
          ret = _this2._renderElement(form, getFieldDecorator, autoSearchEvent, item.children, 'group');
        } else if (render) {
          var renderItem = render(form, _Form2.Item) || React.createElement('input', { placeholder: 'default: render need return' });
          ret = unbind === true ? renderItem : getFieldDecorator(key, _this2._transFuncToObj(config, form))(renderItem);
        } else {

          var _item = _extends({
            type: type
          }, props);
          if (bindSearch) _item.autoSearchEvent = autoSearchEvent;
          var _renderItem = createFormItem(_item, form);
          ret = type === 'button' ? _renderItem : getFieldDecorator(key, _this2._transFuncToObj(config, form))(_renderItem);
        }

        // if (cls === 'group') {
        //   return (<span style={{ paddingRight: 10 }} key={`1_${index}`}>{ret}</span>)
        // }

        // let itemForm = type === 'group' ? <div>{ret}</div> : ret;

        // let itemForm = ret;

        return React.createElement(
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


      var _formLayout = formLayout || layout === 'horizontal' ? {
        labelCol: { span: 6 },
        wrapperCol: { span: 14 }
      } : null;

      return React.createElement(
        _Form2,
        _extends({ layout: layout }, _formLayout),
        this._renderElement(form, getFieldDecorator, autoSearchEvent, this._transFuncToObj(data, form))
      );
    }
  }]);
  return _Form;
}(Component);

var Form = _Form2.create()(_Form);

var withPagination = (function (Component$$1) {
  return function (_React$Component) {
    inherits(_class, _React$Component);

    function _class() {
      classCallCheck(this, _class);

      var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

      _this.state = {
        _list: [],
        _total: 0,
        _current: 1,
        _pageSize: 10
      };
      return _this;
    }

    createClass(_class, [{
      key: 'componentWillMount',
      value: function componentWillMount() {
        var _this2 = this;

        var _props = this.props,
            _props$pagination = _props.pagination,
            pagination = _props$pagination === undefined ? false : _props$pagination,
            _props$isInit = _props.isInit,
            isInit = _props$isInit === undefined ? false : _props$isInit;
        var _pagination$current = pagination.current,
            current = _pagination$current === undefined ? 1 : _pagination$current,
            _pagination$pageSize = pagination.pageSize,
            pageSize = _pagination$pageSize === undefined ? 10 : _pagination$pageSize,
            onShowSizeChange = pagination.onShowSizeChange;

        this.setState({
          _list: [],
          _total: 0,
          _current: current,
          _pageSize: pageSize
        }, function () {
          // 初始化 是否要求加载数据
          isInit && _this2._loadData();
        });
      }
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
      key: 'reset',
      value: function reset() {
        var _this4 = this;

        var _props2 = this.props,
            _props2$current = _props2.current,
            current = _props2$current === undefined ? 1 : _props2$current,
            _props2$pageSize = _props2.pageSize,
            pageSize = _props2$pageSize === undefined ? 10 : _props2$pageSize;

        this.setState({
          _list: [],
          _total: 0,
          _current: current,
          _pageSize: pageSize
        }, function () {
          _this4._loadData();
        });
      }
    }, {
      key: 'refresh',
      value: function refresh() {
        this._loadData();
      }
    }, {
      key: '_filter',
      value: function _filter() {
        var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        var ret = {};
        Object.keys(params).map(function (key) {
          if (!key.includes(',')) ret[key] = params[key];
        });

        return ret;
      }
    }, {
      key: '_loadData',
      value: function _loadData() {
        var _this5 = this;

        var _state = this.state,
            _current = _state._current,
            _pageSize = _state._pageSize;
        var _props3 = this.props,
            action = _props3.action,
            _props3$actionError = _props3.actionError,
            actionError = _props3$actionError === undefined ? function (msg) {
          return console.error(msg);
        } : _props3$actionError,
            _props3$params = _props3.params,
            params = _props3$params === undefined ? function () {
          return {};
        } : _props3$params;

        var values = _extends({}, this._filter(params()), {
          page: _current,
          pageSize: _pageSize
        });

        var request = null;
        if (action) {
          request = action(values);
        } else {
          throw new Error('need action filed');
        }

        request.then(function (res) {
          if (res.status) {
            _this5.setState({
              _list: res.entry,
              _total: res.totalRecordSize
            });
          } else {
            actionError(res.message);
          }
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var _this6 = this;

        var _state2 = this.state,
            _state2$_list = _state2._list,
            _list = _state2$_list === undefined ? [] : _state2$_list,
            _total = _state2._total,
            _current = _state2._current,
            _pageSize = _state2._pageSize;

        var _props4 = this.props,
            _props4$pagination = _props4.pagination,
            pagination = _props4$pagination === undefined ? true : _props4$pagination,
            action = _props4.action,
            params = _props4.params,
            isInit = _props4.isInit,
            props = objectWithoutProperties(_props4, ['pagination', 'action', 'params', 'isInit']);
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
            return range[0] + '-' + range[1] + ' \u6761, \u5171 ' + total + ' \u6761';
          } : _pagination$showTotal,
              _pagination$onShowSiz = pagination.onShowSizeChange,
              _onShowSizeChange = _pagination$onShowSiz === undefined ? function () {} : _pagination$onShowSiz,
              config = objectWithoutProperties(pagination, ['total', 'current', 'pageSize', 'showSizeChanger', 'onChange', 'showTotal', 'onShowSizeChange']);

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
        return React.createElement(Component$$1, _extends({}, props, { dataSource: _list, pagination: _pagination }));
      }
    }]);
    return _class;
  }(React.Component);
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

      return React.createElement(
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
            _onOk(e, _this2.refs.form, function (f) {
              return _this2.show(f);
            });
          }
        }, pr),
        React.createElement(Form
        // ref="form"
        , _extends({ wrappedComponentRef: function wrappedComponentRef(inst) {
            return _this2.form = inst && inst.props.form;
          }
        }, form))
      );
    }
  }]);
  return _class;
}(Component);

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".style_form__115ZV,\n.style_table__2ELRL {\n  background: #fff;\n  padding: 20px;\n  border-radius: 5px;\n  margin-bottom: 10px;\n}\n";
var styles = { "form": "style_form__115ZV", "table": "style_table__2ELRL" };
styleInject(css);

var withSearch = (function (Component$$1) {
  return function (_React$Component) {
    inherits(_class, _React$Component);

    function _class() {
      classCallCheck(this, _class);

      var _this = possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).call(this));

      _this.state = {
        formValues: {}
      };
      return _this;
    }

    createClass(_class, [{
      key: '_search',
      value: function _search(fieldsValue) {
        var _this2 = this;

        var formValues = {};
        var values = _extends({}, fieldsValue);
        // 移除空的字段
        Object.keys(values).forEach(function (key) {
          var val = values[key];
          if (Object.prototype.toString.call(val) !== "[object Undefined]" && val !== '') {
            formValues[key] = val;
          }
        });

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
        this.refs.hoc.refresh();
        console.log('from hoc search');
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

        return React.createElement(Component$$1, _extends({ ref: 'hoc' }, props));
      }
    }]);
    return _class;
  }(React.Component);
});

var SuperForm = function (_Component) {
  inherits(SuperForm, _Component);

  function SuperForm() {
    classCallCheck(this, SuperForm);
    return possibleConstructorReturn(this, (SuperForm.__proto__ || Object.getPrototypeOf(SuperForm)).apply(this, arguments));
  }

  createClass(SuperForm, [{
    key: 'refresh',
    value: function refresh() {
      this.refs.list.refresh();
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


      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { className: styles.form },
          React.createElement(Form, _extends({}, search, { autoSearchEvent: autoSearchEvent }))
        ),
        React.createElement(
          'div',
          { className: styles.table },
          type === 'table' ? React.createElement(Table, _extends({ ref: 'list' }, table, props)) : React.createElement(List, _extends({ ref: 'list' }, table, props))
        )
      );
    }
  }]);
  return SuperForm;
}(Component);

var index = withSearch(SuperForm);

export default index;
export { Form, Table, List, _class as Modal };
//# sourceMappingURL=index.js.map
