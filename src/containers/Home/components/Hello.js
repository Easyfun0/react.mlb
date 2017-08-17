import React from 'react';
import './a.css';

export default class Hello extends React.Component {
  state = {
    count: 1,
  };

  addCount = () => {
    this.setState({
      count: this.state.count += 1,
    });
  }
  render() {
    return (
      <div>
        <h2>{this.state.count}</h2>
        <button onClick={this.addCount}>按我</button>
      </div>
    );
  }
}
