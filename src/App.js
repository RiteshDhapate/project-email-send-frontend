import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";
import { GoogleGenerativeAI } from "@google/generative-ai";

function App() {
  const [email, setEmail] = useState("");
  const [emailBody, setEmailBody] = useState("");
  const [userPrompt, setUserPrompt] = useState("");

  const genAI = new GoogleGenerativeAI(
    "AIzaSyBKZatzIoctt0_arla80wDMgGmZP202jHw"
  );
  const sendPrompt = async () => {
    try {
      console.log("sending server prompt");
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const prompt = `
      genrate the one email for me
      prompt = ${userPrompt}
      `;

      console.log(userPrompt);

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      console.log(text);
      setEmailBody(text);
    } catch (error) {
      console.log(error);
    }
  };

  const onSendEmail = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:8000/send-mail", {
        email,
        emailBody,
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }
    console.log({ email, emailBody });
  };
  return (
    <div className="contaner">
      <input type="text" placeholder="Enter Prompt to genrate the email" />
      <br />
      <br />
      <br />
      <button onClick={sendPrompt}>Genrate email</button>
      <br />
      <br />
      <form onSubmit={(e) => onSendEmail(e)}>
        <br />
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
