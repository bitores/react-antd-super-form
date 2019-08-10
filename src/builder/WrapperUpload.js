import React, { Component } from 'react';
import { Upload, Button } from 'antd';

export default class extends Component {
  constructor(props) {
    super(props)
    console.log(props)

    this.value = 1;

    this.state = {
      value: props.value,
    }
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState({ value });
    }
  }

  handleValueChange = (obj) => {
    const onChange = this.props.onChange;
    console.log(obj)
    if (onChange) {
      // this.setState({
      //   value: obj.fileList
      // })
      onChange(obj.fileList);
    }
  }

  render() {
    const state = this.state;
    return <Upload defaultFileList={state.value} onChange={this.handleValueChange}>
      <Button>上传</Button>
    </Upload>
  }
}

