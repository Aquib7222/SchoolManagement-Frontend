// import React from "react";

// const SuperDashboard = () => {
//   return (
//     <div className="row w-100">
//       <div className="col-md-3">
//         <div class="card" style={{width: "18rem"}}>
//           <div class="card-body">
//             <h5 class="card-title">Card title</h5>
//             <h6 class="card-subtitle mb-2 text-body-secondary">
//               Card subtitle
//             </h6>
//             <p class="card-text">
//               Some quick example text to build on the card title and make up the
//               bulk of the card’s content.
//             </p>

//           </div>
//         </div>
//       </div>
//       <div className="col-md-3">
//         <div class="card" style={{width: "18rem"}}>
//           <div class="card-body">
//             <h5 class="card-title">Card title</h5>
//             <h6 class="card-subtitle mb-2 text-body-secondary">
//               Card subtitle
//             </h6>
//             <p class="card-text">
//               Some quick example text to build on the card title and make up the
//               bulk of the card’s content.
//             </p>

//           </div>
//         </div>
//       </div>
//       <div className="col-md-3">
//         <div class="card" style={{width: "18rem"}}>
//           <div class="card-body">
//             <h5 class="card-title">Card title</h5>
//             <h6 class="card-subtitle mb-2 text-body-secondary">
//               Card subtitle
//             </h6>
//             <p class="card-text">
//               Some quick example text to build on the card title and make up the
//               bulk of the card’s content.
//             </p>

//           </div>
//         </div>
//       </div>
//       <div className="col-md-3">
//         <div class="card" style={{width: "18rem"}}>
//           <div class="card-body">
//             <h5 class="card-title">Card title</h5>
//             <h6 class="card-subtitle mb-2 text-body-secondary">
//               Card subtitle
//             </h6>
//             <p class="card-text">
//               Some quick example text to build on the card title and make up the
//               bulk of the card’s content.
//             </p>

//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SuperDashboard;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { Outlet, useLocation } from "react-router-dom";

// const SuperDashboard = () => {
//   const [TotalStudents,setTotalStudents]=useState();
//   const location = useLocation();

//   // Show cards only on dashboard home
//   const showCards = location.pathname === "/";

//   const cards = [
//   {
//     title: "Total Students",
//     subtitle: {TotalStudents},
//     gradient: "linear-gradient(135deg, #667eea, #764ba2)",
//   },
//   {
//     title: "Total Teachers",
//     subtitle: "15",
//     gradient: "linear-gradient(135deg, #11998e, #38ef7d)",
//   },
//   {
//     title: "Total Fee Paid",
//     subtitle: "Rs 10000",
//     gradient: "linear-gradient(135deg, #ff416c, #ff4b2b)",
//   },
//   {
//     title: "Total Due Fee",
//     subtitle: "Rs 20000",
//     gradient: "linear-gradient(135deg, #f7971e, #ffd200)",
//   },
// ];
// const user = JSON.parse(localStorage.getItem("user"));
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     if (!user?.schoolId) return;

//     axios
//       .get(
//         `http://localhost:8080/api/admissions/school?schoolId=${user.schoolId}`,
//         { headers: { Authorization: `Bearer ${token}` } }
//       )
//       .then((res) => setAdmissions(res.data))
//       .catch(console.error);
//   }, [user?.schoolId]);

// useEffect(()=>{
//   axios.get(
//   `http://localhost:8080/api/students/count?schoolId=${user.schoolId}`,
//   { headers: { Authorization: `Bearer ${token}` } }
// )
// .then(res => setTotalStudents(res.data));

// })

// console.log("Total Students",TotalStudents);

//   return (
//     <>
//       {/* ✅ SHOW ONLY ON / */}
//       {showCards && (
//         <div className="row w-100 mb-4">
//           {cards.map((card, index) => (
//             <div className="col-md-3 mb-4" key={index}>
//               <div className={`card h-100 shadow-lg text-white `}style={{ background: card.gradient }}>
//                 <div className="card-body">
//                   <h5>{card.title}</h5>
//                   <h6>{card.subtitle}</h6>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Child pages render here */}
//       <Outlet />
//     </>
//   );
// };

// export default SuperDashboard;

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { FaChalkboardTeacher, FaUsers } from "react-icons/fa";
// import { HiMiniCurrencyRupee } from "react-icons/hi2";
// import { PiStudentFill } from "react-icons/pi";
// import { Outlet, useLocation } from "react-router-dom";
// import students from "../../assets/icon/graduates.png";
// import teachers from "../../assets/icon/female.png";
// import ClassWiseStudentCharts from "./Charts/ClassWiseStudentCharts";

// const SuperDashboard = () => {
//   const [TotalStudents, setTotalStudents] = useState(0);
//   const [TotalTeachers, setTotalTeachers] = useState(0);
//   const [classWiseStudents, setClassWiseStudents] = useState([]);


//   const location = useLocation();

//   const showCards = location.pathname === "/";

//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user?.schoolId;
//   const token = localStorage.getItem("token");

//   const cards = [
//     {
//       title: "Total Students",
//       subtitle: TotalStudents,
//       gradient:
//         "linear-gradient(135deg, #0d4e86ff 0%, #42a5f5 50%, #90caf9 100%)",
//       icon: (
//         <img
//           src={students}
//           alt="Student"
//           style={{ width: "30px", height: "30px" }}
//         />
//       ),
//     },
//     {
//       title: "Total Teachers",
//       subtitle: TotalTeachers.length,
//       gradient:
//         "linear-gradient(135deg, #06af0eff 0%, #3ece46ff 50%, #a5d6a7 100%)",
//       icon: (
//         <img
//           src={teachers}
//           alt="Student"
//           style={{ width: "30px", height: "30px" }}
//         />
//       ),
//     },
//     {
//       title: "Total Fee Paid",
//       subtitle: "Rs 10000",
//       gradient:
//         "linear-gradient(135deg, #0d4e86ff 0%, #42a5f5 50%, #90caf9 100%)",
//       icon: <HiMiniCurrencyRupee />,
//     },
//     {
//       title: "Total Due Fee",
//       subtitle: "Rs 20000",
//       gradient:
//         "linear-gradient(135deg, #06af0eff 0%, #3ece46ff 50%, #a5d6a7 100%)",
//       icon: <HiMiniCurrencyRupee />,
//     },
//   ];

//   // ✅ Fetch total students count
//   useEffect(() => {
//     if (!user?.schoolId) return;

//     axios
//       .get(
//         `http://localhost:8080/api/students/count?schoolId=${user.schoolId}`,
//         { headers: { Authorization: `Bearer ${token}` } },
//       )
//       .then((res) => setTotalStudents(res.data))
//       .catch(console.error);
//   }, [user?.schoolId, token]);

//   // --------------------Total Teachers Count ----------------------------------
//   useEffect(() => {
//     if (!schoolId) return;

//     axios
//       .get("http://localhost:8080/api/teachers", {
//         params: {
//           schoolId: schoolId,
//           status: "Working",
//         },
//       })
//       .then((res) => setTotalTeachers(res.data))
//       .catch((err) => console.error(err));
//   }, [schoolId]);
//   console.log("Teachers", TotalTeachers);

//   return (
//     <>
//       {showCards && (
//         <div className="row w-100  mt-4 ">
//           {cards.map((card, index) => (
//             <div className="col-md-3 mb-4" key={index}>
//               <div
//                 className="card h-100 shadow text-white dashboard-card"
//                 style={{ background: card.gradient }}
//               >
//                 <div className="card-body position-relative">
//                   <h5>
//                     {card.icon} {card.title}
//                   </h5>
//                   <h6>{card.subtitle}</h6>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="row w-100 mb-4  h-50 ">
//         <div className="col-md-4">
//           <div className="card h-100 shadow">
//             <div
//               className="d-flex justify-content-between card-header text-white p-2 m-1"
//               style={{
//                 background:
//                   "linear-gradient(135deg, #06af0eff 0%, #3ece46ff 50%, #a5d6a7 100%)",
//               }}
//             >
//               <h6>Student Classwise</h6>
//               <select name="" id="" className="form-select w-50">
//                 <option value="">Select Class</option>
//                 <option value="NURSERY">NURSERY</option>
//                 <option value="LKG">LKG</option>
//                 <option value="UKG">UKG</option>
//                 <option value="I">I</option>
//                 <option value="II">II</option>
//                 <option value="III">III</option>
//                 <option value="IV">IV</option>
//                 <option value="V">V</option>
//                 <option value="VI">VI</option>
//                 <option value="VII">VII</option>
//                 <option value="VIII">VIII</option>
//                 <option value="IX">IX</option>
//                 <option value="X">X</option>
//                 <option value="XI">XI</option>
//                 <option value="XII">XII</option>
//               </select>
//             </div>
//           </div>
//           <div className="card-body">
//             <ClassWiseStudentCharts data={classWiseStudents} />
//           </div>
//         </div>
//         <div className="col-md-8 ">
//           <div className="card h-100 shadow"></div>
//         </div>
//       </div>

//       <Outlet />
//     </>
//   );
// };

// export default SuperDashboard;


import axios from "axios";
import { useEffect, useState } from "react";
import { HiMiniCurrencyRupee } from "react-icons/hi2";
import { Outlet, useLocation } from "react-router-dom";
import studentsIcon from "../../assets/icon/graduates.png";
import teachersIcon from "../../assets/icon/female.png";
import ClassWiseStudentCharts from "./Charts/ClassWiseStudentCharts";

const SuperDashboard = () => {
  const location = useLocation();
  const showCards = location.pathname === "/";

  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.schoolId;
  const token = localStorage.getItem("token");

  const [totalStudents, setTotalStudents] = useState(0);
  const [totalTeachers, setTotalTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [classWiseStudents, setClassWiseStudents] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");

  // -------------------- Cards --------------------
  const cards = [
    {
      title: "Total Students",
      subtitle: totalStudents,
      gradient:
        "linear-gradient(135deg, #0d4e86ff 0%, #42a5f5 50%, #90caf9 100%)",
      icon: <img src={studentsIcon} alt="Students" width={30} />,
    },
    {
      title: "Total Teachers",
      subtitle: totalTeachers.length,
      gradient:
        "linear-gradient(135deg, #06af0eff 0%, #3ece46ff 50%, #a5d6a7 100%)",
      icon: <img src={teachersIcon} alt="Teachers" width={30} />,
    },
    {
      title: "Total Fee Paid",
      subtitle: "₹ 10,000",
      gradient:
        "linear-gradient(135deg, #0d4e86ff 0%, #42a5f5 50%, #90caf9 100%)",
      icon: <HiMiniCurrencyRupee />,
    },
    {
      title: "Total Due Fee",
      subtitle: "₹ 20,000",
      gradient:
        "linear-gradient(135deg, #06af0eff 0%, #3ece46ff 50%, #a5d6a7 100%)",
      icon: <HiMiniCurrencyRupee />,
    },
  ];

  // -------------------- Fetch Total Students Count --------------------
  useEffect(() => {
    if (!schoolId) return;

    axios
      .get(`http://localhost:8080/api/students/count`, {
        params: { schoolId },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTotalStudents(res.data))
      .catch(console.error);
  }, [schoolId, token]);

  // -------------------- Fetch Teachers --------------------
  useEffect(() => {
    if (!schoolId) return;

    axios
      .get("http://localhost:8080/api/teachers", {
        params: { schoolId, status: "Working" },
      })
      .then((res) => setTotalTeachers(res.data))
      .catch(console.error);
  }, [schoolId]);

  // -------------------- Fetch Students (NO class-wise API) --------------------
  useEffect(() => {
    if (!schoolId) return;

    axios
      .get("http://localhost:8080/api/students", {
        params: { schoolId },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const list = Array.isArray(res.data) ? res.data : [];
        setStudents(list);
        calculateClassWise(list);
      })
      .catch(console.error);
  }, [schoolId, token]);

  // -------------------- Class-wise Calculation --------------------
  const calculateClassWise = (list) => {
    const map = {};

    list.forEach((s) => {
      const cls = s.studentClass; // 🔴 adjust if backend key differs
      if (!cls) return;
      map[cls] = (map[cls] || 0) + 1;
    });

    const chartData = Object.keys(map).map((cls) => ({
      className: cls,
      totalStudents: map[cls],
    }));

    setClassWiseStudents(chartData);
  };

  // -------------------- Dropdown Filter --------------------
  useEffect(() => {
    if (selectedClass) {
      calculateClassWise(
        students.filter((s) => s.studentClass === selectedClass)
      );
    } else {
      calculateClassWise(students);
    }
  }, [selectedClass]);

  return (
    <>
      {/* -------------------- DASHBOARD CARDS -------------------- */}
      {showCards && (
        <div className="row w-100 mt-4">
          {cards.map((card, index) => (
            <div className="col-md-3 mb-4" key={index}>
              <div
                className="card h-100 shadow text-white"
                style={{ background: card.gradient }}
              >
                <div className="card-body">
                  <h6 className="d-flex align-items-center gap-2">
                    {card.icon} {card.title}
                  </h6>
                  <h5>{card.subtitle}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* -------------------- CHART SECTION -------------------- */}
      <div className="row w-100 mb-4">
        <div className="col-md-4">
          <div className="card h-100 shadow">
            <div
              className="card-header d-flex justify-content-between text-white"
              style={{
                background:
                  "linear-gradient(135deg, #06af0eff 0%, #3ece46ff 50%, #a5d6a7 100%)",
              }}
            >
              <h6>Student Class-wise</h6>
              <select
                className="form-select w-50"
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
              >
                <option value="">All</option>
                <option value="NURSERY">NURSERY</option>
                <option value="LKG">LKG</option>
                <option value="UKG">UKG</option>
                <option value="I">I</option>
                <option value="II">II</option>
                <option value="III">III</option>
                <option value="IV">IV</option>
                <option value="V">V</option>
                <option value="VI">VI</option>
                <option value="VII">VII</option>
                <option value="VIII">VIII</option>
                <option value="IX">IX</option>
                <option value="X">X</option>
                <option value="XI">XI</option>
                <option value="XII">XII</option>
              </select>
            </div>

            <div className="card-body">
              <ClassWiseStudentCharts data={classWiseStudents} />
            </div>
          </div>
        </div>

        <div className="col-md-8">
          <div className="card h-100 shadow"></div>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default SuperDashboard;
