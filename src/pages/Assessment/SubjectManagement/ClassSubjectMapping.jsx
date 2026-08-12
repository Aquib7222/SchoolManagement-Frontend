// import React, { useState } from "react";
// import { MdErrorOutline } from "react-icons/md";
// import useMasters from "../../../hooks/useMasters";
// import axiosInstance from "../../../api/axiosInstance";

// const ClassSubjectMapping = () => {
//   const { sessions, standards } = useMasters();
//   const schoolId = JSON.parse(localStorage.getItem("schoolId"));
//   const [selectedSession, setSelectedSession] = useState("");
//   const [selectedStandard, setSelectedStandard] = useState("");
//   const [subjects, setSubjects] = useState([]);
//   const [selectedSubjects, setSelectedSubjects] = useState([]);

//   const handleLoadSubjects = async () => {
//     if (!selectedSession || !selectedStandard) {
//       alert("Please select Session and Standard");
//       return;
//     }

//     try {
//       const response = await axiosInstance.get(
//         `/api/assessment/subject?schoolId=${schoolId}`,
//       );

//       console.log("Subjects:", response.data);

//       setSubjects(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   console.log("map subjects", subjects);

//   const handleSubjectChange = (subjectId, checked) => {
//     if (checked) {
//       setSelectedSubjects((prev) => [...prev, subjectId]);
//     } else {
//       setSelectedSubjects((prev) => prev.filter((id) => id !== subjectId));
//     }
//   };
//   console.log("selected subjects", selectedSubjects);
//   return (
//     <>
//       {/* Header */}
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
//         <h6>Class Subject Mapping</h6>
//         <nav aria-label="breadcrumb py-2">
//           <ol className="breadcrumb">
//             <li className="breadcrumb-item">
//               <a href="/" style={{ textDecoration: "none", color: "black" }}>
//                 <small>Home</small>
//               </a>
//             </li>
//             <li className="breadcrumb-item active">
//               <small>School Management</small>
//             </li>
//             <li className="breadcrumb-item active">
//               <small>Class Subject Mapping</small>
//             </li>
//           </ol>
//         </nav>
//       </div>

//       {/* alert  */}
//       <div
//         className="ms-2 me-2 mt-2 alert  p-2 rounded shadow"
//         style={{ backgroundColor: "#ebfffd" }}
//       >
//         <small>
//           <MdErrorOutline size={20} /> Manage all subjects offered in this
//           school.These subjects will be used in assessment structure and mark
//           entry.
//         </small>
//       </div>

//       <div className="ms-2 me-2 mt-2 alert bg-white  p-2 rounded shadow">
//         <div className="row">
//           <div className="col-12 col-md-3">
//             <label htmlFor="">
//               Session<span className="text-danger">*</span>:
//             </label>
//             <select
//               name=""
//               className="form-select"
//               value={selectedSession}
//               onChange={(e) => setSelectedSession(e.target.value)}
//             >
//               <option value="">Select Session </option>
//               {sessions.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="col-12 col-md-3">
//             <label htmlFor="">
//               Standard<span className="text-danger">*</span>:
//             </label>
//             <select
//               name=""
//               className="form-select"
//               value={selectedStandard}
//               onChange={(e) => setSelectedStandard(e.target.value)}
//             >
//               <option value="">Select Standard </option>
//               {standards.map((item) => (
//                 <option key={item} value={item}>
//                   {item}
//                 </option>
//               ))}
//             </select>
//           </div>
//           <div className="col-12 col-md-3">
//             <button
//               className="btn btn-success mt-4"
//               onClick={handleLoadSubjects}
//             >
//               Load Subjects
//             </button>
//           </div>
//         </div>
//       </div>

//       <div className="ms-2 me-2 mt-4 alert bg-white  p-2 rounded shadow">
//         <div className="row ">
//           <div className="col-md-12 d-flex justify-content-between">
//             <h6>Select Subjects</h6>
//             <span className="d-flex gap-2">
//               <input
//                 type="checkbox"
//                 checked={selectedSubjects.length === subjects.length}
//                 onChange={(e) => {
//                   if (e.target.checked) {
//                     setSelectedSubjects(subjects.map((subject) => subject.id));
//                   } else {
//                     setSelectedSubjects([]);
//                   }
//                 }}
//                 name=""
//                 id=""
//                 className="form-check"
//               />{" "}
//               Select All
//             </span>
//           </div>
//         </div>

//         <div className="row">
//           <div className="col-md-12">
//             <table className="table table-bordered">
//               <thead className="table-info">
//                 <tr>
//                   <th>
//                     <input
//                       type="checkbox"
//                       checked={selectedSubjects.length === subjects.length}
//                       onChange={(e) => {
//                         if (e.target.checked) {
//                           setSelectedSubjects(
//                             subjects.map((subject) => subject.id),
//                           );
//                         } else {
//                           setSelectedSubjects([]);
//                         }
//                       }}
//                       name=""
//                       id=""
//                       className="form-check"
//                     />
//                   </th>
//                   <th>Subject Name</th>
//                   <th>Short Code</th>
//                   <th>Subject Type</th>
//                   <th>Status</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {subjects.map((subject) => (
//                   <tr>
//                     <td>
//                       <input
//                         type="checkbox"
//                         checked={selectedSubjects.includes(subject.id)}
//                         onChange={(e) =>
//                           handleSubjectChange(subject.id, e.target.checked)
//                         }
//                         className="form-check"
//                         value={subject.id}
//                         onC
//                       />
//                     </td>
//                     <td>{subject.subjectName}</td>
//                     <td>{subject.shortCode}</td>
//                     <td>{subject.subjectType}</td>
//                     <td>
//                       {subject.status ? (
//                         <span className="badge bg-success">Active</span>
//                       ) : (
//                         <span className="badge bg-danger">Inactive</span>
//                       )}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         </div>
//         <div className="row mt-3">
//           <div className="col-12 d-flex justify-content-end">
//             <button className="btn btn-success px-4">Map Subjects</button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ClassSubjectMapping;

import React, { useEffect, useState } from "react";
import { MdErrorOutline } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import { toast } from "react-toastify";
import useMasters from "../../../hooks/useMasters";
import axiosInstance from "../../../api/axiosInstance";

const ClassSubjectMapping = () => {
  const { sessions, standards } = useMasters();

  const schoolId = JSON.parse(localStorage.getItem("schoolId"));

  const [selectedSession, setSelectedSession] = useState("");
  const [selectedStandard, setSelectedStandard] = useState("");

  const [subjects, setSubjects] = useState([]);
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const [loading, setLoading] = useState(false);
  const [mappingLoading, setMappingLoading] = useState(false);

  const [mappedSubjects, setMappedSubjects] = useState([]);

  // =====================================================
  // LOAD SUBJECTS
  // =====================================================

  // const handleLoadSubjects = async () => {
  //   if (!selectedSession || !selectedStandard) {
  //     toast.warning("Please select Session and Standard");
  //     return;
  //   }

  //   try {
  //     setLoading(true);

  //     const response = await axiosInstance.get(
  //       `/api/assessment/subject?schoolId=${schoolId}`,
  //     );

  //     console.log("Subjects:", response.data);

  //     // Only active subjects
  //     const activeSubjects = response.data.filter(
  //       (subject) => subject.status === true,
  //     );

  //     setSubjects(activeSubjects);

  //     // Reset previous selection
  //     setSelectedSubjects([]);

  //   } catch (error) {
  //     console.log("Load Subjects Error:", error);

  //     toast.error(
  //       error.response?.data || "Failed to load subjects",
  //     );
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleLoadSubjects = async () => {
    if (!selectedSession || !selectedStandard) {
      alert("Please select Session and Standard");
      return;
    }

    try {
      // 1. Get all subjects
      const subjectResponse = await axiosInstance.get(
        `/api/assessment/subject?schoolId=${schoolId}`,
      );

      const allSubjects = subjectResponse.data;

      // 2. Get already mapped subjects
      const mappedResponse = await axiosInstance.get(
        `/api/assessment/class-subject/mapped`,
        {
          params: {
            schoolId: schoolId,
            academicYear: selectedSession,
            studentClass: selectedStandard,
          },
        },
      );

      const mapped = mappedResponse.data;

      console.log("All Subjects:", allSubjects);
      console.log("Already Mapped:", mapped);

      setSubjects(allSubjects);
      setMappedSubjects(mapped);

      // 3. Already mapped subject IDs select kar do
      const mappedIds = mapped.map((item) => item.subjectId);

      setSelectedSubjects(mappedIds);
    } catch (error) {
      console.log("Load Subjects Error:", error);
      console.log("Response:", error.response?.data);
    }
  };

  // =====================================================
  // SUBJECT CHECKBOX
  // =====================================================

  const handleSubjectChange = (subjectId, checked) => {
    if (checked) {
      setSelectedSubjects((prev) => {
        if (prev.includes(subjectId)) {
          return prev;
        }

        return [...prev, subjectId];
      });
    } else {
      setSelectedSubjects((prev) => prev.filter((id) => id !== subjectId));
    }
  };

  // =====================================================
  // SELECT ALL
  // =====================================================

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedSubjects(subjects.map((subject) => subject.id));
    } else {
      setSelectedSubjects([]);
    }
  };

  // =====================================================
  // MAP SUBJECTS
  // =====================================================

  const handleMapSubjects = async () => {
    if (!selectedSession) {
      toast.warning("Please select Session");
      return;
    }

    if (!selectedStandard) {
      toast.warning("Please select Standard");
      return;
    }

    if (selectedSubjects.length === 0) {
      toast.warning("Please select at least one subject");
      return;
    }

    const payload = {
      schoolId: schoolId,

      // Session is your academicYear
      academicYear: selectedSession,

      // Standard/Class
      studentClass: selectedStandard,

      // Selected Subject IDs
      subjectIds: selectedSubjects,
    };

    console.log("Class Subject Mapping Payload:", payload);

    try {
      setMappingLoading(true);

      const response = await axiosInstance.post(
        "/api/assessment/class-subject/map",
        payload,
      );

      console.log("Mapping Response:", response.data);

      toast.success("Subjects mapped successfully");

      // Keep selected subjects or clear them
      setSelectedSubjects([]);
    } catch (error) {
      console.log("Mapping Error:", error);

      console.log("Status:", error.response?.status);
      console.log("Data:", error.response?.data);

      toast.error(error.response?.data || "Failed to map subjects");
    } finally {
      setMappingLoading(false);
    }
  };

  

  const loadMappedSubjects = async () => {
    if (!selectedSession || !selectedStandard) {
      return;
    }

    try {
      const response = await axiosInstance.get(
        `/api/assessment/class-subject/mapped?schoolId=${schoolId}&academicYear=${selectedSession}&studentClass=${selectedStandard}`,
      );

      console.log("Already Mapped Subjects:", response.data);

      const mappedIds = response.data.map((subject) => subject.subjectId);

      setSelectedSubjects(mappedIds);
    } catch (error) {
      console.log("Mapped Subjects Error:", error);

      
    }
  };

  

  useEffect(() => {
    if (selectedSession && selectedStandard) {
      loadMappedSubjects();
    } else {
      setSelectedSubjects([]);
    }
  }, [selectedSession, selectedStandard]);

  
  const allSelected =
    subjects.length > 0 && selectedSubjects.length === subjects.length;

  return (
    <>
      {/* =====================================================
          HEADER
      ===================================================== */}

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
          <FaLink /> Class Subject Mapping
        </h6>

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a
                href="/"
                style={{
                  textDecoration: "none",
                  color: "black",
                }}
              >
                <small>Home</small>
              </a>
            </li>

            <li className="breadcrumb-item active">
              <small>School Management</small>
            </li>

            <li className="breadcrumb-item active">
              <small>Class Subject Mapping</small>
            </li>
          </ol>
        </nav>
      </div>

      {/* =====================================================
          INFORMATION ALERT
      ===================================================== */}

      <div
        className="ms-2 me-2 mt-2 alert p-2 rounded shadow"
        style={{
          backgroundColor: "#ebfffd",
        }}
      >
        <small>
          <MdErrorOutline size={20} /> Manage subjects assigned to each class.
          These subjects will be available while creating assessment structures
          and entering marks.
        </small>
      </div>

      {/* =====================================================
          FILTER
      ===================================================== */}

      <div className="ms-2 me-2 mt-2 alert bg-white p-3 rounded shadow">
        <div className="row g-3">
          {/* SESSION */}

          <div className="col-12 col-md-3">
            <label className="form-label">
              Session <span className="text-danger">*</span>
            </label>

            <select
              className="form-select"
              value={selectedSession}
              onChange={(e) => {
                setSelectedSession(e.target.value);
                setSubjects([]);
                setSelectedSubjects([]);
              }}
            >
              <option value="">Select Session</option>

              {sessions.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* STANDARD */}

          <div className="col-12 col-md-3">
            <label className="form-label">
              Standard <span className="text-danger">*</span>
            </label>

            <select
              className="form-select"
              value={selectedStandard}
              onChange={(e) => {
                setSelectedStandard(e.target.value);
                setSubjects([]);
                setSelectedSubjects([]);
              }}
            >
              <option value="">Select Standard</option>

              {standards.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* LOAD */}

          <div className="col-12 col-md-3 d-flex align-items-end">
            <button
              className="btn btn-success"
              onClick={handleLoadSubjects}
              disabled={loading}
            >
              {loading ? "Loading..." : "Load Subjects"}
            </button>
          </div>
        </div>
      </div>

      {/* =====================================================
          SUBJECT LIST
      ===================================================== */}

      <div className="ms-2 me-2 mt-4 alert bg-white p-3 rounded shadow">
        <div className="row">
          <div className="col-md-12">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h6 className="mb-0">Select Subjects</h6>

              {subjects.length > 0 && (
                <div className="d-flex align-items-center gap-2">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    checked={allSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />

                  <small>Select All</small>
                </div>
              )}
            </div>

            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-info">
                  <tr>
                    <th style={{ width: "50px" }}>
                      <input
                        type="checkbox"
                        className="form-check-input"
                        checked={allSelected}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        disabled={subjects.length === 0}
                      />
                    </th>

                    <th>Subject Name</th>

                    <th>Short Code</th>

                    <th>Subject Type</th>

                    <th>Subject Category</th>

                    <th>Status</th>
                    <th>Mapping</th>
                  </tr>
                </thead>

                <tbody>
                  {subjects.map((subject) => {
                    const isMapped = mappedSubjects.some(
                      (item) => item.subjectId === subject.id,
                    );

                    return (
                      <tr key={subject.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedSubjects.includes(subject.id)}
                            onChange={(e) =>
                              handleSubjectChange(subject.id, e.target.checked)
                            }
                            className="form-check"
                          />
                        </td>

                        <td>{subject.subjectName}</td>

                        <td>{subject.shortCode}</td>

                        <td>{subject.subjectType}</td>
                        <td>{subject.subjectCategory}</td>
                        <td>
                          {subject.status ? (
                            <span className="badge bg-success">Active</span>
                          ) : (
                            <span className="badge bg-danger">Inactive</span>
                          )}
                        </td>

                        <td>
                          {isMapped ? (
                            <span className="badge bg-primary">Mapped</span>
                          ) : (
                            <span className="badge bg-secondary">
                              Not Mapped
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* =====================================================
            MAP BUTTON
        ===================================================== */}

        <div className="row mt-3">
          <div className="col-12 d-flex justify-content-end">
            <button
              className="btn btn-success px-4"
              onClick={handleMapSubjects}
              disabled={mappingLoading || selectedSubjects.length === 0}
            >
              <FaLink className="me-1" />

              {mappingLoading ? " Mapping..." : " Map Subjects"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ClassSubjectMapping;
