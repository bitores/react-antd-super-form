import React from 'react';
import injectEvent from './inject-event';
import AntdElements from './antd';
import { transToArray } from '../utils';


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
          pr.onClick = (e) => {
            old(e, form)
            autoSearchEvent(form);
          }
        } else {
          pr.onClick = (e) => {
            autoSearchEvent(form);
          }
        }
      }

      formElement = <Component type={buttonType} {...pr} >{text}</Component>
    }

      break;

    case 'slider': {
      const { sfType = 'horizontal', text, ...pr } = props;
      formElement = <Component type={sfType} {...pr} >{text}</Component>
    } break;
    case 'input':
    case 'inputnumber': // InputNumber
    case 'password': // Input.Number
    case 'textarea': // Input.TextArea
    case 'switch':
    // case 'switch2':
    // case 'wrapperinput':
    // case 'func':
    case 'divider':
    case 'datepicker':
    case 'rangepicker':
    case 'monthpicker':
    case 'weekpicker':
    case 'timepicker':
    case 'cascader':
    case 'autocomplete':
    case 'rate': {
      formElement = <Component {...props} />
    }
      break;

    case 'checkbox':
    case 'radio':
    case 'checkboxgroup':
    case 'radiogroup': {
      const { options = [], ...pr } = props;
      formElement = <Component options={transToArray(options)} {...pr} />
    }
      break;

    case 'select':
    case 'mentions': {
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

    case 'uploaddragger':
    // case 'wrapperupload':
    case 'upload': {
      const { innerHTML, ...pr } = props;

      formElement = <Component {...pr}>{innerHTML && innerHTML()}</Component>
    }
      break;


    case 'radiobutton': {
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

    case 'steps': {
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


    default: formElement = <input placeholder="default element" />;
  }

  return formElement;

}