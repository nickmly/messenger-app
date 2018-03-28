import React, {Component} from 'react';
import FlashMessage from './FlashMessage';

class LoginForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            message: ''
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
        .then(function(obj){
            console.log(obj);
            this.setState({message: obj.message});
        }.bind(this))
        .catch(function(err){
            console.log(err);
        });
    }

    render() {
        var flash;
        if(this.state.message !== ''){
            flash = <FlashMessage message={this.state.message}/>;
        }
        return (
            <div>
                {flash}
                <form onSubmit={this.onSubmit}>
                    <input placeholder="Username" type="text" onChange={this.handleUserChange}/>
                    <input placeholder="Password" type="password" onChange={this.handlePwdChange}/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default LoginForm;