import { combineReducers } from 'redux'
import { HELLO_WORLD, RESET, SEND_MESSAGE } from './../actions'


let initialState = { message: 'Hello', chats: [], chatMessage: '' }

const helloWorld = (state = initialState, action) => {
  switch (action.type) {
    case HELLO_WORLD:
      return Object.assign({}, state, { message: 'Hello, World!' })
    case RESET:
      return state = initialState
    case SEND_MESSAGE:
      state = Object.assign({}, state, { chats: action.chats });
      return state
    default:
      return state
  }
}

const helloReducer = combineReducers({
  helloWorld
})

export default helloReducer
