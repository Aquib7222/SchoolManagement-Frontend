// import React, { useEffect, useState } from "react";
// import { AiOutlineBars } from "react-icons/ai";
// import { FaListUl, FaSchool, FaUserTie } from "react-icons/fa";
// import { MdViewInAr } from "react-icons/md";
// import { RiShieldUserFill } from "react-icons/ri";
// import axiosInstance from "../../api/axiosInstance";
// import axios from "axios";

// const Card = () => {
//   const token = localStorage.getItem("token");
//   const [superadmins, setSuperAdmins] = useState([]);
//   const [schools, setSchools] = useState([]);
//   const [modules, setModules] = useState([]);
//   const [mappings, setMappings] = useState([]);
//   const [totalStudents,setTotalStudents] = useState([]);

//   const fetchSuperAdmins = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/api/superadmin/all", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("res", res);
//       setSuperAdmins(res.data);
//     } catch (err) {
//       console.error("Failed to load super admins", err);
//     }
//   };
//   console.log("superadmin count", superadmins.length);

//   const fetchSchools = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/api/school/all", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setSchools(res.data);
//     } catch (err) {
//       console.error("Error fetching schools", err);
//     }
//   };
//   const loadModules = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/api/module/all");

//       const filteredModules = res.data.filter(
//         (module) => module.hasMenu === true,
//       );

//       setModules(filteredModules);
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const loadMappings = async () => {
//     try {
//       const res = await axios.get(
//         "http://localhost:8080/api/user-group-mapping/all",
//       );

//       setMappings(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const fetchStudentsCount = async () => {
//     try {
//       const res = await axios.get("http://localhost:8080/api/students/count", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log("student count", res);
//       setTotalStudents(res.data);
//     } catch (err) {
//       console.log("Failed to load Students", err);
//     }
//   };

//   useEffect(() => {
//     fetchSchools();
//     fetchSuperAdmins();
//     loadModules();
//     loadMappings();
//     fetchStudentsCount();
//   }, []);

//   const totalMenuMapping = mappings.reduce(
//     (total, item) => total + (item.menuMappings?.length || 0),
//     0,
//   );
//   const totalSubMenuMapping = mappings.reduce(
//     (total, item) => total + (item.subMenuMappings?.length || 0),
//     0,
//   );

//   return (
//     <>
//       <div className="container-fluid px-2 mt-3">
//         <div className="row g-3">
//           {/* Total Schools */}
//           <div className="col-12 col-sm-6 col-md-4 col-lg">
//             <div className="card h-100 shadow-sm">
//               <div className="card-body d-flex align-items-center">
//                 <div
//                   className="p-2 rounded-circle d-flex justify-content-center align-items-center me-2"
//                   style={{
//                     backgroundColor: "#f8d9fc",
//                     minWidth: "60px",
//                     height: "60px",
//                   }}
//                 >
//                   <FaSchool color="purple" size={32} />
//                 </div>

//                 <div className="flex-grow-1">
//                   <h6 className="mb-1">Total Schools</h6>
//                   <strong className="fs-4 d-block">{schools.length}</strong>

//                   <div className="d-flex gap-2 flex-wrap">
//                     <small>
//                       Active:{" "}
//                       {
//                         schools.filter((school) => school.status === "Active")
//                           .length
//                       }
//                     </small>
//                     <small>
//                       Inactive:{" "}
//                       {
//                         schools.filter((school) => school.status === "Inactive")
//                           .length
//                       }
//                     </small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Super Admins */}
//           <div className="col-12 col-sm-6 col-md-4 col-lg">
//             <div className="card h-100 shadow-sm">
//               <div className="card-body d-flex align-items-center">
//                 <div
//                   className="p-2 rounded-circle d-flex justify-content-center align-items-center me-2"
//                   style={{
//                     backgroundColor: "#d9e0fc",
//                     minWidth: "60px",
//                     height: "60px",
//                   }}
//                 >
//                   <RiShieldUserFill color="blue" size={32} />
//                 </div>

//                 <div className="flex-grow-1">
//                   <h6 className="mb-1">Super Admins</h6>
//                   <strong className="fs-4 d-block">{superadmins.length}</strong>

//                   <div className="d-flex gap-2 flex-wrap">
//                     <small>
//                       Active:{" "}
//                       {
//                         superadmins.filter(
//                           (superadmin) => superadmin.status === "Active",
//                         ).length
//                       }
//                     </small>
//                     <small>
//                       Inactive:{" "}
//                       {
//                         superadmins.filter(
//                           (superadmin) => superadmin.status === "Inactive",
//                         ).length
//                       }
//                     </small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Modules */}
//           <div className="col-12 col-sm-6 col-md-4 col-lg">
//             <div className="card h-100 shadow-sm">
//               <div className="card-body d-flex align-items-center">
//                 <div
//                   className="p-2 rounded-circle d-flex justify-content-center align-items-center me-2"
//                   style={{
//                     backgroundColor: "#d9fce5",
//                     minWidth: "60px",
//                     height: "60px",
//                   }}
//                 >
//                   <MdViewInAr color="green" size={32} />
//                 </div>

//                 <div className="flex-grow-1">
//                   <h6 className="mb-1">Total Modules</h6>
//                   <strong className="fs-4 d-block">{modules.length}</strong>

//                   <div className="d-flex gap-2 flex-wrap">
//                     <small>
//                       Active:{" "}
//                       {
//                         modules.filter((module) => module.status === "Active")
//                           .length
//                       }
//                     </small>
//                     <small>
//                       Inactive:{" "}
//                       {
//                         modules.filter((module) => module.status === "Inactive")
//                           .length
//                       }
//                     </small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Menus */}
//           <div className="col-12 col-sm-6 col-md-4 col-lg">
//             <div className="card h-100 shadow-sm">
//               <div className="card-body d-flex align-items-center">
//                 <div
//                   className="p-2 rounded-circle d-flex justify-content-center align-items-center me-2"
//                   style={{
//                     backgroundColor: "#fce9d9",
//                     minWidth: "60px",
//                     height: "60px",
//                   }}
//                 >
//                   {/* <AiOutlineBars color="orange" size={32} /> */}
//                   <FaListUl color="orange" size={32} />
//                 </div>

//                 <div className="flex-grow-1">
//                   <h6 className="mb-1">Total Menus</h6>
//                   <strong className="fs-4 d-block">{totalMenuMapping}</strong>

//                   <small>Total Submenus: {totalSubMenuMapping}</small>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Users */}
//           <div className="col-12 col-sm-6 col-md-4 col-lg">
//             <div className="card h-100 shadow-sm">
//               <div className="card-body d-flex align-items-center">
//                 <div
//                   className="p-2 rounded-circle d-flex justify-content-center align-items-center me-2"
//                   style={{
//                     backgroundColor: "#d9f9fc",
//                     minWidth: "60px",
//                     height: "60px",
//                   }}
//                 >
//                   <FaUserTie color="skyblue" size={32} />
//                 </div>

//                 <div className="flex-grow-1">
//                   <h6 className="mb-1">Total Users</h6>
//                   <strong className="fs-4 d-block">{superadmins.length + totalStudents}</strong>

//                   <div className="d-flex gap-2 flex-wrap">
//                     <small>Active: 8</small>
//                     <small>Inactive: 0</small>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Card;

import React from "react";
import { FaListUl, FaSchool, FaUserTie } from "react-icons/fa";
import { MdViewInAr } from "react-icons/md";
import { RiShieldUserFill } from "react-icons/ri";
import useDashboardData from "../../hooks/UserDashBoardData";



const Card = () => {
  const { schools, superadmins, modules, mappings, totalStudents, loading } =
    useDashboardData();

  const totalMenuMapping = mappings.reduce(
    (total, item) => total + (item.menuMappings?.length || 0),
    0,
  );

  const totalSubMenuMapping = mappings.reduce(
    (total, item) => total + (item.subMenuMappings?.length || 0),
    0,
  );

  const activeSchools = schools.filter(
    (school) => school.status === "Active",
  ).length;

  const inactiveSchools = schools.filter(
    (school) => school.status === "Inactive",
  ).length;

  const activeSuperadmins = superadmins.filter(
    (admin) => admin.status === "Active",
  ).length;

  const inactiveSuperadmins = superadmins.filter(
    (admin) => admin.status === "Inactive",
  ).length;

  const activeModules = modules.filter(
    (module) => module.status === "Active",
  ).length;

  const inactiveModules = modules.filter(
    (module) => module.status === "Inactive",
  ).length;

  if (loading) {
    return <div className="p-3">Loading...</div>;
  }

  return (
    <div className="container-fluid px-2 mt-3">
      <div className="row g-3">
        {/* Schools */}
        <div className="col-12 col-sm-6 col-md-4 col-lg">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <div
                className="p-2 rounded-circle d-flex justify-content-center align-items-center me-2"
                style={{
                  backgroundColor: "#f8d9fc",
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                <FaSchool color="purple" size={32} />
              </div>

              <div className="flex-grow-1">
                <h6 className="mb-1">Total Schools</h6>

                <strong className="fs-4 d-block">{schools.length}</strong>

                <div className="d-flex gap-2 flex-wrap">
                  <small>Active: {activeSchools}</small>
                  <small>Inactive: {inactiveSchools}</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Super Admins */}
        <div className="col-12 col-sm-6 col-md-4 col-lg">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <div
                className="p-2 rounded-circle d-flex justify-content-center align-items-center me-2"
                style={{
                  backgroundColor: "#d9e0fc",
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                <RiShieldUserFill color="blue" size={32} />
              </div>

              <div className="flex-grow-1">
                <h6 className="mb-1">Super Admins</h6>

                <strong className="fs-4 d-block">{superadmins.length}</strong>

                <div className="d-flex gap-2 flex-wrap">
                  <small>Active: {activeSuperadmins}</small>

                  <small>Inactive: {inactiveSuperadmins}</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modules */}
        <div className="col-12 col-sm-6 col-md-4 col-lg">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <div
                className="p-2 rounded-circle d-flex justify-content-center align-items-center me-2"
                style={{
                  backgroundColor: "#d9fce5",
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                <MdViewInAr color="green" size={32} />
              </div>

              <div className="flex-grow-1">
                <h6 className="mb-1">Total Modules</h6>

                <strong className="fs-4 d-block">{modules.length}</strong>

                <div className="d-flex gap-2 flex-wrap">
                  <small>Active: {activeModules}</small>

                  <small>Inactive: {inactiveModules}</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Menus */}
        <div className="col-12 col-sm-6 col-md-4 col-lg">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <div
                className="p-2 rounded-circle d-flex justify-content-center align-items-center me-2"
                style={{
                  backgroundColor: "#fce9d9",
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                <FaListUl color="orange" size={32} />
              </div>

              <div className="flex-grow-1">
                <h6 className="mb-1">Total Menus</h6>

                <strong className="fs-4 d-block">{totalMenuMapping}</strong>

                <small>Total Submenus: {totalSubMenuMapping}</small>
              </div>
            </div>
          </div>
        </div>

        {/* Users */}
        <div className="col-12 col-sm-6 col-md-4 col-lg">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex align-items-center">
              <div
                className="p-2 rounded-circle d-flex justify-content-center align-items-center me-2"
                style={{
                  backgroundColor: "#d9f9fc",
                  minWidth: "60px",
                  height: "60px",
                }}
              >
                <FaUserTie color="skyblue" size={32} />
              </div>

              <div className="flex-grow-1">
                <h6 className="mb-1">Total Users</h6>

                <strong className="fs-4 d-block">
                  {superadmins.length + totalStudents}
                </strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
