import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { helloWorld, reset, sendMessage } from './../actions'
import md5 from 'md5-hash'

class Hello extends React.Component {

  constructor(props) {
    super(props);
    this.sendMessageClick = this.sendMessageClick.bind(this);
    this.userTextInput = React.createRef();
    this.messageTextInput = React.createRef();
    this.initChat();
  }

  initChat() {
    const { onSendMessage } = this.props;
    fetch('http://localhost:8080/api/fr/chats', {
      method: 'GET',
      headers: this.getHeaders()
    }).then(response => {
      if (response.status === 200) {
        response.json().then(data => {
          onSendMessage(data);
          this.messageTextInput.value = '';
        });
      } else {
        onSendMessage([]);
      }
    });
  }

  sendMessageClick() {
    const { onSendMessage } = this.props;
    if (!this.messageTextInput.value.trim() || !this.userTextInput.value) {
      return;
    }
    const block = this.buildBlock(this.userTextInput.value, this.messageTextInput.value);
    fetch('http://localhost:8080/api/fr/chats', {
      method: 'post',
      headers: this.getHeaders(),
      body: JSON.stringify(block)
    }).then(response => {
      if (response.status === 200) {
        response.json().then(data => {
          onSendMessage(data);
          this.messageTextInput.value = '';
        });
      } else {
        this.initChat();
      }
    });
  }

  getHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return headers;
  }

  buildBlock = (user, message) => {
    const timestamp = new Date().getTime();
    let nonce = 0;
    const lastChatMessage = this.props.chats[this.props.chats.length - 1];
    const previousHash = lastChatMessage ? lastChatMessage.hash : '';
    let hash = md5(timestamp + message + user + nonce + previousHash);
    while (!hash.startsWith('00')) {
      nonce += 1;
      hash = md5(timestamp + message + user + nonce + previousHash);
    }
    // console.log(hash, nonce);
    return { message: { message, user, timestamp }, nonce, previousHash };
  }

  render() {
    const { onClick, reset, message, chats } = this.props;
    return (
      <div>
        <div>
          <h1>{message}</h1>
          <button onClick={onClick}>Click</button>
          &nbsp;
      <button onClick={reset}>Reset</button>
        </div>
        <div className="chatroom">
          <h3>Chat erton</h3>
          {<ul className="chats">
            {chats.map((chat) =>
              <li>{chat.message.user} : {chat.message.message}</li>
            )}
          </ul>}
          <input type="text" ref={node => this.userTextInput = node} />
          <input type="text" ref={node => this.messageTextInput = node} />
          <button onClick={this.sendMessageClick}>Click</button>
        </div>
      </div >
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    message: state.helloWorld.message,
    chats: state.helloWorld.chats,
    chatMessage: state.helloWorld.chatMessage
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: () => dispatch(helloWorld()),
    reset: () => dispatch(reset()),
    onSendMessage: (chats) => dispatch(sendMessage(chats))
  }
}

const HelloConnect = connect(
  mapStateToProps,
  mapDispatchToProps
)(Hello)


Hello.propTypes = {
  onClick: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
  chats: PropTypes.array.isRequired
}

export default HelloConnect
