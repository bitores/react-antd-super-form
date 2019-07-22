# Table & List

Table & List 组件对常见的数据请求分页处理逻辑进行了封装, 提高后台开发效率
![Table 案例](../examples/assets/Table.jpg)
![List 案例](../examples/assets/List.jpg)
### 使用
```jsx
import {Table, List} from 'react-antd-super-form';
```
### 字段配置
```jsx
<Table
  // 扩展属性
  // 是否开始时进行 action 进行调用
  isInit={true|false},
  // 数据请求的处理函数
  action={func},
  // antd Table 固有属性
  {...prop}
/>
```
