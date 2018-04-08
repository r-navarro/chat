package fr.rnavarro.chat.chatapi.dto


class Block {
    String message
    String user
    Long timestamp
    int nonce
    Block previous

    String toString() {
        return timestamp + message + user + nonce + previous.toString()
    }
}
