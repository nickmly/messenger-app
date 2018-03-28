import React, { Component } from 'react';
import './App.css';
import LoginForm from './LoginForm';
import MessageList from './MessageList';

class App extends Component {  

  render() {
    return (
      <div className="App">
        <LoginForm/>
        <MessageList/>
      </div>
    );
  }
}

export default App;
