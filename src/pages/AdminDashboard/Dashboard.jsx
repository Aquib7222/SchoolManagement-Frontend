import React, { useEffect, useState } from "react";
import axios from "axios";
import SchoolAddForm from "./SchoolAddForm";
import SuperAdminCreation from "./SuperAdminCreation";
import { FaBuilding, FaUsers, FaUserFriends } from "react-icons/fa";
import { HiOutlineArrowDownTray } from "react-icons/hi2";
import schoolIcon from "../../assets/icon/schoolIcon.png";
import userIcon from "../../assets/icon/profile.png";
import { Outlet, useNavigate } from "react-router-dom";
import Greetings from "../../components/SuperDashboard/Greetings";
import Card from "../../components/AdminDashboard/Card";
import SchoolGrowthAndModuleOverview from "../../components/AdminDashboard/SchoolGrowthAndModuleOverview";
import QuickActions from "../../components/AdminDashboard/QuickActions";
import RecentSchoolActivitySummary from "../../components/AdminDashboard/RecentSchoolActivitySummary";

const Dashboard = () => {
  const [schools, setSchools] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [superadmins, setSuperAdmins] = useState([]);
  const [totalStudents, setTotalStudents] = useState([]);
  const [activeStudentCount, setActiveStudentCount] = useState({});

  console.log("schools", schools);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const Admin = JSON.parse(localStorage.getItem("user"));
  console.log("admin", Admin);

  // 🔹 Load schools & super admins
  useEffect(() => {
    fetchSchools();
    fetchSuperAdmins();
    fetchStudentsCount();
    fetchActiveStudentsBySchool();
  }, []);

  // Fetch students
  const fetchStudentsCount = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/students/count", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("student count", res);
      setTotalStudents(res.data);
    } catch (err) {
      console.log("Failed to load Students", err);
    }
  };
  console.log("Total Students count", totalStudents);

  const fetchActiveStudentsBySchool = async (schoolId) => {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/students/count/active?schoolId=${schoolId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setActiveStudentCount((prev) => ({
        ...prev,
        [schoolId]: res.data,
      }));
    } catch (err) {
      console.error("Failed to load active students", err);
    }
  };

  // 🔹 Fetch super admins
  const fetchSuperAdmins = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/superadmin/all", {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log("res", res);
      setSuperAdmins(res.data);
    } catch (err) {
      console.error("Failed to load super admins", err);
    }
  };
  console.log("super count", superadmins.length);
  console.log("schools", schools);

  const fetchSchools = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/school/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSchools(res.data);

      // 🔥 fetch active students per school
      res.data.forEach((school) => {
        fetchActiveStudentsBySchool(school.id);
      });
    } catch (err) {
      console.error("Error fetching schools", err);
    }
  };

  // inside the Dashboard component, after fetching superadmins
  const getSuperAdminNames = (schoolId) => {
    // filter superadmins who belong to this school
    const admins = superadmins.filter((admin) => admin.school?.id === schoolId);
    // return names joined by comma
    return (
      admins.map((a) => a.fullName).join(", ") || "Super Admin not Created Yet"
    ); // show — if no superadmin
  };

  console.log("school Id", schools);

  // Delete school
  const deleteSchool = async (id) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await axios.delete(`http://localhost:8080/api/school/delete/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSchools(schools.filter((s) => s.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  // Toggle Active / Inactive
  const toggleStatus = async (id) => {
    try {
      const res = await axios.put(
        `http://localhost:8080/api/school/toggle/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setSchools((prev) => prev.map((s) => (s.id === id ? res.data : s)));
    } catch (err) {
      console.error("Toggle failed", err);
    }
  };

  const handleView = (id) => {
    navigate(`/schools/${id}`);
  };

  return (
    <>
      <Greetings />
      <Card />
      <SchoolGrowthAndModuleOverview/>
      <RecentSchoolActivitySummary/>
       <QuickActions/>
      
      <Outlet />
    </>
  );
};

export default Dashboard;


// <div className="container">
//         <div className="p-3 bg-white shadow rounded mt-3 table-responsive">
//           <table className="table table-bordered table-hover align-middle ">
//             <thead className="table-secondary">
//               <tr>
//                 <th>S.No</th>
//                 <th>School Name</th>
//                 <th>Super Admin</th>
               
//                 <th>Total Users</th>
//                 <th>Status</th>
//                 <th>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {schools.length > 0 ? (
//                 schools.map((school) => (
//                   <tr key={school.id}>
//                     <td>{school.id}</td>
//                     <td style={{ fontWeight: "600" }}>
//                       <img
//                         src={schoolIcon}
//                         style={{
//                           height: "30px",
//                           width: "35px",
//                           marginRight: "5px",
//                         }}
//                         alt=""
//                       />
//                       {school.schoolName}
//                     </td>
//                     <td>
//                       <img
//                         src={userIcon}
//                         style={{
//                           height: "30px",
//                           width: "35px",
//                           marginRight: "5px",
//                         }}
//                         alt=""
//                       />
//                       {getSuperAdminNames(school.id)}
//                     </td>
//                     <td>{activeStudentCount[school.id] ?? "—"}</td>
//                     {/* <td></td> */}
//                     <td>
//                       <div className="form-check form-switch">
//                         <input
//                           className="form-check-input"
//                           type="checkbox"
//                           checked={school.status === "Active"}
//                           onChange={() => toggleStatus(school.id)}
//                         />
//                         <label className="form-check-label">
//                           {school.status}
//                         </label>
//                       </div>
//                     </td>
//                     <td className="d-flex justify-content-between">
//                       <button
//                         className="btn btn-primary btn-sm"
//                         onClick={() => handleView(school.id)}
//                       >
//                         View
//                       </button>{" "}
//                       <button className="btn btn-outline-secondary btn-sm">
//                         Edit
//                       </button>
//                       <button
//                         className="btn btn-danger btn-sm"
//                         onClick={() => deleteSchool(school.id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="8" className="text-center">
//                     No Schools Found
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>
//         </div>

       
//       </div>