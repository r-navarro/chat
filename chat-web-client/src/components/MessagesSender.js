import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { ChatService } from './../services/ChatService'
import { sendMessage, showError, getMessages } from './../actions'
import md5 from 'js-md5'

class MessagesSender extends React.Component {

    constructor(props) {
        super(props);
        this.sendMessageClick = this.sendMessageClick.bind(this);
        this.userTextInput = React.createRef();
        this.messageTextInput = React.createRef();
    }

    sendMessageClick() {
        const { getMessagesAndShowError } = this.props;
        if (!this.messageTextInput.value.trim() || !this.userTextInput.value) {
            return;
        }
        const block = this.buildBlock(this.userTextInput.value, this.messageTextInput.value);
        const chatService = new ChatService();
        chatService.sendMessage(block).then(response => {
            if (response.status === 200) {
                response.json().then(data => {
                    this.messageTextInput.value = '';
                    getMessagesAndShowError(data, '');
                });
            } else {
                response.json().then(error => {
                    const chatService = new ChatService();
                    chatService.getMessages().then(data => {
                        getMessagesAndShowError(data, error.message);
                    });
                });
            }
        })
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
        const concat = timestamp + message + user + previousHash;
        // const unsignedString = concat.split('').map(char => {return char >= 128 ? char - 256 : char}).join('');
        const unsignedString = concat;
        let hash = md5(unsignedString + nonce);
        while (!hash.startsWith('00')) {
            nonce += 1;
            hash = md5(unsignedString + nonce);
        }
        console.log(hash, unsignedString + previousHash);
        return { message: { message, user, timestamp }, nonce, previousHash };
    }

    render() {
        const { error } = this.props;
        return (
            <div>
                <div>
                    <input type="text" ref={node => this.userTextInput = node} />
                    <input type="text" ref={node => this.messageTextInput = node} />
                    <button onClick={this.sendMessageClick}>Click</button>
                </div >
                <div>
                    {error}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        message: state.chat.message,
        chats: state.chat.chats,
        chatMessage: state.chat.chatMessage,
        error: state.chat.error
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        onSendMessage: (chats) => dispatch(sendMessage(chats)),
        getMessages: () => dispatch(getMessages()),
        getMessagesAndShowError: (messages, error) => {
            dispatch(getMessages(messages));
            dispatch(showError(error));
        },
        dispatch: () => dispatch,
    }
}

const MessagesSenderConnect = connect(
    mapStateToProps,
    mapDispatchToProps
)(MessagesSender)


MessagesSender.propTypes = {
    message: PropTypes.string.isRequired,
    chats: PropTypes.array.isRequired
}

export default MessagesSenderConnect
