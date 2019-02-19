import React, { Component } from 'react';

class Display extends Component {
  render() {
    const string = this.props.data.join('').replace(/^0+(?=[1-9])/, '').replace(/\.+/g
      , '.')

    return <div className="Display"> {string}</div>

  }
}

export default Display;