import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const MessageForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleMessage = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4000/api/v1/message/send",
          { firstName, lastName, email, phone, message },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setMessage("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container form-component message-form">
        <h2 style={{color: "#0F52BA"  }} className="maintitle">Send Us A Message</h2>
        <form onSubmit={handleMessage}>
          <div>
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              style={{ height: "30px", padding: "20px", fontSize: "16px" }}
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              style={{ height: "30px", padding: "20px", fontSize: "16px" }}
            />
          </div>
          <div>
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ height: "30px", padding: "20px", fontSize: "16px" }}
            />
            <input
              type="number"
              placeholder="Mobile Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{ height: "30px", padding: "20px", fontSize: "16px" }}
            />
          </div>
          <textarea
  rows={8}
  placeholder="Message"
  value={message}
  onChange={(e) => setMessage(e.target.value)}
  style={{ fontSize: "18px" , paddingLeft:"18px"}} // Adjust the font size as needed
/>

          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button type="submit" style={{background: "linear-gradient(135deg, #009688, #4CAF50", color:"white", cursor:"pointer",fontSize: "medium"}}>Send</button>
          </div>
        </form>
        <img src="/Vector.png" alt="vector" style={{ filter: 'hue-rotate(284deg) saturate(1000%)' }} />
      </div>
    </>
  );
};

export default MessageForm;
