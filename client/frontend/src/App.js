import React, { Component } from 'react';
import './App.css';
import LoginForm from './LoginForm';
import MessageList from './MessageList';
import FlashMessage from './FlashMessage';

class App extends Component {  
  constructor(props){
    super(props);
    this.state = {
      token: '',
      flashMessage: '',
      username: '',
      password: ''
    }

    this.handlePwdChange = this.handlePwdChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.onLogin = this.onLogin.bind(this);
  }

  
  handlePwdChange(e) {
    this.setState({password: e.target.value});
  }

  handleUserChange(e) {
    this.setState({username: e.target.value});
  }

  onLogin(e) {
    e.preventDefault();
    var data = {
        username: this.state.username,
        password: this.state.password
    };
    
    fetch('/api/users/login', {
        method: 'post',
        body: JSON.stringify(data),
        headers: {'Content-Type': 'application/json'}
    })
    .then(function(res){
        return res.json();
    })
    .then(function(obj){          
        this.setState({flashMessage: obj.message.toString()});
        this.setState({token: obj.token});
        this.setState({username: '', password: ''});
    }.bind(this))
    .catch(function(err){
        console.log(err);
    });
  }

  render() {
    var flash;
    if(this.state.flashMessage !== ''){
        flash = <FlashMessage message={this.state.flashMessage}/>;
    }
    return (
      <div className="App">
        {flash}
        <LoginForm 
          onLogin={this.onLogin}
          handleUserChange={this.handleUserChange}
          handlePwdChange={this.handlePwdChange}
        />
        <MessageList
          token={this.state.token}
        />
      </div>
    );
  }
}

export default App;
