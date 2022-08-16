import './assets/css/login.css';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Login({ nameChange, name, setConnection }) {
    const navigate = useNavigate();

    const login = () => {
        if (name.length > 3) {
            setConnection();
            navigate('/chat');
        }else{
            toast.error('Name must be at least 3 characters long');
        }
    }

    return (
        <div id={'login'}>
            <label htmlFor="">Name</label>
            <input type="text" onChange={nameChange} />
            <button className={'btn'} onClick={login}>Login</button>
        </div>
    );
}

export default Login;
