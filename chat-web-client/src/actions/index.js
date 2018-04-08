export const HELLO_WORLD = 'HELLO_WORLD'
export const RESET = 'RESET'
export const SEND_MESSAGE = 'SEND_MESSAGE'

export const helloWorld = () => {
  return {
    type: HELLO_WORLD
  }
}

export const reset = () => {
  return {
    type: RESET
  }
}

export const sendMessage = (user, chatMessage) => {
  return {
    type: SEND_MESSAGE,
    chatMessage,
    user
  }
}