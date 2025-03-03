import React, { useEffect, useRef, useState } from 'react'
import './index.css'
import { Close, Comment } from '@mui/icons-material';


const key = ""

const apiUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-pro:generateContent?key=${key}`

const Chatbot = () => {
    const [isOpen, setIsOpen] = useState(false);
    const inputRef = useRef(null);
    const chatBodyRef = useRef(null);
    const [chatHistory, setChatHistory] = useState([{
        role: 'model',
        text: 'Hello, how can I help you today?'
    }]);

    const updateHistory = (text) => {
        setChatHistory(prev => [...prev.filter(msg => msg.text !== "Thinking..."), { role: 'model', text }]);
    }

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const userMessage = inputRef.current.value.trim();
        if (!userMessage) return;
        inputRef.current.value = '';
        setChatHistory([...chatHistory, { role: 'user', text: userMessage }]);
        setTimeout(() => {
            setChatHistory((prev) => [...prev, { role: 'model', text: 'Thinking...' }]);
        }, 600);
        generateResponse([...chatHistory, { role: 'user', text: userMessage }]);
    }

    const generateResponse = async (history) => {
        try {
            history = history.map(({ role, text }) => ({
                role,
                parts: [{ text }]
            }));
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ contents: history })
            });
            const data = await response.json();
            if (!response.ok) throw new Error(data.error.message || 'An error occurred');
            console.log("data", data);
            const apiResponseText = data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, '$1').trim();
            updateHistory(apiResponseText);
        } catch (error) {
            console.error('Error generating response:', error);
        }
    }

    useEffect(() => {
        chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: 'smooth' });
    }, [chatHistory]);

    return (
        <>
            <div className="chatbot-icon" onClick={() => setIsOpen(true)}>
                <Comment />
            </div>
            <div className="wrapper" style={{ display: isOpen ? 'block' : 'none' }}>
                <div className="title">Social Chatbot</div>
                <Close style={{ position: 'absolute', right: '10px', top: '10px', cursor: 'pointer', color: 'white' }} onClick={() => setIsOpen(false)} />
                <div className="box" ref={chatBodyRef}>
                    {
                        chatHistory.map((message, index) => (
                            <div className={`item ${message.role === 'user' ? 'right' : ''}`} key={index}>
                                {
                                    message.role !== 'user' && <div className="icon">
                                        <i className="fa fa-user" />
                                    </div>
                                }
                                <div className="msg">
                                    <div>{message.text.split("\n").map((line, index) => (
                                        <p key={index}>{line}</p>
                                    ))}</div>
                                </div>
                            </div>
                        ))
                    }

                </div>
                <div className="typing-area">
                    <div className="input-field">
                        <input ref={inputRef} type="text" placeholder="Type your message" required />
                        <button onClick={handleFormSubmit}>Send</button>
                    </div>
                </div>
            </div>
        </>

    )
}

export default Chatbot