import React, { Component } from 'react';
import math from 'mathjs'
import update from 'immutability-helper'
import Button from './components/button'
import Buttons from './components/buttons'
import Display from './components/display'


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      operations: [],
      result: [0]
    };
  }

  calculateOperations = () => {
    let result = this.state.operations.join('')
    if (result) {
      result = math.eval(result)
      result = math.format(result)
      result = String(result)
      this.setState({
        result: [result]
      })}
      else {
      this.setState({
        result: [0]
      })
    }
  }

  handleClick = e => {
    const value = e.target.getAttribute('data-value')
    switch (value) {
      case 'clear':
        this.setState({
          operations: [],
          result: [0]
        })
        break
      case 'equal':
        this.calculateOperations()
        break
      default:
        const newOperations = update(this.state.operations, {
          $push: [value],
        })
        this.setState({
          operations: newOperations,
        })
        break
    }
  }


  onKeyPress = e => {
    const value = e.key;

    const allowed = [
      '1', '2', '3', '4',
      '5', '6', '7', '8',
      '9', '0', '+', '-', '*', '/', '=', '.',
      'Enter', 'equal', 'Escape', 'C',
      'Backspace'
    ];

    if (allowed.includes(value)) {
      switch (value) {
        case 'Escape':
          this.setState({
            operations: [],
          })
          break
        case 'Backspace':
          const backSpaceOperations = this.state.operations;
          backSpaceOperations.pop()
          this.setState({
            operations: backSpaceOperations,
          })
          break
        case '=':
        case 'Enter':
          this.calculateOperations()
          break
        default:
          const newOperations = update(this.state.operations, {
            $push: [value],
          })
          this.setState({
            operations: newOperations,
          })
          break
      }
    }
  }

  componentWillMount = (e) => {
    document.addEventListener("keydown", this.onKeyPress.bind(this));
  }

  render() {
    return (
      <div className="App">
        <Display data={this.state.operations} id="display"/>
        <div className="Display" id="display"> {this.state.result} </div>
        <Buttons>
          <Button onClick={this.handleClick} label="AC" value="clear" id="clear"/>
          <Button onClick={this.handleClick} label="7" value="7" id="seven"/>
          <Button onClick={this.handleClick} label="4" value="4" id="four"/>
          <Button onClick={this.handleClick} label="1" value="1" id="one" />
          <Button onClick={this.handleClick} label="0" value="0" id="zero"/>

          <Button onClick={this.handleClick} label="/" value="/" id="divide"/>
          <Button onClick={this.handleClick} label="8" value="8" id="eight"/>
          <Button onClick={this.handleClick} label="5" value="5" id="five"/>
          <Button onClick={this.handleClick} label="2" value="2" id="two"/>
          <Button onClick={this.handleClick} label="." value="." id="decimal"/>

          <Button onClick={this.handleClick} label="x" value="*" id="multiply"/>
          <Button onClick={this.handleClick} label="9" value="9" id="nine"/>
          <Button onClick={this.handleClick} label="6" value="6" id="six"/>
          <Button onClick={this.handleClick} label="3" value="3" id="three"/>
          <Button label="" value="null" />

          <Button onClick={this.handleClick} label="-" value="-" id="subtract"/>
          <Button onClick={this.handleClick} label="+" size="2" value="+" id="add"/>
          <Button onClick={this.handleClick} label="=" size="2" value="equal" id="equals"/>
        </Buttons>
      </div>
    );
  }
}

export default App;
