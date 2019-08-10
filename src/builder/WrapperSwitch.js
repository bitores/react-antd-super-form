import React, { Component } from 'react';
import { Switch } from 'antd';

export default class extends Component {
  constructor(props) {
    super(props)
    console.log(props)

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

  handleValueChange = (checked, e) => {
    const onChange = this.props.onChange;
    if (onChange) {
      onChange(checked, e);
    }
  }

  render() {
    const state = this.state;
    return <Switch defaultChecked={state.value} onChange={this.handleValueChange}></Switch>
  }
}

