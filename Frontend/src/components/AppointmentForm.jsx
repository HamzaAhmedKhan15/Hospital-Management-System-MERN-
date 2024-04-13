import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { toast } from "react-toastify";

const AppointmentForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [department, setDepartment] = useState("Pediatrics");
  const [doctorFirstName, setDoctorFirstName] = useState("");
  const [doctorLastName, setDoctorLastName] = useState("");
  const [address, setAddress] = useState("");
  const [hasVisited, setHasVisited] = useState(false);

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const [doctors, setDoctors] = useState([]);
  useEffect(() => {
    const fetchDoctors = async () => {
      const { data } = await axios.get(
        "http://localhost:4005/api/v1/user/doctors",
        { withCredentials: true }
      );
      setDoctors(data.doctors);
      console.log(data.doctors);
    };
    fetchDoctors();
  }, []);
  const handleAppointment = async (e) => {
    e.preventDefault();
    try {
      const hasVisitedBool = Boolean(hasVisited);
      const { data } = await axios.post(
        "http://localhost:4005/api/v1/appointment/post",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          appointment_date: appointmentDate,
          department,
          doctor_firstName: doctorFirstName,
          doctor_lastName: doctorLastName,
          hasVisited: hasVisitedBool,
          address,
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success(data.message);
      setFirstName(""),
        setLastName(""),
        setEmail(""),
        setPhone(""),
        setNic(""),
        setDob(""),
        setGender(""),
        setAppointmentDate(""),
        setDepartment(""),
        setDoctorFirstName(""),
        setDoctorLastName(""),
        setHasVisited(""),
        setAddress("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <>
      <div className="container form-component appointment-form">
        <h2 style={{color: "#0F52BA" }} className="maintitle">Appointments</h2>
        <form onSubmit={handleAppointment}>
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
              placeholder="NIC"
              value={nic}
              onChange={(e) => setNic(e.target.value)}
              style={{ height: "30px", padding: "20px", fontSize: "16px" }}
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
              style={{ height: "30px", padding: "20px", fontSize: "13px" }}
            />
          </div>
          <div>
      <select style={{ height: '40px', padding: "10px",fontSize: "16px", paddingRight:"30px" }} value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="Select Gender">Select Gender</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input
        type="date"
        placeholder="Appointment Date"
        value={appointmentDate}
        onChange={(e) => setAppointmentDate(e.target.value)}
        style={{ height: "30px", padding: "20px", fontSize: "13px" }}
      />
    </div>
          <div>
            <select
              value={department}
              style={{ height: '40px', padding: "10px",fontSize: "16px", paddingRight:"30px" }}
              onChange={(e) => {
                setDepartment(e.target.value);
                setDoctorFirstName("");
                setDoctorLastName("");
              }}
            >
              {departmentsArray.map((depart, index) => {
                return (
                  <option value={depart} key={index}>
                    {depart}
                  </option>
                );
              })}
            </select>

            <select
  value={`${doctorFirstName} ${doctorLastName}`}
  onChange={(e) => {
    const [firstName, lastName] = e.target.value.split(" ");
    setDoctorFirstName(firstName);
    setDoctorLastName(lastName);
  }}
  disabled={!department}
  style={{ height: '40px', padding: "10px",fontSize: "16px", paddingRight:"30px" }}
>
  <option value="">Select Doctor</option>
  {doctors
    .filter((doctor) => {
      const isMatched = doctor.doctorDepartment === department;
      console.log("Filtered Doctors:", doctor, "Is matched:", isMatched);
      return isMatched;
    })
    .map((doctor, index) => (
      <option
        value={`${doctor.firstName} ${doctor.lastName}`}
        key={index}
      >
        {doctor.firstName} {doctor.lastName}
      </option>
    ))}
</select>

          </div>
          <textarea
            rows="8"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Address"
            style={{ fontSize: "18px" , paddingLeft:"18px"}} 
          />
          <div
            style={{
              gap: "10px",
              justifyContent: "flex-end",
              flexDirection: "row",
            }}
          >
            <p style={{ marginBottom: 0, fontSize: "16px" , color:"black"}}>Have you visited before?</p>
            <input
              type="checkbox"
              checked={hasVisited}
              onChange={(e) => setHasVisited(e.target.checked)}
              style={{ flex: "none", width: "25px" }}
            />
          </div>
          <button style={{ margin: "0 auto", background: "linear-gradient(135deg, #009688, #4CAF50", color:"white",fontSize: "medium", cursor:"pointer" }}>GET APPOINTMENT</button>
        </form>
      </div>
    </>
  );
};

export default AppointmentForm;
