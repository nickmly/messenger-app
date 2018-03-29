import React, {Component} from 'react';
import Message from './Message';

class MessageList extends Component {
    constructor(props){
        super(props);
        this.state = {
            messages: [],
            newMessageText: ''          
        }

        this.getAllMessages.call(this);
        this.onMessageSubmit = this.onMessageSubmit.bind(this);
        this.onMessageTextChange = this.onMessageTextChange.bind(this);
    }

    getAllMessages() {
        fetch('/api/messages', {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
        }).then(function(res){
            return res.json();
        }).then(function(messages){
            this.setState({messages});
        }.bind(this)).catch(function(err){
            console.log(err);
        });
    }

    onMessageTextChange(e){
        this.setState({newMessageText: e.target.value});
    }

    onMessageSubmit(e){
        e.preventDefault();
        var data = {
            text: this.state.newMessageText,
            userId: null
        }
        // TODO: move verification to backend?
        // Verify that the user has logged in with correct token
        fetch('/api/users/me', {
            method: 'get',
            headers: {'Content-Type':'application/json', 'x-access-token': this.props.token},
        }).then(function(res){
            return res.json();
        }).then(function(user){
            if(user._id != null) {
                data.userId = user._id;
                fetch('/api/messages', {
                    method: 'post',
                    headers: {'Content-Type':'application/json'},
                    body: JSON.stringify(data)
                }).then(function(res){
                    return res.json();
                }).then(function(data){
                    console.log(data);
                    var messages = this.state.messages;
                    messages.push(data);
                    this.setState({messages});
                }.bind(this)).catch(function(err){
                    console.log(err);
                });
            } else {
                console.log(user.message); // Todo: put in flash message
            }
            
        }.bind(this)).catch(function(err){
            console.log(err);
        });

        //todo : after getting user id submit new message to db
    }

    render() {
        var style = {
            listStyle: 'none'
        }
        var rows = this.state.messages.map(function(val,ind,arr){
            return <li key={val._id}><Message title="Message" body={val.text}/></li>;
        });
        return (
            <div className="message-list">
                <form onSubmit={this.onMessageSubmit}>
                    <input type="text" onChange={this.onMessageTextChange}/>
                    <input type="submit" value="Add Message"/>
                </form>
                <ul style={style}>
                    {rows}
                </ul>
            </div>            
        );
    }
}
export default MessageList;