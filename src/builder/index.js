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
      let { autoSearchEvent, buttonType, text, ...pr } = props;
      if (autoSearchEvent) {
        if (props.onClick) {
          let old = props.onClick;
          pr.onClick = (e, form) => {
            old(e, form)
            autoSearchEvent(form);
          }
        } else {
          pr.onClick = () => {
            autoSearchEvent(form);
          }
        }
      }

      formElement = <Component type={buttonType} {...pr} >{text}</Component>
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
    case 'rate': {
      formElement = <Component {...props} />
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
    case 'upload':
      {
        const { innerHTML, ...pr } = props;

        formElement = <Component {...pr}>{innerHTML && innerHTML()}</Component>
      }
      break;

    case 'checkboxgroup':
    case 'radiogroup':
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

    case 'steps':
      {
        const { options = [], ...pr } = props;

        formElement = (<Component {...pr} >
          {transToArray(options).map((item, ind) => {
            return (
              <Component.Step key={item.key || item.title} {...item}></Component.Step>
            );
          })}
        </Component>)
      }
      break;


    default:
      formElement = <input placeholder="default element" />;
  }

  return formElement;

}