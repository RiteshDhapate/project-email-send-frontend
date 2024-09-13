import React, { useEffect, useState } from 'react'
import axios from 'axios';
const App = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const handleSendMessage = async () => {
    try {
      const data = await axios.post("https://project-send-email-backend.vercel.app/message", {
        message
      });
      console.log(data.data.result);
      setMessages([...messages, { message, result: data.data.result }]);
      setMessage("");
    } catch (error) {
      console.error(error);
    }
  }
  useEffect(() => {
    console.log(messages);
  }, [messages]);
  return (
    <div>
      {/* messages */}
      <div>{messages.map((item, index) => (
        <div>
          <div>user : {item.message}</div>
          <div>ai : {item.result}</div>
        </div>
      ))}</div>
      <div>
        <input
          type="text"
          placeholder="Enter message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}

        />
        <br />
        <br />
        <button onClick={handleSendMessage}>Send Message</button>
      </div>
    </div>
  );
}

export default App
