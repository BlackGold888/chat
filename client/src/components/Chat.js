import React, { useEffect, useState } from 'react';
import './assets/css/chat.css';
import { useNavigate } from 'react-router-dom';

function Chat({ name, socket, clients, messages }) {
    const navigate = useNavigate();
    const [message, setMessage] = useState('');


    const messageChange = (e) => setMessage(e.target.value);

    const sendMessage = (message) => {
        socket.send(JSON.stringify({
            eventName: 'message.add',
            payload: `${name}: ${message}`
        }));
    }

    useEffect(() => {
        if (!name) {
            navigate('/');
        }
    })

    return (
        <div className={ 'chat' }>
            <div className="row">
                <div className="col-3">
                    <div className="clients-list">
                        {clients.map((client, index) => <div key={index} className="client">{client?.name}</div>)}
                    </div>
                </div>
                <div className="col-9">
                    <div className="messages">
                        {messages.map((message, index) => <div key={index} className="message">{message}</div>)}
                    </div>
                    <div className="input-group">
                        <input className={'message-input'} placeholder={'Enter message'} type="text" onChange={messageChange} />
                        <button className={'btn-send'} onClick={() => sendMessage(message)}>Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Chat;
