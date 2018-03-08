import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };

    this.handlePwdChange = this.handlePwdChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handlePwdChange(e) {
    this.setState({password: e.target.value});
  }

  handleUserChange(e) {
    this.setState({username: e.target.value});
  }

  onSubmit(e) {
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
    .then(function(msg){
      
    })
    .catch(function(err){
      console.log(err);
    });
  }

  render() {
    return (
      <div className="App">
        <form onSubmit={this.onSubmit}>
          <input placeholder="Username" type="text" onChange={this.handleUserChange}/>
          <input placeholder="Password" type="password" onChange={this.handlePwdChange}/>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
