import React, { Component } from 'react';

export default class extends Component {
  value = () => {
    return 'xxx';
  }

  onChange = () => {
    console.log('set value')
    this.setState({
      value: 'xxx'
    })
  }

  render() {
    return <div style={{ display: 'none' }}></div>
  }
}