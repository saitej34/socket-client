import './App.css';
import {useState,useEffect} from 'react';
import io from 'socket.io-client';

const socket = io("http://localhost:5000")


function App() {
  const [message,setmessage] = useState('');
  const [chat,setchat] = useState([]);

  const send = (e)=>{
     e.preventDefault();
     socket.emit("chat",{message:message});
     setmessage('');
  }
  useEffect(()=>{
    socket.on("chat",(payload)=>{
      setchat([...chat,payload])
    })
})
  return (
    <div className="App">
      <header className="App-header">
          <h1>Chat App</h1>
          {chat.map((pay,index)=>{
            return <p key="index">{pay.message}</p>
          })}
          <form onSubmit={send}>
            <input type="text" name="chat" placeholder="send text" value={message} onChange={(e)=>{setmessage(e.target.value)}}/>
            <button type="submit">Send</button>
          </form>
      </header>
    </div>
  );
}

export default App;
