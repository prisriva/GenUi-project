import React, { useState } from 'react';
import Message from './Message';
import { GoogleGenerativeAI } from "@google/generative-ai";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  // Initialize GoogleGenerativeAI
  const API_KEY = "AIzaSyBdQz53bCLKxmtUnv8r9qOAgl_pQQ0gcO4"; // Replace with your actual API key
  const genAI = new GoogleGenerativeAI(API_KEY);

  const sendMessage = async () => {
    const userMessage = { text: input, sender: 'user' };
    setMessages([...messages, userMessage]);

    try {
  
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = input;

      const result = await model.generateContent(prompt);
      const response = result.response;
      const botMessage = { text: response.text(), sender: 'bot' };

      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      const botMessage = { text: 'Sorry, something went wrong.', sender: 'bot' };
      setMessages([...messages, userMessage, botMessage]);
    }

    setInput('');
  };

  return (
    <div className="chatbot">
      <div className="messages">
        {messages.map((msg, index) => (
          <Message key={index} {...msg} />
        ))}
      </div>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default Chatbot;
