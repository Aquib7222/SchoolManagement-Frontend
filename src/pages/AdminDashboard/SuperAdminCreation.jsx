// import React from 'react'

// const SuperAdminCreation = () => {
//   return (
//     <div className='mx-2 mt-5 border p-3 rounded shadow-sm table-responsive w-100'>
//         <h5>Super Admin Creation</h5>
//     </div>
//   )
// }

// export default SuperAdminCreation

// import React, { useEffect, useState } from "react";

// const SuperAdminCreation = () => {
//   const [schools, setSchools] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     schoolId: "",
//   });

//   // Load schools from localStorage
//   useEffect(() => {
//     const savedSchools = JSON.parse(localStorage.getItem("school")) || [];
//     setSchools(savedSchools);
//   }, []);

//   // Handle input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Save SuperAdmin
//   const saveSuperAdmin = () => {
//     if (!form.name || !form.email || !form.password || !form.schoolId) {
//       alert("All fields are required including School selection");
//       return;
//     }

//     const newSuperAdmin = {
//       id: Date.now(),
//       name: form.name,
//       email: form.email,
//       password: form.password,
//       schoolId: form.schoolId, // link super admin to school
//       createdAt: new Date().toLocaleString(),
//     };

//     const savedAdmins = JSON.parse(localStorage.getItem("superAdmins")) || [];
//     savedAdmins.push(newSuperAdmin);

//     localStorage.setItem("superAdmins", JSON.stringify(savedAdmins));

//     alert("Super Admin Created!");

//     // Clear form
//     setForm({
//       name: "",
//       email: "",
//       password: "",
//       schoolId: "",
//     });
//   };

//   return (
//     <div className="border p-4 rounded shadow-sm mx-2 mt-4">
//       <h5> Super Admin Creation</h5>

//       <div className="row">
//         <div className="col-md-6">
//           {/* School Dropdown */}
//           <div className="mt-3">
//             <label>Select School</label>
//             <select
//               className="form-control"
//               name="schoolId"
//               value={form.schoolId}
//               onChange={handleChange}
//             >
//               <option value="">-- Choose School --</option>

//               {schools.map((s) => (
//                 <option key={s.id} value={s.id}>
//                   {s.name}
//                 </option>
//               ))}
//             </select>
//           </div>
//         </div>
//         <div className="col-md-3">
//           {/* Name */}
//           <div className="mt-3">
//             <label>Full Name</label>
//             <input
//               type="text"
//               className="form-control"
//               name="name"
//               value={form.name}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//         <div className="col-md-3">
//           {/* Email */}
//           <div className="mt-3">
//             <label>Email</label>
//             <input
//               type="email"
//               className="form-control"
//               name="email"
//               value={form.email}
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Password */}
//       <div className="mt-3">
//         <label>Password</label>
//         <input
//           type="password"
//           className="form-control"
//           name="password"
//           value={form.password}
//           onChange={handleChange}
//         />
//       </div>

//       {/* Save Button */}
//       <div className="mt-4">
//         <button className="btn btn-primary" onClick={saveSuperAdmin}>
//           Create Super Admin
//         </button>
//       </div>
//     </div>
//   );
// };

// export default SuperAdminCreation;

// import React, { useEffect, useState } from "react";

// const SuperAdminCreation = () => {
//   const [schools, setSchools] = useState([]);
//   const [superAdmins, setSuperAdmins] = useState([]);

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     schoolId: "",
//     role: "",
//     status: "Active",
//   });

//   // Load schools and super admins from localStorage
//   useEffect(() => {
//     const savedSchools = JSON.parse(localStorage.getItem("school")) || [];
//     const savedAdmins = JSON.parse(localStorage.getItem("superAdmins")) || [];

//     setSchools(savedSchools);
//     setSuperAdmins(savedAdmins);
//   }, []);

//   // Handle input change
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Save Super Admin
//   const saveSuperAdmin = () => {
//     if (!form.name || !form.email || !form.password || !form.schoolId) {
//       alert("All fields including School selection are required!");
//       return;
//     }

//     const newSuperAdmin = {
//       id: Date.now(),
//       name: form.name,
//       email: form.email,
//       password: form.password,
//       schoolId: form.schoolId,
//       school:form.school,
//       role: form.role,
//       status: form.status,
//       createdAt: new Date().toLocaleString(),
//     };

//     const updatedAdmins = [...superAdmins, newSuperAdmin];

//     setSuperAdmins(updatedAdmins);
//     localStorage.setItem("superAdmins", JSON.stringify(updatedAdmins));
//     // -------- SAVE TO schoolUsers --------
//     const savedUsers = JSON.parse(localStorage.getItem("SchoolUser")) || [];

//     const newSchoolUser = {
//       ...newSuperAdmin,
//       id: Date.now() + 1, // prevent same id
//       // userType: "SchoolUser", // custom field (optional)
//     };

//     const updatedUsers = [...savedUsers, newSchoolUser];
//     localStorage.setItem("SchoolUser", JSON.stringify(updatedUsers));

//     alert("Super Admin Created Successfully!");

//     setForm({
//       name: "",
//       email: "",
//       password: "",
//       schoolId: "",
//       role: "",
//       status: "Active",
//     });
//   };

//   // Toggle Status Active/Inactive
//   const toggleStatus = (id) => {
//     const updated = superAdmins.map((admin) =>
//       admin.id === id
//         ? {
//             ...admin,
//             status: admin.status === "Active" ? "Inactive" : "Active",
//           }
//         : admin
//     );

//     setSuperAdmins(updated);
//     localStorage.setItem("superAdmins", JSON.stringify(updated));
//   };

//   // Get school name from ID
//   const getSchoolName = (id) => {
//     const school = schools.find((s) => s.id === Number(id));
//     return school ? school.name : "N/A";
//   };

//   // DELETE SUPER ADMIN
//   const deleteSuperAdmin = (id) => {
//     if (!window.confirm("Are you sure you want to delete this Super Admin?")) {
//       return;
//     }

//     const updated = superAdmins.filter((admin) => admin.id !== id);
//     setSuperAdmins(updated);
//     localStorage.setItem("superAdmins", JSON.stringify(updated));

//     // ALSO DELETE FROM schoolUsers TABLE
//     const savedUsers = JSON.parse(localStorage.getItem("schoolUsers")) || [];
//     const updatedUsers = savedUsers.filter((user) => user.id !== id);
//     localStorage.setItem("schoolUsers", JSON.stringify(updatedUsers));

//     alert("Super Admin Deleted Successfully!");
//   };

//   return (
//     <div className="mx-2 mt-4 border p-3 rounded shadow-sm table-responsive">
//       <h5> Super Admin Creation</h5>

//       {/* ----- FORM SECTION ----- */}
//       <div className="row">
//         <div className="col-md-4">
//           <label className="mt-3">Select School</label>
//           <select
//             className="form-control"
//             name="schoolId"
//             value={form.schoolId}
//             onChange={handleChange}
//           >
//             <option value="">-- Choose School --</option>
//             {schools.map((s) => (
//               <option key={s.id} value={s.id}>
//                 {s.name}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div className="col-md-4">
//           <label className="mt-3">Full Name</label>
//           <input
//             type="text"
//             className="form-control"
//             name="name"
//             value={form.name}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="col-md-4">
//           <label className="mt-3">Email</label>
//           <input
//             type="email"
//             className="form-control"
//             name="email"
//             value={form.email}
//             onChange={handleChange}
//           />
//         </div>
//       </div>

//       <div className="row mt-3">
//         <div className="col-md-3">
//           <label>Role</label>
//           <select
//             className="form-control"
//             name="role"
//             value={form.role}
//             onChange={handleChange}
//           >
//             <option value="">-- Choose Role --</option>
//             <option value="SUPERADMIN">SUPERADMIN</option>
//           </select>
//         </div>
//         <div className="col-md-3">
//           <label>Password</label>
//           <input
//             type="password"
//             className="form-control"
//             name="password"
//             value={form.password}
//             onChange={handleChange}
//           />
//         </div>

//         <div className="col-md-3">
//           <label>Status</label>
//           <select
//             className="form-control"
//             name="status"
//             value={form.status}
//             onChange={handleChange}
//           >
//             <option>Active</option>
//             <option>Inactive</option>
//           </select>
//         </div>

//         <div className="col-md-3 d-flex align-items-end">
//           <button className="btn btn-primary w-100" onClick={saveSuperAdmin}>
//             Create Super Admin
//           </button>
//         </div>
//       </div>

//       {/* ----- TABLE SECTION ----- */}
//       <div className="mt-5">
//         <h5> Super Admin List </h5>

//         <table className="table table-striped table-bordered mt-3">
//           <thead>
//             <tr>
//               <th>School</th>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Status</th>
//               <th>Role</th>
//               <th>Created At</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {superAdmins.length > 0 ? (
//               superAdmins.map((admin) => (
//                 <tr key={admin.id}>
//                   <td>{getSchoolName(admin.schoolId)}</td>
//                   <td>{admin.name}</td>
//                   <td>{admin.email}</td>
//                   <td>
//                     <div className="form-check form-switch">
//                       <input
//                         className="form-check-input"
//                         type="checkbox"
//                         checked={admin.status === "Active"}
//                         onChange={() => toggleStatus(admin.id)}
//                       />
//                       <label className="form-check-label">{admin.status}</label>
//                     </div>
//                   </td>
//                   <td>{admin.role}</td>
//                   <td>{admin.createdAt}</td>
//                   <td>
//                     <button
//                       className="btn btn-danger btn-sm"
//                       onClick={() => deleteSuperAdmin(admin.id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="5" className="text-center">
//                   No Super Admins Found
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default SuperAdminCreation;


import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SuperAdminCreation = () => {
  const [schools, setSchools] = useState([]);
  const [superAdmins, setSuperAdmins] = useState([]);
  const navigate =useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone:"",
    schoolId: "",
    role: "SUPERADMIN",
    status: "Active",
  });

  const token = localStorage.getItem("token");

  // 🔹 Load schools & super admins
  useEffect(() => {
    fetchSchools();
    fetchSuperAdmins();
  }, []);

  // 🔹 Fetch schools
  const fetchSchools = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/school/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSchools(res.data);
    } catch (err) {
      console.error("Failed to load schools", err);
    }
  };

  // 🔹 Fetch super admins
  const fetchSuperAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/superadmin/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("res",res);
      setSuperAdmins(res.data);
    } catch (err) {
      console.error("Failed to load super admins", err);
    }
  };
  console.log("super admins",superAdmins);

  // 🔹 Handle input change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🔹 Create Super Admin
  const saveSuperAdmin = async () => {
    if (!form.name || !form.email || !form.password || !form.schoolId) {
      alert("All fields are required!");
      return;
    }

    try {
      const res = await axios.post(
        `http://localhost:8080/api/superadmin/create/${form.schoolId}`,
        {
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
          phone: form.phone,
          status: form.status,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setSuperAdmins((prev) => [...prev, res.data]);
      alert("Super Admin Created Successfully!");

      setForm({
        name: "",
        email: "",
        password: "",
        schoolId: "",
        phone:"",
        role: "SUPERADMIN",
        status: "Active",
      });
    } catch (err) {
      console.error("Create failed", err);
      alert("Failed to create Super Admin");
    }
    navigate(-2);
  };

  // 🔹 Toggle Active / Inactive
  const toggleStatus = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/superadmin/toggle/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuperAdmins((prev) =>
        prev.map((a) => (a.id === id ? res.data : a))
      );
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  // 🔹 Delete Super Admin
  const deleteSuperAdmin = async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/superadmin/delete/${id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setSuperAdmins((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

 

  return (
    <>
     <div
        className="row shadow"
        style={{
          backgroundColor: "white",
          margin: "10px",
          height: "67px",
          borderRadius: "5px",
          padding: "10px",
          color: "black",
        }}
      >
        <h6>
          <strong>Create Super Admins </strong>
        </h6>
        <nav aria-label="breadcrumb py-2">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="#" style={{ textDecoration: "none", color: "black" }}>
                SuperAdmins Creations
              </a>
            </li>
          </ol>
        </nav>
      </div>

    <div className="mx-2 mt-4 border p-3 rounded shadow-sm table-responsive">
      <h5>Super Admin Creation</h5>

      {/* FORM */}
      <div className="row">
        <div className="col-md-4">
          <label className="mt-3">Select School</label>
          <select
            className="form-control"
            name="schoolId"
            value={form.schoolId}
            onChange={handleChange}
          >
            <option value="">-- Choose School --</option>
            {schools.map((s) => (
              <option key={s.id} value={s.id}>
                {s.schoolName}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-4">
          <label className="mt-3">Full Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <label className="mt-3">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="row mt-3">
        <div className="col-md-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            name="password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-3">
          <label>Status</label>
          <select
            className="form-control"
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
         <div className="col-md-3">
          <label>Phone No</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </div>


        <div className="col-md-3 d-flex align-items-end">
          <button className="btn btn-primary w-100" onClick={saveSuperAdmin}>
            Create Super Admin
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="mt-5">
        <h5>Super Admin List</h5>

        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>School</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Status</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {superAdmins.length > 0 ? (
              superAdmins.map((admin) => (
                <tr key={admin.id}>
                  <td>{admin.school?.schoolName}</td>
                  <td>{admin.fullName}</td>
                  <td>{admin.email}</td>
                  <td>{admin.phone}</td>
                  <td>
                    <input
                      type="checkbox"
                      checked={admin.status === "Active"}
                      onChange={() => toggleStatus(admin.id)}
                    />
                    {admin.status}
                  </td>
                  <td>{admin.role}</td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteSuperAdmin(admin.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No Super Admins Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};

export default SuperAdminCreation;
