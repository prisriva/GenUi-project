 import React from 'react';
import Chatbot from './components/Chatbot';
import './App.css';
import SwaggerDataComponent from './components/SwaggerDataComponent';

const App = () => {
  return (
    <div className="App">
      <h1>Gemini Chatbot</h1>
      <Chatbot />
      <SwaggerDataComponent></SwaggerDataComponent>
    </div>
  );
};

export default App;
