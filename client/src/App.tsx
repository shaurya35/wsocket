import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [messages, setMessages] = useState([]);
// ws
  useEffect(() => {
    const ws = new WebSocket("https://localhost:8080/");
    ws.onmessage = (event) => {
      setMessages(m => [...m, event.data]);
    }
  }, []);

  return (
    <>
      <div className="h-screen bg-black text-white flex flex-col">
        <br />
        <div className="h-[95vh] bg-gray-500">
          {messages.map((message) => (
            <span>{message}</span>
          ))}
        </div>
        <div className="w-full bg-white flex">
          <input type="text" className="flex-1 p-4" />
          <button className="bg-purple-600 text-white p-4" onClick={() => {}}>Send</button>
        </div>
      </div>
    </>
  );
}

export default App;
