import React, { useState } from 'react';
import axios from 'axios';

function Chat() {
    const [message, setMessage] = useState('');
    const [response, setResponse] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://192.168.1.10:5001/chat', { message });
            setResponse(res.data.message);
        } catch (error) {
            setResponse('Error: ' + error.message);
        }
    };

    return (
        <div>
            <h1>Chat with GPT-3.5-turbo</h1>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    placeholder="Type your message"
                />
                <button type="submit">Send</button>
            </form>
            <div>
                <h2>Response:</h2>
                <p>{response}</p>
            </div>
        </div>
    );
}

export default Chat;
