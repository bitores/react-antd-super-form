# react-antd-super-form
[在线案例]](https://codesandbox.io/s/react-antd-super-form-j7bvp)

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

- [详细使用文档](./src/README.md)
- [SuperPage 使用文档](./src/docs/SuperPage.md)
- [Form 使用文档](./src/docs/Form.md)
- [Table&List 使用文档](./src/docs/Table|List.md)

## License

MIT © [bitores](https://github.com/bitores)
