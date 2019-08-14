# react-antd-super-form

## Install

```bash
npm install --save react-antd-super-form
```

## Usage

```jsx
import React, { Component } from 'react';
import SuperForm, { Table, List, Form, Modal } from 'react-antd-super-form';

class Example extends Component {
  render () {
    return (
      <SuperForm
        // ...
        search={{}}
        table={{}}
      />
      <Form 
       // ...
       data={[]}
       data={(form)=>[]}
      />

    )
  }
}
```

- [SuperPage 使用文档](https://github.com/bitores/react-antd-super-form/blob/master/src/docs/SuperPage.md)
- [Form 使用文档](https://github.com/bitores/react-antd-super-form/blob/master/src/docs/Form.md)
- [Table&List 使用文档](https://github.com/bitores/react-antd-super-form/blob/master/src/docs/Table|List.md)


### 封装原则
0. 0 样式
1. 尽量维持原 antd 组件属性命名,部分属性作变更(如, Button中type 因冲突变为 buttonType)
2. 增加其它 Form.Item 元素 相应属性配置
3. 优先级: visible > br >  group > render > type 
4. 事件注入,所有列表中的事件中新增加一个 form 参数, 如 onClick(e) => onClick(e, form) 完成对表单的控制
5. 通过设置 input hidden 隐藏域来新增属性
6. 通过属性中添加 ',' 英文逗号来屏蔽 此属性


### 基本结构
```jsx
<SuperForm
type="table|list" //default table
search={
  {
    layout: 'horizontal'|'vertical'|'inline',
    formLayout: {
      labelCol: { span: 2 },
      wrapperCol: { span: 14 },
    },
    data:[]
  }
}
table={
  {
    // 扩展属性
    // 是否开始时进行 action 进行调用
    isInit:true|false,
    // 数据请求的处理函数
    action:func,
    // 接口数据 返回值 res 与 组件内字段完成 映射, list 为数据数组, total 为 数据量, status 为接口是否正常
    valueMap:(res) => {
      return {
        status: res.status,
        dataSource: res.entry,
        total: res.totalRecordSize
      }
    },
    // 分页请求字段重命名[可选]
    pageName:'',
    pageSizeName:'',
    // 附加参数
    extraParams : ()=>{},
    // 初始化数据量[可选]
    total: 0,
    // 初始化数据[可选]
    dataSource:[],
    // antd Table 固有属性
    ...prop
  }
}
/>
```

### search 字段配置
```jsx
data = [
  {
    visible: true, // 默认 true,  组件是否渲染
    label: 'xxx', // FormItem label 标签, 非必填
    type: 'select', // ['br','span', 'group', 'button', 'input','inputnumber','select','radio','radiobutton','slider','textarea','checkbox','datepicker','rangepicker', 'monthpicker', 'timepicker', 'switch','upload','cascader','steps']

    unbind: false, // 非输入组件 建议必填, 
    key: 'xxx', // 输入组件必填, 非输入组件可不填, 建议必填: key 值中 如果包含有逗号则此参数在提交时会被过滤
    config: { // for 
      initialValue: 1
    },

    render: (form)=>{},
    renderFix: (item)=> item,

    style: {
      width: 100
    },
    placeholder: '请选择',
    // for select | radio | radiobutton | slider | checkbox
    options: [
      {label: '订单号', value: 1}
      {label: '手机号', value: 2}
    ]

  
    // For button
    text: '', // 按钮文案
    tp: 'primary',
    bindSearch: true|false, // 自动绑定搜索事件
    onClick(event, form),

    // for upload
    children:()=>{
      return <div>点我上传</div>
    }

    // for form item
    formItemLayout:{
      labelCol: { span: 2 },
      wrapperCol: { span: 14 },
    }
    // other
    ...
  },
]
```

### table 字段配置
```jsx
type="list|table"
columns={columns}
rowKey={"id"}
pagination={{
// 配置同 antd
}}
// 扩展属性
// 是否开始时进行 action 进行调用
isInit={true|false}
// 数据请求的处理函数
action={func}
// 接口数据 返回值 res 与 组件内字段完成 映射, list 为数据数组, total 为 数据量, status 为接口是否正常
valueMap = {(res) => {
  return {
    status: res.status,
    dataSource: res.entry||[],
    total: res.totalRecordSize
  }
}}
// 分页请求字段重命名[可选]
pageName = {}
pageSizeName = {}
// 附加参数
extraParams = {()=>{}}
// 初始化数据量[可选]
total={0}
// 初始化数据[可选]
dataSource={[]}
// antd Table 固有属性
{...prop}

```

## License

MIT © [bitores](https://github.com/bitores)
