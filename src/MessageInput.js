import './MessageInput.css';
import 'firebase/auth';
import Button from 'material-ui/Button';
import Input from 'material-ui/Input';
import React from 'react';
import base from './rebase';
import firebase from 'firebase/app';

export default class MessageInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {message: ''};
    this.user = {};
  }
  componentDidMount() {
    var self = this;
    firebase.auth().onAuthStateChanged(function(user) {
      self.user = user;
    });
  }
  sendMessage(event) {
    // var self = this; // This will be needed later.
    event.preventDefault();
    if(!this.state.message) {
      return;
    }
    base.push('channels/' + this.props.channelId + '/messages', {
      data: {
        author: this.user.displayName,
        contents: this.state.message,
        timestamp: Date.now(),
      },
      then: (err) => {
        if(err) {
          console.error('Error saving message', err);
        } else {
          this.setState({message:''});
        }
      }
    });
  }
  handleChange(event) {
    this.setState({message:event.target.value});
  }
  render() {
    return (
      <form className="MessageInput" onSubmit={this.sendMessage.bind(this)}>
        <Input className="MessageInput-input" placeholder="Send Message"
          value={this.state.message} onChange={this.handleChange.bind(this)}
          autoFocus={true}/>
        <Button type="submit" raised color="primary">
          SEND
        </Button>
      </form>
    );
  }
}
