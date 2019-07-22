# Modal
封装此组件的初衷是不想每次写 Modal 时都设置一个 state 进行显隐控制

### 使用
```jsx
import {Modal} from 'react-antd-super-form'
```

### 基本配置
```jsx
<Modal
// 获取 组件 实现对象, 可用来调用 Modal 的 show
  ref="testDialog"
  onOk={(e, form, show) => {
    console.log(e, form.getFieldsValue());
    show(false)
  }}
  form={{}}
  ></Modal>
```
- 控制 Modal 的显隐
```jsx
this.refs.testDialog.show(true|false)
```

