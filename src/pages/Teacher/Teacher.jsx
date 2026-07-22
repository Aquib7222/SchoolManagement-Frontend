// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const Teacher = () => {
//   const navigate = useNavigate();
//   const [teachers, setTeachers] = useState([]);
//   const [loading,setLoading]=useState(true);
//   const [error,setError]=useState(null);
//   const [filteredTeachers, setFilteredTeachers] = useState([]);
//   const [searchId, setSearchId] = useState("");
//   const [searchName, setSearchName] = useState("");
//   const [status, setStatus] = useState("");

//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 10;

//   useEffect(() => {
//     const data = JSON.parse(localStorage.getItem("TeacherFormData")) || [];
//     setTeachers(data);
//     setFilteredTeachers(data);
//   }, []);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user.school.id;
//    const token = localStorage.getItem("token");

// useEffect(() => {
//   if (!schoolId || !token) {
//     alert("school and token not found");
//     return;
//   }

//   const fetchTeachers = async () => {
//     try {
//       const response = await axios.get(
//         `https://localhost:8080/api/teachers?schoolId=${schoolId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`
//           }
//         }
//       );
//       setTeachers(response.data);
//     } catch (error) {
//       console.error("Error fetching teachers:", error);
//     }
//   };

//   fetchTeachers();
// }, [schoolId, token]);

// console.log("Teachers",teachers);

//   const handleAddTeacher = () => {
//     navigate("/teacher/add");
//   };

//   //   const handleSearch = () => {
//   //     let filtered = teachers;

//   //     if (searchId.trim()) {
//   //       filtered = filtered.filter((t) =>
//   //         t.id.toLowerCase().includes(searchId.trim().toLowerCase())
//   //       );
//   //     }

//   //     if (searchName.trim()) {
//   //       filtered = filtered.filter((t) =>
//   //         `${t.firstName} ${t.middleName} ${t.lastName}`
//   //           .toLowerCase()
//   //           .includes(searchName.trim().toLowerCase())
//   //       );
//   //     }

//   //     if (status) {
//   //       filtered = filtered.filter((t) => t.status === status);
//   //     }

//   //     setFilteredTeachers(filtered);
//   //     setCurrentPage(1);
//   //   };
//   useEffect(() => {
//     let filtered = teachers;

//     if (searchId.trim()) {
//       filtered = filtered.filter((t) =>
//         t.id.toLowerCase().includes(searchId.trim().toLowerCase()),
//       );
//     }

//     if (searchName.trim()) {
//       filtered = filtered.filter((t) =>
//         `${t.firstName} ${t.middleName} ${t.lastName}`
//           .toLowerCase()
//           .includes(searchName.trim().toLowerCase()),
//       );
//     }

//     if (status) {
//       filtered = filtered.filter((t) => t.status === status);
//     }

//     setFilteredTeachers(filtered);
//     setCurrentPage(1);
//   }, [searchId, searchName, status, teachers]);

//   const handleEdit = (id) => {
//     navigate(`/teacher/edit/${id}`);
//   };

//   const handleDelete = (id) => {
//     const updated = teachers.filter((t) => t.id !== id);
//     localStorage.setItem("TeacherFormData", JSON.stringify(updated));
//     setTeachers(updated);
//     setFilteredTeachers(updated);
//     alert("Teacher deleted successfully.");
//   };

//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentItems = filteredTeachers.slice(
//     indexOfFirstItem,
//     indexOfLastItem,
//   );
//   const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);

//   return (
//     <>
//       <div
//         className="row shadow-lg"
//         style={{
//           backgroundColor: "white",
//           margin: "10px",
//           height: "70px",
//           borderRadius: "5px",
//           padding: "10px",
//           color: "black",
//         }}
//       >
//         <h6>
//           <strong>Teacher</strong>
//         </h6>
//         <nav aria-label="breadcrumb py-2">
//           <ol className="breadcrumb">
//             <li className="breadcrumb-item">
//               <a href="/" style={{ textDecoration: "none", color: "black" }}>
//                 Home
//               </a>
//             </li>
//             <li className="breadcrumb-item active">Teacher</li>
//           </ol>
//         </nav>
//       </div>

//       {/* Search */}
//       <div className="ms-2 me-2 mt-4 rounded shadow bg-white p-3">
//         <div className="row mt-2">
//           <div className="col-md-3">
//             <label>
//               <strong>By Employee Id</strong>
//             </label>
//             <input
//               type="text"
//               className="w-100 rounded p-2"
//               value={searchId}
//               onChange={(e) => setSearchId(e.target.value)}
//             />
//           </div>
//           <div className="col-md-3">
//             <label>
//               <strong>By Teacher Name</strong>
//             </label>
//             <input
//               type="text"
//               className="w-100 rounded p-2"
//               value={searchName}
//               onChange={(e) => setSearchName(e.target.value)}
//             />
//           </div>
//           <div className="col-md-3">
//             <label>
//               <strong>Status</strong>
//             </label>
//             <select
//               className="w-100 rounded p-2"
//               value={status}
//               onChange={(e) => setStatus(e.target.value)}
//             >
//               <option value="">Select</option>
//               <option value="Working">Working</option>
//               <option value="Resign">Resign</option>
//             </select>
//           </div>
//           <div className="col-md-3 mt-4">
//             {/* <button className="btn btn-success p-2 me-2" onClick={handleSearch}>Search</button> */}
//             <button className="btn btn-primary p-2" onClick={handleAddTeacher}>
//               + Add Teacher
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Teacher List Table */}
//       <div className="ms-2 me-2 rounded shadow bg-white mt-4 p-3">
//         <div style={{ maxWidth: "1100px", overflowX: "auto" }}>
//           <table
//             className="table table-bordered table-striped"
//             style={{ minWidth: "1200px" }}
//           >
//             <thead>
//               <tr>
//                 <th className="bg-info text-white">S.No</th>
//                 <th className="bg-info text-white"></th>
//                 <th className="bg-info text-white">Employee ID</th>
//                 <th className="bg-info text-white">Teacher Name</th>
//                 <th className="bg-info text-white">Date of Birth</th>
//                 <th className="bg-info text-white">Gender</th>
//                 <th className="bg-info text-white">Address</th>
//                 <th className="bg-info text-white">Contact</th>
//                 <th className="bg-info text-white">Status</th>
//                 <th className="bg-info text-white">Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {currentItems.length > 0 ? (
//                 currentItems.map((teacher, index) => (
//                   <tr key={teacher.id}>
//                     <td>{indexOfFirstItem + index + 1}</td>
//                     <td>
//                       <img
//                         src={teacher.photo}
//                         alt=""
//                         style={{ height: "100px", width: "100px" }}
//                       />
//                     </td>
//                     <td>{teacher.id}</td>
//                     <td className="text-danger">
//                       {teacher.firstName} {teacher.middleName}{" "}
//                       {teacher.lastName}
//                     </td>
//                     <td>{teacher.dob}</td>
//                     <td>{teacher.gender}</td>
//                     <td>
//                       {teacher.addressLine1}, {teacher.addressLine2},{" "}
//                       {teacher.city}
//                     </td>
//                     <td>{teacher.phoneNumber}</td>
//                     <td>{teacher.status}</td>
//                     <td>
//                       <button
//                         className="btn btn-sm btn-info me-1"
//                         onClick={() => handleEdit(teacher.id)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-sm btn-danger"
//                         onClick={() => handleDelete(teacher.id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="9" className="text-center">
//                     No Teachers Found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

//         {/* Pagination */}
//         <div className="d-flex justify-content-center mt-3">
//           <button
//             className="btn btn-outline-secondary me-2"
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//           >
//             Prev
//           </button>
//           <span className="align-self-center">
//             Page {currentPage} of {totalPages}
//           </span>
//           <button
//             className="btn btn-outline-secondary ms-2"
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Teacher;

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Teacher = () => {
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [filteredTeachers, setFilteredTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchId, setSearchId] = useState("");
  const [searchName, setSearchName] = useState("");
  const [status, setStatus] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Get user and token
  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.school?.id;
  const token = localStorage.getItem("token");

  // Fetch teachers from backend
  useEffect(() => {
    if (!schoolId || !token) {
      alert("School and token not found");
      setLoading(false);
      return;
    }

    const fetchTeachers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/teachers?schoolId=${schoolId}`, // <-- use HTTP in dev
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setTeachers(response.data);
        setFilteredTeachers(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching teachers:", err);
        setError("Failed to fetch teachers");
        setLoading(false);
      }
    };

    fetchTeachers();
  }, [schoolId, token]);

  // Filter teachers whenever search inputs change
 useEffect(() => {
  let filtered = teachers;

  if (searchId.trim()) {
    filtered = filtered.filter((t) =>
      t.employeeId.toString().includes(searchId.trim())
    );
  }

  if (searchName.trim()) {
    filtered = filtered.filter((t) =>
      `${t.firstName} ${t.middleName || ""} ${t.lastName}`
        .toLowerCase()
        .includes(searchName.trim().toLowerCase())
    );
  }

  if (status) {
    filtered = filtered.filter((t) => t.status === status);
  }

  setFilteredTeachers(filtered);
  setCurrentPage(1);
}, [teachers, searchId, searchName, status]);


  const handleAddTeacher = () => navigate("/teacher/add");
  const handleEdit = (employeeId) => navigate(`/teacher/edit/${employeeId}`);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      const updated = teachers.filter((t) => t.id !== id);
      setTeachers(updated);
      setFilteredTeachers(updated);
      localStorage.setItem("TeacherFormData", JSON.stringify(updated));
      alert("Teacher deleted successfully.");
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTeachers.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  const totalPages = Math.ceil(filteredTeachers.length / itemsPerPage);

  // Render
  if (loading) return <p className="text-center mt-4">Loading teachers...</p>;
  if (error) return <p className="text-center mt-4 text-danger">{error}</p>;
console.log("teachers",teachers);
  return (
    <>
      {/* Header */}
      <div
        className="row shadow-lg"
        style={{
          backgroundColor: "white",
          margin: "10px",
          height: "70px",
          borderRadius: "5px",
          padding: "10px",
          color: "black",
        }}
      >
        <h6>
          <strong>Teacher</strong>
        </h6>
        <nav aria-label="breadcrumb py-2">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </a>
            </li>
            <li className="breadcrumb-item active">Teacher</li>
          </ol>
        </nav>
      </div>

      {/* Search */}
      <div className="ms-2 me-2 mt-4 rounded shadow bg-white p-3">
        <div className="row mt-2">
          <div className="col-md-3">
            <label>
              <strong>By Employee Id</strong>
            </label>
            <input
              type="text"
              className="w-100 rounded p-2"
              value={searchId}
              onChange={(e) => setSearchId(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label>
              <strong>By Teacher Name</strong>
            </label>
            <input
              type="text"
              className="w-100 rounded p-2"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
          </div>
          <div className="col-md-3">
            <label>
              <strong>Status</strong>
            </label>
            <select
              className="w-100 rounded p-2"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="">Select</option>
              <option value="Working">Working</option>
              <option value="Resign">Resign</option>
            </select>
          </div>
          <div className="col-md-3 mt-4">
            <button className="btn btn-primary p-2" onClick={handleAddTeacher}>
              + Add Teacher
            </button>
          </div>
        </div>
      </div>

      {/* Teacher Table */}
      <div className="ms-2 me-2 rounded shadow bg-white mt-4 p-3">
        <div style={{ maxWidth: "1100px", overflowX: "auto" }}>
          <table
            className="table table-bordered table-striped"
            style={{ minWidth: "1200px" }}
          >
            <thead>
              <tr>
                <th className="bg-info text-white">S.No</th>
                <th className="bg-info text-white">Photo</th>
                <th className="bg-info text-white">Employee ID</th>
                <th className="bg-info text-white">Teacher Name</th>
                <th className="bg-info text-white">DOB</th>
                <th className="bg-info text-white">Gender</th>
                <th className="bg-info text-white">Address</th>
                <th className="bg-info text-white">Contact</th>
                <th className="bg-info text-white">Status</th>
                <th className="bg-info text-white">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.length > 0 ? (
                currentItems.map((teacher, index) => (
                  <tr key={teacher.id}>
                    <td>{indexOfFirstItem + index + 1}</td>
                    <td>
                      <img
                        src={teacher.photo}
                        alt=""
                        style={{ height: "100px", width: "100px" }}
                      />
                    </td>
                    <td>{teacher.employeeId}</td>
                    <td className="text-danger">
                      {teacher.firstName} {teacher.middleName || ""}{" "}
                      {teacher.lastName}
                    </td>
                    <td>{teacher.dob}</td>
                    <td>{teacher.gender}</td>
                    <td>
                      {teacher.addressLine1}, {teacher.addressLine2},{" "}
                      {teacher.city}
                    </td>
                    <td>{teacher.phoneNumber}</td>
                    <td>{teacher.status}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-info me-1"
                        onClick={() => handleEdit(teacher.employeeId)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(teacher.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">
                    No Teachers Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="d-flex justify-content-center mt-3">
          <button
            className="btn btn-outline-secondary me-2"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Prev
          </button>
          <span className="align-self-center">
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="btn btn-outline-secondary ms-2"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Teacher;
