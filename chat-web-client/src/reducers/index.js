import { combineReducers } from 'redux'
import { HELLO_WORLD, RESET, SEND_MESSAGE } from './../actions'
import md5 from 'md5-hash'


let initialState = { message: 'Hello', chats: [], chatMessage: '' }

const helloWorld = (state = initialState, action) => {
  switch (action.type) {
    case HELLO_WORLD:
      return Object.assign({}, state, { message: 'Hello, World!' })
    case RESET:
      return state = initialState
    case SEND_MESSAGE:
      state.chats.push(sendMessage(action.user, action.chatMessage));
      state = Object.assign({}, state, { chatMessage: action.chatMessage });
      return state
    default:
      return state
  }
}

const sendMessage = (user, message) => {
  const block = buildBlock(user, message);
  //send block to the chain
  fetch('http://localhost:8080/api/fr/chats', {
    method: 'post',
    headers: getHeaders(),
    body: JSON.stringify(block)
  }).then(response => {
    response.json().then(data => {
      console.log(data)
    });
  });
  const chatMessage = {
    key: block.timestamp,
    message: message,
    user: user,
  }
  return chatMessage;
}

const buildBlock = (user, message) => {
  const timestamp = new Date().getTime();
  let nonce = 0;
  let hash = md5(timestamp + message + user + nonce);
  while (!hash.startsWith('00')) {
    nonce += 1;
    hash = md5(timestamp + message + user + nonce);
  }
  console.log(hash, nonce);
  return { timestamp, message, user, nonce };
}

function getHeaders() {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  return headers;
}

const helloReducer = combineReducers({
  helloWorld
})

export default helloReducer
