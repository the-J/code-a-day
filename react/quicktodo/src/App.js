import React, { Component } from 'react';

import TodoList from './components/TodoList';

import './App.css';

class App extends Component {
  state = {
    todos: [
      {
        id: 1,
        title: 'Take trash',
        completed: false
      },{
        id: 2,
        title: 'Wash car',
        completed: false
      },{
        id: 3,
        title: 'Call mom',
        completed: false
      }
    ]
  }

  render() {
    return (
      <div className="App">
        <TodoList 
          todo={this.state.todos}
        />
      </div>
    );
  }
}

export default App;
