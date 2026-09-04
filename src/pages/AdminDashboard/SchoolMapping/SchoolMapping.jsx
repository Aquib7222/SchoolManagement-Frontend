// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import PermissionTables from "./PermissionTables";

// import {
//   handleModuleChange,
//   handleMenuChange,
//   handleSubMenuChange,
//   createPermissionPayload,
//   loadExistingPermissions,
// } from "./permissionUtils";
// import axiosInstance from "../../../api/axiosInstance";
// import { FaArrowLeft } from "react-icons/fa";
// import { TiArrowSync } from "react-icons/ti";
// import { LuCodesandbox } from "react-icons/lu";

// const SchoolMapping = () => {
//   const token = localStorage.getItem("token");
//   const [schools, setSchools] = useState([]);
//   const [userGroups, setUserGroups] = useState([]);

//   const [selectedSchool, setSelectedSchool] = useState(null);
//   const [selectedGroup, setSelectedGroup] = useState(null);

//   const [modules, setModules] = useState([]); 

  
//   const [selectedModuleId, setSelectedModuleId] = useState(null);
//   const [checkedModules, setCheckedModules] = useState({});
//   const [checkedMenus, setCheckedMenus] = useState({});
//   const [checkedSubMenus, setCheckedSubMenus] = useState({});
//   const [isLoaded, setIsLoaded] = useState(false);
 
//   useEffect(() => {
//     fetchModules();
//     fetchUserGroups();
//     fetchSchools();
//   }, []);

  

//   const filteredModules = modules.filter(
//     (item) => item.userGroup?.id === Number(selectedGroup),
//   );
//   const moduleOptions = [
//     ...new Map(
//       filteredModules.map((item) => [item.module.id, item.module]),
//     ).values(),
//   ];

 

//   const selectedModuleData = filteredModules.find(
//     (item) => item.module.id === Number(selectedModuleId),
//   );

 
 
//   const onModuleChange = (moduleData, checked) => {
//     handleModuleChange(
//       moduleData,
//       checked,
//       checkedModules,
//       checkedMenus,
//       checkedSubMenus,
//       setCheckedModules,
//       setCheckedMenus,
//       setCheckedSubMenus,
//     );
//   };

//   const onMenuChange = (moduleData, menu, checked) => {
//     handleMenuChange(
//       moduleData,
//       menu,
//       checked,
//       checkedModules,
//       checkedMenus,
//       checkedSubMenus,
//       setCheckedModules,
//       setCheckedMenus,
//       setCheckedSubMenus,
//     );
//   };

//   const onSubMenuChange = (moduleData, menu, subMenu, checked) => {
//     handleSubMenuChange(
//       moduleData,
//       menu,
//       subMenu,
//       checked,
//       checkedModules,
//       checkedMenus,
//       checkedSubMenus,
//       setCheckedModules,
//       setCheckedMenus,
//       setCheckedSubMenus,
//     );
//   };

  
//   const fetchSchools = async () => {
//     try {
//       const res = await axiosInstance.get("/api/school/all", {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       setSchools(res.data);
//     } catch (err) {
//       console.error("Error fetching schools", err);
//     }
//   };

 
//   const fetchModules = async () => {
//     try {
//       const res = await axiosInstance.get("/api/user-group-mapping/all");

      
//       setModules(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const fetchUserGroups = async () => {
//     try {
//       const res = await axiosInstance.get("/api/user-group/all");

//       setUserGroups(res.data);
//     } catch (err) {
//       console.log(err);
//     }
//   };

//   const handleLoadModules = async () => {
//     if (!selectedSchool) {
//       alert("Please select School");
//       return;
//     }

//     if (!selectedGroup) {
//       alert("Please select User Group");
//       return;
//     }

//     try {
//       // Pehle existing permissions load karo
//       const res = await axiosInstance.get("/api/school-mapping/load", {
//         params: {
//           schoolId: selectedSchool,
//           groupId: selectedGroup,
//         },
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       loadExistingPermissions(
//         res.data,
//         setCheckedModules,
//         setCheckedMenus,
//         setCheckedSubMenus,
//       );

//       // Ab permission section show hoga
//       setIsLoaded(true);
//     } catch (error) {
//       console.error("LOAD MAPPING ERROR =", error);

//       // Agar mapping nahi mili to blank permissions
//       setCheckedModules({});
//       setCheckedMenus({});
//       setCheckedSubMenus({});

//       setIsLoaded(true);
//     }
//   };

//   const handleSelectAll = (checked) => {
//     const newCheckedModules = {};
//     const newCheckedMenus = {};
//     const newCheckedSubMenus = {};

//     filteredModules.forEach((moduleData) => {
//       newCheckedModules[moduleData.module.id] = checked;

//       (moduleData.menuMappings || []).forEach((menuMap) => {
//         newCheckedMenus[menuMap.menu.id] = checked;

//         (menuMap.menu.subMenus || []).forEach((sub) => {
//           newCheckedSubMenus[sub.id] = checked;
//         });
//       });
//     });

//     setCheckedModules(newCheckedModules);
//     setCheckedMenus(newCheckedMenus);
//     setCheckedSubMenus(newCheckedSubMenus);
//   };

//   const handleSave = async () => {
//     try {
//       const payload = createPermissionPayload(
//         Number(selectedSchool),
//         Number(selectedGroup),
//         checkedModules,
//         checkedMenus,
//         checkedSubMenus,
//       );

//       console.log("Selected School =", selectedSchool);
//       console.log("Selected Group =", selectedGroup);
//       console.log("Payload =", JSON.stringify(payload, null, 2));

//       const response = await axiosInstance.post(
//         "/api/school-mapping/save",
//         payload,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         },
//       );

//       console.log("Save Response =", response.data);

//       alert("School Mapping Saved Successfully");
//     } catch (err) {
//       console.error("SAVE ERROR =", err);
//       console.error("STATUS =", err.response?.status);
//       console.error("DATA =", err.response?.data);

//       alert(
//         err.response?.data ||
//           err.response?.data?.message ||
//           "Unable to save mapping",
//       );
//     }
//   };

//   const handleReset = () => {
//     setSelectedSchool(null);
//     setSelectedGroup(null);

//     setIsLoaded(false);

//     setCheckedModules({});
//     setCheckedMenus({});
//     setCheckedSubMenus({});
//   };

//   return (
//     <>
//       {/* Header */}
//       <div className="container-fluid px-2">
//         <div
//           className="bg-white shadow rounded-2 p-3 mt-2 mb-3"
//           style={{ minHeight: "70px" }}
//         >
//           <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
//             <div>
//               <h4 className="fw-bold mb-1">School Mapping</h4>

//               <nav aria-label="breadcrumb">
//                 <ol className="breadcrumb mb-0 small">
//                   <li className="breadcrumb-item">
//                     <a href="/" className="text-decoration-none text-dark">
//                       Dashboard
//                     </a>
//                   </li>

//                   <li className="breadcrumb-item">Module Management</li>

//                   <li className="breadcrumb-item active text-primary">
//                     School Mapping
//                   </li>
//                 </ol>
//               </nav>
//             </div>

//             <button
//               type="button"
//               className="btn btn-outline-primary"
//               onClick={() => window.history.back()}
//             >
//               <FaArrowLeft className="me-2" />
//               Back to Module Creation
//             </button>
//           </div>
//         </div>
//       </div>
//       <div className="container-fluid mt-3 px-2">
//         <div className="card shadow">
//           <div className="card-header bg-white">School Mapping</div>
//           <div className="card-body">
//             <div className="row ">
//               <div className="col-md-3">
//                 <label htmlFor="" className="form-label">
//                   <h6>
//                     School<span className="text-danger">*</span>
//                   </h6>
//                 </label>
//                 <select
//                   value={selectedSchool || ""}
//                   onChange={(e) => {
//                     setSelectedSchool(e.target.value);
//                     setSelectedGroup(null);
//                     setIsLoaded(false);

//                     setCheckedModules({});
//                     setCheckedMenus({});
//                     setCheckedSubMenus({});
//                   }}
//                   className="form-select"
//                 >
//                   <option value="">Select School</option>

//                   {schools.map((s) => (
//                     <option key={s.id} value={s.id}>
//                       {s.schoolName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="col-md-3">
//                 <label htmlFor="" className="form-label">
//                   <h6>
//                     Usergroup<span className="text-danger">*</span>
//                   </h6>
//                 </label>
//                 <select
//                   value={selectedGroup || ""}
//                   disabled={!selectedSchool}
//                   onChange={(e) => {
//                     setSelectedGroup(e.target.value);
//                     setIsLoaded(false);

//                     setCheckedModules({});
//                     setCheckedMenus({});
//                     setCheckedSubMenus({});
//                   }}
//                   className="form-select"
//                 >
//                   <option value="">Select User Group</option>

//                   {userGroups.map((g) => (
//                     <option key={g.id} value={g.id}>
//                       {g.groupName}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//               <div className="col-md-2">
//                 <button
//                   type="button"
//                   className="btn btn-outline-secondary w-100"
//                   style={{ marginTop: "36px" }}
//                   onClick={handleReset}
//                 >
//                   <TiArrowSync size={20} className="me-2" />
//                   Reset
//                 </button>
//               </div>

//               <div className="col-md-2">
//                 <button
//                   type="button"
//                   className="btn btn-primary w-100"
//                   style={{ marginTop: "36px" }}
//                   onClick={handleLoadModules}
//                   disabled={!selectedSchool || !selectedGroup}
//                 >
//                   <LuCodesandbox size={20} className="me-2" />
//                   Load Modules
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {isLoaded && (
//           <div className="card border mt-3 shadow rounded-3 overflow-hidden">
//             {filteredModules.length > 0 && (
//               <div className="form-check mb-3 mt-3 ms-2">
//                 <input
//                   type="checkbox"
//                   className="form-check-input"
//                   checked={
//                     filteredModules.length > 0 &&
//                     filteredModules.every((m) => checkedModules[m.module.id])
//                   }
//                   onChange={(e) => handleSelectAll(e.target.checked)}
//                 />

//                 <label className="form-check-label fw-bold">
//                   Select All Permissions
//                 </label>
//               </div>
//             )}

//             <div className="card-header bg-white border-0 p-3">
//               <div className="d-flex align-items-center justify-content-between">
//                 <div>
//                   <h5 className="fw-bold mb-1">Module & Menu Permissions</h5>

//                   <p className="text-muted mb-0 small">
//                     Manage module, menu and submenu permissions
//                   </p>
//                 </div>

//                 <span className="badge bg-primary px-3 py-2">
//                   {filteredModules.length} Modules
//                 </span>
//               </div>
//             </div>

//             <div className="card-body p-0">
//               <div className="table-responsive">
//                 <table className="table table-hover table-bordered align-middle mb-0">
//                   <thead>
//                     <tr
//                       style={{
//                         background:
//                           "linear-gradient(135deg, rgb(61,87,236) 0%, rgb(97,150,248) 50%, #87ddf7 100%)",
//                         color: "white",
//                       }}
//                     >
//                       <th className="text-center" style={{ width: "8%" }}>
//                         S.No
//                       </th>

//                       <th style={{ width: "25%" }}>Module</th>

//                       <th style={{ width: "30%" }}>Menu</th>

//                       <th style={{ width: "37%" }}>Sub Menu</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {filteredModules.length > 0 ? (
//                       filteredModules.map((moduleData, index) => (
//                         <PermissionTables
//                           key={moduleData.id}
//                           index={index}
//                           moduleData={moduleData}
//                           checkedModules={checkedModules}
//                           checkedMenus={checkedMenus}
//                           checkedSubMenus={checkedSubMenus}
//                           onModuleChange={onModuleChange}
//                           onMenuChange={onMenuChange}
//                           onSubMenuChange={onSubMenuChange}
//                         />
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="4" className="text-center py-4">
//                           No modules found for this user group.
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         )}
//         {isLoaded && selectedSchool && selectedGroup && (
//           <div className="text-end mt-3 mb-3">
//             <button className="btn btn-primary px-4 " onClick={handleSave}>
//               Save Mapping
//             </button>
//           </div>
//         )}
       
//       </div>
//     </>
//   );
// };

// export default SchoolMapping;


import axios from "axios";
import React, { useEffect, useState } from "react";
import PermissionTables from "./PermissionTables";

import {
  handleModuleChange,
  handleMenuChange,
  handleSubMenuChange,
  createPermissionPayload,
  loadExistingPermissions,
} from "./permissionUtils";

import axiosInstance from "../../../api/axiosInstance";

import { FaArrowLeft } from "react-icons/fa";
import { TiArrowSync } from "react-icons/ti";
import {
  LuCodesandbox,
  LuSchool,
  LuUsers,
  LuShieldCheck,
  LuSave,
} from "react-icons/lu";

const SchoolMapping = () => {
  const token = localStorage.getItem("token");

  const [schools, setSchools] = useState([]);
  const [userGroups, setUserGroups] = useState([]);

  const [selectedSchool, setSelectedSchool] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);

  const [modules, setModules] = useState([]);

  const [selectedModuleId, setSelectedModuleId] = useState(null);
  const [checkedModules, setCheckedModules] = useState({});
  const [checkedMenus, setCheckedMenus] = useState({});
  const [checkedSubMenus, setCheckedSubMenus] = useState({});
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    fetchModules();
    fetchUserGroups();
    fetchSchools();
  }, []);

  const filteredModules = modules.filter(
    (item) => item.userGroup?.id === Number(selectedGroup)
  );

  const moduleOptions = [
    ...new Map(
      filteredModules.map((item) => [item.module.id, item.module])
    ).values(),
  ];

  const selectedModuleData = filteredModules.find(
    (item) => item.module.id === Number(selectedModuleId)
  );

  const onModuleChange = (moduleData, checked) => {
    handleModuleChange(
      moduleData,
      checked,
      checkedModules,
      checkedMenus,
      checkedSubMenus,
      setCheckedModules,
      setCheckedMenus,
      setCheckedSubMenus
    );
  };

  const onMenuChange = (moduleData, menu, checked) => {
    handleMenuChange(
      moduleData,
      menu,
      checked,
      checkedModules,
      checkedMenus,
      checkedSubMenus,
      setCheckedModules,
      setCheckedMenus,
      setCheckedSubMenus
    );
  };

  const onSubMenuChange = (moduleData, menu, subMenu, checked) => {
    handleSubMenuChange(
      moduleData,
      menu,
      subMenu,
      checked,
      checkedModules,
      checkedMenus,
      checkedSubMenus,
      setCheckedModules,
      setCheckedMenus,
      setCheckedSubMenus
    );
  };

  const fetchSchools = async () => {
    try {
      const res = await axiosInstance.get("/api/school/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setSchools(res.data);
    } catch (err) {
      console.error("Error fetching schools", err);
    }
  };

  const fetchModules = async () => {
    try {
      const res = await axiosInstance.get("/api/user-group-mapping/all");

      setModules(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchUserGroups = async () => {
    try {
      const res = await axiosInstance.get("/api/user-group/all");

      setUserGroups(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleLoadModules = async () => {
    if (!selectedSchool) {
      alert("Please select School");
      return;
    }

    if (!selectedGroup) {
      alert("Please select User Group");
      return;
    }

    try {
      const res = await axiosInstance.get("/api/school-mapping/load", {
        params: {
          schoolId: selectedSchool,
          groupId: selectedGroup,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      loadExistingPermissions(
        res.data,
        setCheckedModules,
        setCheckedMenus,
        setCheckedSubMenus
      );

      setIsLoaded(true);
    } catch (error) {
      console.error("LOAD MAPPING ERROR =", error);

      setCheckedModules({});
      setCheckedMenus({});
      setCheckedSubMenus({});

      setIsLoaded(true);
    }
  };

  const handleSelectAll = (checked) => {
    const newCheckedModules = {};
    const newCheckedMenus = {};
    const newCheckedSubMenus = {};

    filteredModules.forEach((moduleData) => {
      newCheckedModules[moduleData.module.id] = checked;

      (moduleData.menuMappings || []).forEach((menuMap) => {
        newCheckedMenus[menuMap.menu.id] = checked;

        (menuMap.menu.subMenus || []).forEach((sub) => {
          newCheckedSubMenus[sub.id] = checked;
        });
      });
    });

    setCheckedModules(newCheckedModules);
    setCheckedMenus(newCheckedMenus);
    setCheckedSubMenus(newCheckedSubMenus);
  };

  const handleSave = async () => {
    try {
      const payload = createPermissionPayload(
        Number(selectedSchool),
        Number(selectedGroup),
        checkedModules,
        checkedMenus,
        checkedSubMenus
      );

      console.log("Selected School =", selectedSchool);
      console.log("Selected Group =", selectedGroup);
      console.log("Payload =", JSON.stringify(payload, null, 2));

      const response = await axiosInstance.post(
        "/api/school-mapping/save",
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Save Response =", response.data);

      alert("School Mapping Saved Successfully");
    } catch (err) {
      console.error("SAVE ERROR =", err);
      console.error("STATUS =", err.response?.status);
      console.error("DATA =", err.response?.data);

      alert(
        err.response?.data ||
          err.response?.data?.message ||
          "Unable to save mapping"
      );
    }
  };

  const handleReset = () => {
    setSelectedSchool(null);
    setSelectedGroup(null);

    setIsLoaded(false);

    setCheckedModules({});
    setCheckedMenus({});
    setCheckedSubMenus({});
  };

  return (
    <>
      <style>
        {`
          .school-map-header {
            background: linear-gradient(
              135deg,
              #ffffff 0%,
              #f5f9ff 60%,
              #eaf3ff 100%
            );
            border: 1px solid #dbeafe;
          }

          .school-map-title-icon {
            width: 52px;
            height: 52px;
            min-width: 52px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 14px;
            background: linear-gradient(
              135deg,
              #2563eb,
              #3b82f6
            );
            color: #ffffff;
            box-shadow: 0 8px 20px rgba(37, 99, 235, 0.22);
          }

          .school-map-section-icon {
            width: 42px;
            height: 42px;
            min-width: 42px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            border-radius: 12px;
            background: linear-gradient(
              135deg,
              #2563eb,
              #3b82f6
            );
            color: #ffffff;
            box-shadow: 0 7px 17px rgba(37, 99, 235, 0.18);
          }

          .school-map-card {
            border: 0 !important;
            border-radius: 16px !important;
            box-shadow: 0 6px 22px rgba(15, 23, 42, 0.07) !important;
          }

          .school-map-breadcrumb {
            background: rgba(239, 246, 255, 0.75);
            border-top: 1px solid #e0ecff;
          }

          .school-map-control {
            min-height: 43px;
            border-radius: 12px !important;
            border: 1px solid #dbeafe !important;
            transition: all 0.2s ease;
          }

          .school-map-control:focus {
            border-color: #93c5fd !important;
            box-shadow: 0 0 0 0.2rem rgba(37, 99, 235, 0.1) !important;
          }

          .school-map-control:disabled {
            background-color: #f8fafc !important;
            cursor: not-allowed;
          }

          .school-map-label {
            color: #334155;
            font-size: 13px;
            font-weight: 600;
            margin-bottom: 7px;
          }

          .school-map-select-box {
            background: #ffffff;
            border: 1px solid #e2e8f0;
            border-radius: 14px;
            padding: 15px;
            height: 100%;
          }

          .school-map-info {
            background: #eff6ff;
            border: 1px solid #bfdbfe;
            color: #1e40af;
            border-radius: 12px;
          }

          .school-map-count {
            background: #eff6ff !important;
            color: #2563eb !important;
            border: 1px solid #bfdbfe;
            border-radius: 9px;
            font-weight: 600;
          }

          .school-map-select-all {
            background: #f8fbff;
            border: 1px solid #dbeafe;
            border-radius: 12px;
            padding: 12px 15px;
          }

          .school-map-table-wrapper {
            border: 1px solid #dbeafe;
            border-radius: 14px;
            overflow: hidden;
          }

          .school-map-table {
            margin-bottom: 0 !important;
          }

          .school-map-table thead th {
            background: #eff6ff !important;
            color: #1e3a8a !important;
            border-bottom: 1px solid #dbeafe !important;
            font-size: 12px;
            font-weight: 700;
            padding: 13px 12px;
            white-space: nowrap;
          }

          .school-map-table tbody td {
            border-color: #edf2f7 !important;
            padding: 12px;
          }

          .school-map-table tbody tr:hover {
            background: #f8fbff;
          }

          .school-map-empty {
            padding: 45px 20px !important;
            color: #64748b;
          }

          .school-map-empty-icon {
            width: 58px;
            height: 58px;
            margin: 0 auto 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 16px;
            background: #eff6ff;
            color: #2563eb;
          }

          .school-map-btn {
            min-height: 43px;
            border-radius: 11px !important;
            font-weight: 600;
          }

          .school-map-btn-primary {
            box-shadow: 0 6px 14px rgba(37, 99, 235, 0.16);
          }

          .school-map-save-area {
            background: #f8fbff;
            border: 1px solid #dbeafe;
            border-radius: 14px;
            padding: 14px;
          }

          .school-map-required {
            color: #dc2626;
          }

          @media (max-width: 768px) {
            .school-map-title-row {
              flex-direction: column;
              align-items: flex-start !important;
            }

            .school-map-back-btn {
              width: 100%;
            }

            .school-map-back-btn button {
              width: 100%;
            }
          }

          @media (max-width: 576px) {
            .school-map-table {
              min-width: 850px;
            }

            .school-map-title-icon {
              width: 46px;
              height: 46px;
              min-width: 46px;
            }
          }
        `}
      </style>

      {/* =========================
          PAGE HEADER
      ========================= */}
      <div className="mx-2 mt-2 mb-3">
        <div className="rounded-4 shadow overflow-hidden school-map-header">
          <div className="p-3 p-md-4">
            <div className="d-flex justify-content-between align-items-center gap-3 school-map-title-row">

              <div className="d-flex align-items-center gap-3">
                <div className="school-map-title-icon">
                  <LuShieldCheck size={27} />
                </div>

                <div>
                  <h5 className="fw-bold mb-1">
                    School Mapping
                  </h5>

                  <div className="text-muted small">
                    Assign modules, menus and permissions to school user groups.
                  </div>
                </div>
              </div>

              <div className="school-map-back-btn">
                <button
                  type="button"
                  className="btn btn-outline-primary school-map-btn px-3"
                  onClick={() => window.history.back()}
                >
                  <FaArrowLeft className="me-2" />
                  Back to Module Creation
                </button>
              </div>
            </div>
          </div>

          <div className="px-4 py-2 school-map-breadcrumb">
            <nav aria-label="breadcrumb">
              <ol className="breadcrumb mb-0 small">
                <li className="breadcrumb-item">
                  <a
                    href="/"
                    className="text-decoration-none text-muted"
                  >
                    Dashboard
                  </a>
                </li>

                <li className="breadcrumb-item text-muted">
                  Module Management
                </li>

                <li className="breadcrumb-item active text-primary fw-semibold">
                  School Mapping
                </li>
              </ol>
            </nav>
          </div>
        </div>
      </div>

      <div className="container-fluid px-2">

        {/* =========================
            SCHOOL / USER GROUP CARD
        ========================= */}
        <div className="card school-map-card mb-3">
          <div className="card-body p-3 p-md-4">

            <div className="d-flex align-items-center gap-3 mb-4">
              <div className="school-map-section-icon">
                <LuSchool size={22} />
              </div>

              <div>
                <h6 className="fw-bold mb-1">
                  Mapping Configuration
                </h6>

                <p className="text-muted small mb-0">
                  Select a school and user group to manage permissions.
                </p>
              </div>
            </div>

            <div className="row g-3">

              {/* SCHOOL */}
              <div className="col-lg-4 col-md-6">
                <div className="school-map-select-box">

                  <label className="school-map-label">
                    School <span className="school-map-required">*</span>
                  </label>

                  <select
                    value={selectedSchool || ""}
                    onChange={(e) => {
                      setSelectedSchool(e.target.value);
                      setSelectedGroup(null);
                      setIsLoaded(false);

                      setCheckedModules({});
                      setCheckedMenus({});
                      setCheckedSubMenus({});
                    }}
                    className="form-select school-map-control"
                  >
                    <option value="">
                      Select School
                    </option>

                    {schools.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.schoolName}
                      </option>
                    ))}
                  </select>

                </div>
              </div>

              {/* USER GROUP */}
              <div className="col-lg-4 col-md-6">
                <div className="school-map-select-box">

                  <label className="school-map-label">
                    User Group <span className="school-map-required">*</span>
                  </label>

                  <select
                    value={selectedGroup || ""}
                    disabled={!selectedSchool}
                    onChange={(e) => {
                      setSelectedGroup(e.target.value);
                      setIsLoaded(false);

                      setCheckedModules({});
                      setCheckedMenus({});
                      setCheckedSubMenus({});
                    }}
                    className="form-select school-map-control"
                  >
                    <option value="">
                      Select User Group
                    </option>

                    {userGroups.map((g) => (
                      <option key={g.id} value={g.id}>
                        {g.groupName}
                      </option>
                    ))}
                  </select>

                  {!selectedSchool && (
                    <div className="small text-muted mt-2">
                      Please select a school first.
                    </div>
                  )}

                </div>
              </div>

              {/* ACTIONS */}
              <div className="col-lg-2 col-md-6">
                <div className="d-flex flex-column justify-content-end h-100">

                  <label className="school-map-label invisible d-none d-lg-block">
                    Action
                  </label>

                  <button
                    type="button"
                    className="btn btn-outline-secondary school-map-btn w-100"
                    onClick={handleReset}
                  >
                    <TiArrowSync size={20} className="me-2" />
                    Reset
                  </button>

                </div>
              </div>

              <div className="col-lg-2 col-md-6">
                <div className="d-flex flex-column justify-content-end h-100">

                  <label className="school-map-label invisible d-none d-lg-block">
                    Action
                  </label>

                  <button
                    type="button"
                    className="btn btn-primary school-map-btn school-map-btn-primary w-100"
                    onClick={handleLoadModules}
                    disabled={!selectedSchool || !selectedGroup}
                  >
                    <LuCodesandbox size={20} className="me-2" />
                    Load Modules
                  </button>

                </div>
              </div>

            </div>

            {/* SELECTED INFO */}
            {selectedSchool && selectedGroup && (
              <div className="school-map-info mt-3 p-3">
                <div className="d-flex align-items-center gap-2">
                  <LuUsers size={18} />

                  <span className="small">
                    Permissions will be managed for the selected
                    <strong className="mx-1">
                      User Group
                    </strong>
                    in the selected
                    <strong className="mx-1">
                      School
                    </strong>.
                  </span>
                </div>
              </div>
            )}

          </div>
        </div>

        {/* =========================
            PERMISSIONS
        ========================= */}
        {isLoaded && (
          <div className="card school-map-card mb-3 overflow-hidden">

            <div className="card-body p-3 p-md-4">

              {/* TOP HEADER */}
              <div className="d-flex justify-content-between align-items-center gap-3 mb-4">

                <div className="d-flex align-items-center gap-3">

                  <div className="school-map-section-icon">
                    <LuShieldCheck size={22} />
                  </div>

                  <div>
                    <h5 className="fw-bold mb-1">
                      Module & Menu Permissions
                    </h5>

                    <p className="text-muted small mb-0">
                      Manage module, menu and submenu permissions
                    </p>
                  </div>

                </div>

                <span className="badge school-map-count px-3 py-2">
                  {filteredModules.length} Modules
                </span>

              </div>

              {/* SELECT ALL */}
              {filteredModules.length > 0 && (
                <div className="school-map-select-all mb-3">

                  <div className="form-check m-0">

                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="selectAllPermissions"
                      checked={
                        filteredModules.length > 0 &&
                        filteredModules.every(
                          (m) => checkedModules[m.module.id]
                        )
                      }
                      onChange={(e) =>
                        handleSelectAll(e.target.checked)
                      }
                    />

                    <label
                      htmlFor="selectAllPermissions"
                      className="form-check-label fw-semibold"
                    >
                      Select All Permissions
                    </label>

                  </div>

                </div>
              )}

              {/* TABLE */}
              <div className="school-map-table-wrapper">
                <div className="table-responsive">

                  <table className="table table-hover align-middle school-map-table">

                    <thead>
                      <tr>
                        <th
                          className="text-center"
                          style={{ width: "8%" }}
                        >
                          S.No
                        </th>

                        <th style={{ width: "25%" }}>
                          Module
                        </th>

                        <th style={{ width: "30%" }}>
                          Menu
                        </th>

                        <th style={{ width: "37%" }}>
                          Sub Menu
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredModules.length > 0 ? (
                        filteredModules.map((moduleData, index) => (
                          <PermissionTables
                            key={moduleData.id}
                            index={index}
                            moduleData={moduleData}
                            checkedModules={checkedModules}
                            checkedMenus={checkedMenus}
                            checkedSubMenus={checkedSubMenus}
                            onModuleChange={onModuleChange}
                            onMenuChange={onMenuChange}
                            onSubMenuChange={onSubMenuChange}
                          />
                        ))
                      ) : (
                        <tr>
                          <td
                            colSpan="4"
                            className="text-center school-map-empty"
                          >
                            <div className="school-map-empty-icon">
                              <LuCodesandbox size={27} />
                            </div>

                            <div className="fw-semibold text-dark mb-1">
                              No Modules Found
                            </div>

                            <div className="small text-muted">
                              No modules are assigned to this user group.
                            </div>
                          </td>
                        </tr>
                      )}
                    </tbody>

                  </table>

                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================
            SAVE BUTTON
        ========================= */}
        {isLoaded && selectedSchool && selectedGroup && (
          <div className="school-map-save-area mb-4">

            <div className="d-flex justify-content-between align-items-center gap-3">

              <div>
                <div className="fw-semibold">
                  Ready to save permissions?
                </div>

                <small className="text-muted">
                  Save the selected module, menu and submenu permissions
                  for this school and user group.
                </small>
              </div>

              <button
                className="btn btn-primary school-map-btn school-map-btn-primary px-4"
                onClick={handleSave}
              >
                <LuSave size={18} className="me-2" />
                Save Mapping
              </button>

            </div>

          </div>
        )}

      </div>
    </>
  );
};

export default SchoolMapping;