import axios from "axios";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://localhost:4005/api/v1/user/patient/register",
          {
            firstName,
            lastName,
            email,
            phone,
            nic,
            dob,
            gender,
            password,
            role: "Patient",
          },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setNic("");
          setDob("");
          setGender("");
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
      <div
        className="container form-component register-form"
        style={{ marginTop: "150px" }}
      >
        <h2 style={{ color: "#0F52BA" }}>Sign Up</h2>
        <p style={{ color:"black", fontWeight:"400" }}>Please Sign Up To Continue</p>
        <p style={{ fontSize: "16px", fontStyle: "italic" }}>
          "Your health and well-being are our top priorities, and we are honored
          to be your trusted healthcare provider"
        </p>
        <form onSubmit={handleRegistration}>
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
          <div>
            <input
              type="number"
              placeholder="42XXXXXXXXXXX"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              style={{ height: "30px", padding: "20px", fontSize: "16px" }}
            />
            <input
              type={"date"}
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              style={{ height: "30px", padding: "20px", fontSize: "13px" }}
            />
          </div>
          <div>
            <select style={{ height: '40px', padding: "10px",fontSize: "16px", paddingRight:"30px" }} value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Female">Other</option>
            </select>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ height: "30px", padding: "20px", fontSize: "16px" }}
            />
          </div>
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0 ,fontSize: "16px" , color:"black"}}>Already Registered?</p>
            <Link
              to={"/login"}
              style={{
                textDecoration: "none",
                color: "#0F52BA",
                fontWeight: "bold",
                fontSize: "16px" 
              }}
            >
              Login Now
            </Link>
          </div>
          <div style={{ justifyContent: "center", alignItems: "center" }}>
            <button
              type="submit"
              style={{
                background: "linear-gradient(135deg, #009688, #4CAF50",
                color: "white",
                marginTop: "20px",
                cursor: "pointer",
                fontSize:"medium"
              }}
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
