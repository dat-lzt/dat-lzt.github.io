import React, { Component } from 'react';
import TodoList from './components/TodoList';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 style={{margin:'20px 0 0 80px'}}>TodoList</h1>
        <TodoList />
      </div>
    );
  }
}
export default App;
