import React, { useState } from "react";
import axios from "axios";

const Register = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("ADMIN");
  const [schoolId, setSchoolId] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:8080/auth/register", {
        email,
        password,
        role,
        schoolId
      });

      alert("Registration Successful! Please Login");

    } catch (error) {
      alert("Registration Failed");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="p-4 shadow border rounded" style={{ width: "350px" }}>
        <h5 className="mb-3">Register</h5>

        <input className="form-control mb-2"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input className="form-control mb-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <select className="form-control mb-2"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="ADMIN">Admin</option>
          <option value="SUPERADMIN">Super Admin</option>
        </select>

        <input className="form-control mb-3"
          placeholder="School ID"
          value={schoolId}
          onChange={(e) => setSchoolId(e.target.value)}
        />

        <button className="btn btn-success w-100" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
};

export default Register;
