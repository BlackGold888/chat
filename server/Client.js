class Client {
    constructor(socket, client) {
        this.client = client;
        this.client.data = {
            name: '',
        };// Client Custom Data
        this.socket = socket;
        // Init all events
        this.init();
    }

    init() {
        this.client.on('message.add', this.clientBroadcast);
        this.client.on('client.init', this.clientInit);
    }

    clientBroadcast = (data) => {
        this.socket.clients.forEach(client => {
            client.send(JSON.stringify({ eventName: 'message.add', payload: data }));
        });
    };

    clientInit = ({ name }) => {
        this.client.data.name = name;
        let clients = [];

        this.socket.clients.forEach(client => clients.push(client.data));
        this.socket.clients.forEach(client => {
            client.send(JSON.stringify({ eventName: 'update.clients', payload: clients }));
        });
    };
}

export { Client };
