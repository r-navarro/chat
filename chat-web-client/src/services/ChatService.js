export class ChatService {

    getHeaders = () => {
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return headers;
    }

    getMessages = () => {
        return fetch('http://localhost:8080/api/fr/chats', {
            method: 'GET',
            headers: this.getHeaders()
        }).then(response => {
            return response.json().then(data => {
                return data;
            });
        });
    }

    sendMessage = (block) => {
       return fetch('http://localhost:8080/api/fr/chats', {
            method: 'post',
            headers: this.getHeaders(),
            body: JSON.stringify(block)
        }).then(response => {
            return response;
        });
    }
}