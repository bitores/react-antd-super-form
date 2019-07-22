# SuperPage

入口文件, 结合了 Form + Table|List 两个组件, 后台管理系统中常见搜索后展示表格或列表数据页面 进行实现, 对提高开发效率和实现自动化后台实现提供了组件支撑

![Table 案例](../examples/assets/Table.jpg)
![List 案例](../examples/assets/List.jpg)

### 使用
```jsx
import SuperForm from 'react-antd-super-form';
```
### 字段配置
```jsx
<SuperPage
type="table|list" //default table
search={
  {
    // Form 布局
    layout: 'horizontal'|'vertical'|'inline',
    // Form 样式
    formLayout: {
      labelCol: { span: 2 },
      wrapperCol: { span: 14 },
    },
    // Form 表单组件配置
    data:[]
  }
}
table={
  {
    // 扩展属性
    // 是否开始时进行 action 进行调用
    isInit: false,
    // 数据请求的处理函数
    action: func,
    // antd Table 固有属性
    ...props
  }
}
/>
```
