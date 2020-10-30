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

### Modal
```jsx
<Modal
  ref="testDialog"
  onCancel={() => console.log('...')}
  afterClose={() => console.log('after...')}
  width={800}
  onOk={(e, form, show) => {
    console.log(e, form.getFieldsValue());
    show(false)
  }}
  footer={[
    <Button key='A' onClick={() => {
      console.log('A', this.refs.testDialog.getFieldsValue())
    }}>A</Button>,
    <Button key='B' onClick={() => {
      console.log('B')
    }}>B</Button>,
  ]}
  form={{
    // layout: 'inline',
    formLayout: {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    },
    data: [
      {
        label: 'E-mail',
        cType: Input,
        key: 'email',
        config: {
          rules: [
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
            {
              required: true,
              message: 'Please input your E-mail!',
            },
          ],
        },
      },
      
    ]
  }}
>
</Modal>
```