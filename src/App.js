import logo from './logo.svg';
import './App.css';
import { useState} from "react";
import axios from "axios";

function App() {
  const [email, setEmail] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const onSendEmail =async (e) => { 
    e.preventDefault();
    try {
      const result = await axios.post("https://project-send-email-backend.vercel.app/send-mail", {
        email,
        emailBody
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    console.log({ email, emailBody });
  }
  return (
    <div className="contaner">
      <form onSubmit={(e)=>onSendEmail(e)}>
        <input
          type="email"
          placeholder="Enter email.."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br />
        <br />
        <textarea
          name=""
          id=""
          value={emailBody}
          onChange={(e) => setEmailBody(e.target.value)}
        ></textarea>
        <br />
        <br />
        <button>Send Email</button>
      </form>
    </div>
  );
}

export default App;
