import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate, Navigate } from "react-router-dom";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4005/api/v1/user/login",
          { email, password, role: "Patient" },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setEmail("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (isAuthenticated) {
    return <Navigate to={"/"} />;
  }

  return (
    <>
      <div className="container form-component login-form">
        <h2 style={{color: "#0F52BA" }}>Sign In</h2>
        <p style={{color:"black", fontWeight:"400"}}>Please Login To Continue</p>
        <p style={{fontSize:"16px",fontStyle:"italic"}}>
        "Your health and well-being are our top priorities, and we are honored to be your trusted healthcare provider"
        </p>
        <form onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ height: "30px", padding: "10px", fontSize: "16px", color:"black", fontWeight:"200" , paddingLeft:"20px"}}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ height: "30px", padding: "10px", fontSize: "16px" , paddingLeft:"20px"}}
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
              marginTop:"-10px"
              
            }}
          >
            <p style={{ marginBottom: 0,fontSize: "16px" , color:"black" }}>Not Registered?</p>
            <Link
              to={"/register"}
              style={{ textDecoration: "none", color: "#0F52BA",fontWeight:"bold",fontSize: "16px" }}
            >
              Register Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center", marginTop:"16px" }}>
            <button type="submit" style={{background: "linear-gradient(135deg, #009688, #4CAF50", color:"white" , cursor:"pointer", fontSize:"medium"}}>Login</button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
