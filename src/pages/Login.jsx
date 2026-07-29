// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import banner from "../assets/icon/Login_banner.png";
// import logo from "../assets/icon/web_logo.png";
// // import "../index.css";
// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8080/auth/login", {
//         email,
//         password,
//       });

//       const { token, user } = response.data;

//       console.log("Login User:", user);

//       // ✅ Store in localStorage
//       localStorage.setItem("token", token);
//       localStorage.setItem("user", JSON.stringify(user));
//       localStorage.setItem("role", user.role);
//       localStorage.setItem("email", user.email);
//       localStorage.setItem("schoolId", user.schoolId);

//       alert("Login Successful!");

//       // ✅ Role-based redirect
//       if (user.role === "ADMIN") {
//         navigate("/");
//       } else if (user.role === "SUPERADMIN") {
//         navigate("/");
//       } else {
//         navigate("/userInterface");
//       }
//     } catch (error) {
//       console.error(error);
//       alert("Invalid Credentials");
//     }
//   };

//   // const handleLogin = async (e) => {
//   //   e.preventDefault(); // prevent page reload

//   //   try {
//   //     const response = await axios.post(
//   //       "http://localhost:8080/auth/login",
//   //       {
//   //         email,
//   //         password,
//   //       }
//   //     );

//   //     console.log("Response:", response.data);

//   //     // Store JWT + user data
//   //     localStorage.setItem("token", response.data.token);
//   //     localStorage.setItem("role", response.data.role);
//   //     localStorage.setItem("email", response.data.email);
//   //     localStorage.setItem("schoolId", response.data.schoolId);

//   //     alert("Login Successful!");

//   //     // Redirect based on role
//   //     if (response.data.role === "ADMIN") {
//   //       navigate("/dashboard");
//   //     } else if (response.data.role === "SUPERADMIN") {
//   //       navigate("/");
//   //     } else {
//   //       navigate("/userInterface");
//   //     }

//   //   } catch (error) {
//   //     console.error(error);
//   //     alert("Invalid Credentials");
//   //   }
//   // };

//   return (

//     <>
//       <div
//         className="container-fluid login-bg"
//         style={{
//           minHeight: "100vh",
//           backgroundImage: `url(${banner})`,
//           backgroundSize: "cover",
//           backgroundPosition: "center bottom",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         {/* Logo */}
//         <div className="row pt-4">
//           <div className="col text-center">
//             <img
//               src={logo}
//               alt="SkoolMint"
//               style={{ height: "90px", maxWidth: "100%" }}
//             />
//           </div>
//         </div>

//         {/* Login Card */}
//         <div className="row justify-content-center align-items-center mt-4">
//           <div className="col-11 col-sm-8 col-md-6 col-lg-4">
//             <div className="p-4 shadow bg-white rounded-4">
//               <h4 className="text-primary  mb-1">Welcome to SkoolMint</h4>
//               <p className="text-muted  mb-3">
//                 Login to manage your school with ease
//               </p>

//               <form>
//                 <div className="mb-3">
//                   <label className="form-label">Email Address</label>
//                   <input
//                     type="email"
//                     className="form-control"
//                     placeholder="email@example.com"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label className="form-label">Password</label>
//                   <input
//                     type="password"
//                     className="form-control"
//                     placeholder="********"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>

//                 <div className="text-end mb-3">
//                   <a href="/forgot-password" className="forgot-link">
//                     Forgot Password?
//                   </a>
//                 </div>

//                 <button
//                   type="submit"
//                   className="green-btn rounded-lg  w-100 mt-2"
//                   onClick={handleLogin}
//                 >
//                   Login
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import axiosInstance from "../api/axiosInstance";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";

// const Login = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axiosInstance.post("/auth/login", {
//         email,
//         password,
//       });

//       login(res.data);

//       if (res.data.user.role === "ADMIN") navigate("/dashboard");
//       else if (res.data.user.role === "SUPERADMIN") navigate("/");
//       else navigate("/userInterface");

//     } catch {
//       alert("Invalid credentials");
//     }
//   };

//   return (
//     <form onSubmit={handleLogin}>
//       <input value={email} onChange={(e) => setEmail(e.target.value)} />
//       <input type="password" value={password}
//              onChange={(e) => setPassword(e.target.value)} />
//       <button type="submit">Login</button>
//     </form>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";

// import banner from "../assets/icon/Login_banner.png";
// import logo from "../assets/icon/web_logo.png";

// const Login = () => {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const { data } = await axios.post("http://localhost:8080/auth/login", {
//         email,
//         password,
//       });

//       console.log("Login Response", data);

//       const token = data.token;
//       const user = data.user;

//       // ==========================
//       // Save Login Information
//       // ==========================

//       localStorage.setItem("token", token);

//       localStorage.setItem("user", JSON.stringify(user));

//       localStorage.setItem("email", user.email);

//       localStorage.setItem("role", user.role);

//       localStorage.setItem("schoolId", user.schoolId);

//       // IMPORTANT
//       localStorage.setItem("userGroupId", user.userGroupId ?? "");

//       // School Information

//       if (user.school) {
//         localStorage.setItem("school", JSON.stringify(user.school));
//       }

//       alert("Login Successful");

//       if (user.role === "SUPERADMIN" || user.role === "ADMIN") {
//         navigate("/");
//       } else {
//         navigate("/userInterface");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Invalid Credentials");
//     }
//   };

//   return (
//     <div
//       className="container-fluid"
//       style={{
//         minHeight: "100vh",
//         backgroundImage: `url(${banner})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center bottom",
//       }}
//     >
//       <div className="row pt-4">
//         <div className="col text-center">
//           <img
//             src={logo}
//             alt=""
//             style={{
//               height: 90,
//             }}
//           />
//         </div>
//       </div>

//       <div className="row justify-content-center mt-5">
//         <div className="col-lg-4">
//           <div className="card shadow rounded-4">
//             <div className="card-body p-4">
//               <h4 className="text-primary">Welcome To SkoolMint</h4>

//               <p className="text-muted">Login to manage your school</p>

//               <form>
//                 <div className="mb-3">
//                   <label>Email</label>

//                   <input
//                     type="email"
//                     className="form-control"
//                     value={email}
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>

//                 <div className="mb-3">
//                   <label>Password</label>

//                   <input
//                     type="password"
//                     className="form-control"
//                     value={password}
//                     onChange={(e) => setPassword(e.target.value)}
//                   />
//                 </div>

//                 <button className="btn btn-success w-100" onClick={handleLogin}>
//                   Login
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import "./Login.css";
import "bootstrap/dist/css/bootstrap.min.css";


import { useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaUserGraduate,
  FaCheckCircle,
} from "react-icons/fa";

import banner from "../assets/icon/Login_banner.png";
import logo from "../assets/icon/web_logo.png";
import { useAuth } from "../context/AuthContext";
import axios from "../api/axiosInstance";

const Login = () => {

  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

 const handleLogin = async (e) => {
  e.preventDefault();

  setLoading(true);

  try {
    const { data } = await axios.post(
      "/auth/login",
      {
        email,
        password,
      }
    );

    console.log("Login Response:", data);

    // AuthContext ko update karega aur navigate bhi karega
    login({
      token: data.token,
      user: data.user,
    });

  } catch (err) {
    console.error(err);

    alert(
      err.response?.data?.message ||
      "Invalid Email or Password"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <>
  <div className="login-page">

    {/* Background Circles */}

    <div className="circle circle1"></div>
    <div className="circle circle2"></div>
    <div className="circle circle3"></div>

    <div className="container-fluid h-100">

      <div className="row h-100">

        {/* ================= LEFT SIDE ================= */}

        <div className="col-lg-7 left-side d-none d-lg-flex">

          <div className="left-content">

            <img
              src={logo}
              alt="logo"
              className="main-logo"
            />

            <h1>
              Welcome to
              <span> SkoolMint ERP</span>
            </h1>

            <p>
              Complete School Management Solution
              for Admissions, Attendance, Fees,
              Examination, Library, Transport,
              Payroll and much more.
            </p>

            <div className="feature-box">

              <div className="feature">

                <FaCheckCircle />

                Student Management

              </div>

              <div className="feature">

                <FaCheckCircle />

                Attendance

              </div>

              <div className="feature">

                <FaCheckCircle />

                Fees Collection

              </div>

              <div className="feature">

                <FaCheckCircle />

                Examination

              </div>

              <div className="feature">

                <FaCheckCircle />

                Transport

              </div>

              <div className="feature">

                <FaCheckCircle />

                Library

              </div>

            </div>

            {/* <img
              src={banner}
              alt="banner"
              className="banner"
            /> */}

          </div>

        </div>

        {/* ================= RIGHT SIDE ================= */}

        <div className="col-lg-5 col-md-12 right-side">

          <div className="login-card">

            <div className="text-center">

              <div className="logo-circle">

                <FaUserGraduate />

              </div>

              <h2>
                Welcome Back
              </h2>

              <p>
                Login to continue
              </p>

            </div>

            <form onSubmit={handleLogin}>

              {/* Email */}

              <div className="input-box">

                <FaEnvelope className="icon" />

                <input
                  type="email"
                  placeholder="Enter Email"

                  value={email}

                  onChange={(e) =>
                    setEmail(e.target.value)
                  }

                  required
                />

              </div>

              {/* Password */}

              <div className="input-box">

                <FaLock className="icon" />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }

                  placeholder="Enter Password"

                  value={password}

                  onChange={(e) =>
                    setPassword(e.target.value)
                  }

                  required
                />

                <span
                  className="eye"

                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >

                  {showPassword ? (
                    <FaEyeSlash />
                  ) : (
                    <FaEye />
                  )}

                </span>

              </div>

              <div className="remember-row">

                <label>

                  <input type="checkbox" />

                  Remember Me

                </label>

                <a href="#">
                  Forgot Password?
                </a>

              </div>

              <button
                className="login-btn"

                type="submit"

                disabled={loading}
              >

                {loading
                  ? "Signing In..."
                  : "LOGIN"}

              </button>

            </form>

            <div className="copyright">

              © 2026 SkoolMint ERP

            </div>

          </div>

        </div>

      </div>

    </div>

  </div>
  </>
);
};

export default Login;