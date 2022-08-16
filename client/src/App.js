import './App.css';
import { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Chat from './components/Chat';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { emitter } from './MyEventEmitter';


function App() {
    const [socket, setSocket] = useState(null);
    const [name, setName] = useState('');
    const [clients, setClients] = useState([]);
    const [messages, setMessages] = useState([]);

    const nameChange = (e) => setName(e.target.value);

    useEffect(() => {
        if (socket) {
            socket.onopen = () => {
                console.log('connected');
                socket.send(JSON.stringify({ eventName: 'client.init', payload: { name: name } }));
            };

            socket.onmessage = (event) => {
                const { eventName, payload } = JSON.parse(event.data);
                emitter.emit(eventName, payload);
            };

            socket.onclose = () => {
                // socket.send('disconnected');
                console.log('disconnected');
                socket.close()
            };

        }



    }, [socket]);

    emitter.on('message.add', (message) => {
        setMessages([...messages, message]);
    });

    emitter.on('update.clients', (clients) => {
        console.log(JSON.stringify(clients));
        setClients(clients);
    });

    const setConnection = () => {
        setSocket(new WebSocket('ws://localhost:3000/chat'));
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/chat" element={<Chat socket={socket} name={name} clients={clients} messages={messages} />} />
                    <Route path="/" element={<Login nameChange={nameChange} name={name} setConnection={setConnection} />} />
                </Routes>
            </BrowserRouter>
            <ToastContainer
                position="bottom-center"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
                theme={'dark'}
            />
        </div>
    );
}

export default App;
