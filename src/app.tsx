
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { CssBaseline, CircularProgress, Container, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, TextField, Button } from '@mui/material';
import { GoogleGenerativeAI } from "@google/generative-ai";




interface MessageProps {
 text: string;
 sender: 'user' | 'bot';
}


interface SwaggerData {
 sold: string[];
}




const Message: React.FC<MessageProps> = ({ text, sender }) => {
 return (
   <div className={`message ${sender}`}>
     {text}
   </div>
 );
};




const SwaggerDataComponent: React.FC = () => {
 const [data, setData] = useState<SwaggerData>({ sold: [] });
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState<Error | null>(null);


 useEffect(() => {
   const getData = async () => {
     try {
       const response = await fetch('https://petstore.swagger.io/v2/store/inventory');
       if (!response.ok) {
         throw new Error(`HTTP error! status: ${response.status}`);
       }
       const result = await response.json();
       setData(result);
       setLoading(false);
     } catch (error) {
       setError(error as Error);
       setLoading(false);
     }
   };


   getData();
 }, []);


 if (loading) {
   return <CircularProgress />;
 }


 if (error) {
   return <Typography color="error">Error: {error.message}</Typography>;
 }


 return (
   <Container>
     <Typography variant="h4" gutterBottom>
       Swagger API Data
     </Typography>
     <Paper>
       <Table>
         <TableHead>
           <TableRow>
             <TableCell>Column 1</TableCell>
             <TableCell>Column 2</TableCell>
           </TableRow>
         </TableHead>
         <TableBody>
           {data.sold.map((item, index) => (
             <TableRow key={index}>
               <TableCell>{item}</TableCell>
             </TableRow>
           ))}
         </TableBody>
       </Table>
     </Paper>
   </Container>
 );
};




const Chatbot: React.FC = () => {
 const [messages, setMessages] = useState<MessageProps[]>([]);
 const [input, setInput] = useState('');




 const API_KEY = ""; 
 const genAI = new GoogleGenerativeAI(API_KEY);


 const sendMessage = async () => {
   const userMessage = { text: input, sender: 'user' };
   setMessages([...messages, userMessage]);


   try {
    
     const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


     const prompt = `Use the following Swagger JSON to generate the data the user prompt: ${JSON.stringify({ sold: [] })}. User Prompt: ${input}`;
    
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
     <TextField
       value={input}
       onChange={(e) => setInput(e.target.value)}
       onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
       fullWidth
       variant="outlined"
       placeholder="Type your message here..."
     />
     <Button onClick={sendMessage} variant="contained" color="primary">
       Send
     </Button>
   </div>
 );
};


const App: React.FC = () => {
 return (
   <div className="App">
     <CssBaseline />
     <h1>Gemini Chatbot</h1>
     <Chatbot />
     <SwaggerDataComponent />
   </div>
 );
};


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
 <React.StrictMode>
   <App />
 </React.StrictMode>
);


export default App;