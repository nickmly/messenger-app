import React, {Component} from 'react';


class LoginForm extends Component {
    constructor(props) {
        super(props);        
    }  

    render() {       
        return (
            <div>
                <form onSubmit={this.props.onLogin}>
                    <input placeholder="Username" type="text" onChange={this.props.handleUserChange}/>
                    <input placeholder="Password" type="password" onChange={this.props.handlePwdChange}/>
                    <button>Submit</button>
                </form>
            </div>
        )
    }
}

export default LoginForm;