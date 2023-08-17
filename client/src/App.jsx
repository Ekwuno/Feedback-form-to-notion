import { useState } from "react";
import "./App.css";

function App() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function submitForm () {
    // POST request to server
    fetch("http://localhost:4000/submitForm", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ 
        name: name, 
        phone: phone,
        message: message,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
        alert("Success! Your message has been sent.");
      })
      .catch((error) => {
        console.error("Error:", error);
        alert("Error! Please try again.");
      });

    console.log(name, phone, message);
  }
  return (
    <>
      <div className="App">
        <div
          style={{
            maxWidth: "500px",
            margin: "0 auto",
            padding: "20px",
          }}
        >
          <h1>Notion Form</h1>
          <p>
            This is a simple form that will send data to a Notion database.
          </p>
          <p>Name</p>
          <input type="text" id="name" onChange={(e) => setName(e.target.value)} />

          <p>Phone</p>
          <input type="text" id="phone" onChange={(e) => setPhone(e.target.value)} />

          <p>Message</p>
          <textarea id="message" onChange={(e) => setMessage(e.target.value)} rows={10} cols={25}/>
        </div>
        <button onClick={submitForm} style={{ margin: "20px" }}>Submit </button>
      </div>
    </>
  );
}

export default App;
