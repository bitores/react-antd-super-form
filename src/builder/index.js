import React from 'react';
import injectEvent from './inject-event';
import AntdElements from './antd';


const toString = Object.prototype.toString;
const transToArray = (obj) => {
  if (toString.call(obj) === '[object Object]') {
    return Object.keys(obj).map(key => {
      return { label: obj[key], value: key }
    })
  } else if (toString.call(obj) === '[object Array]') {
    return obj;
  }

  throw new Error('need obj or array')
}

const uploadStyle = {
  width: 100,
  height: 100,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  border: '1px dashed darkgray'
};


export default (obj, form) => {
  const { type = 'defaultType', ...other } = obj;
  // 事件参数注入
  const props = injectEvent(other, form);


  const t = type.toLocaleLowerCase();
  const Component = AntdElements[t];

  let formElement = null;
  switch (t) {
    case 'button': {
      let { onSearch, buttonType, text, ...pr } = props;
      if (onSearch) {
        if (props.onClick) {
          let old = props.onClick;
          pr.onClick = (e, form) => {
            old(e, form)
            onSearch(form);
          }
        } else {
          pr.onClick = () => {
            onSearch(form);
          }
        }
      }

      formElement = <Component type={buttonType} {...pr} >{text}</Component>
    }

      break;
    case 'input':
    case 'inputnumber':
    case 'switch':
    case 'slider':
    case 'textarea':
    case 'datepicker':
    case 'rangepicker': {
      formElement = <Component {...props} />
    }
      break;

    case 'upload':
      {
        let {
          children = () => {
            return (<div style={uploadStyle}>
              <Icon type={this.state.loading ? 'loading' : 'plus'} />
              <div className="ant-upload-text">上传</div>
            </div>)
          }
          , ...pr
        } = props;

        formElement = <Component {...pr} >
          {
            children()
          }
        </Component>
      }

      break;

    case 'select':
      {
        const { options = [], ...pr } = props;

        formElement = (<Component {...pr} >
          {transToArray(options).map(item => {
            return (
              <Component.Option key={item.key || item.value} value={item.value}>{item.label}</Component.Option>
            );
          })}
        </Component>)
      }
      break;

    case 'checkbox':
    case 'radio':
      {
        const { options = [], ...pr } = props;

        formElement = (<Component.Group {...pr} >
          {transToArray(options).map(item => {
            return (
              <Component key={item.key || item.value} value={item.value}>{item.label}</Component>
            );
          })}
        </Component.Group>)
      }

      break;
    case 'radiobutton':
      {
        const { options = [], ...pr } = props;

        formElement = (<Component.Group {...pr} >
          {transToArray(options).map(item => {
            return (
              <Component.Button key={item.key || item.value} value={item.value}>{item.label}</Component.Button>
            );
          })}
        </Component.Group>)
      }
      break;


    default:
      formElement = <input placeholder="default element" />;
  }

  return formElement;

}