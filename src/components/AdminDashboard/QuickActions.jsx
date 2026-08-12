// import React from "react";
// import { FaSchool, FaUserTie, FaUsers } from "react-icons/fa";
// import { MdViewInAr, MdAssessment } from "react-icons/md";
// import { AiOutlineBars } from "react-icons/ai";
// import { BsBuildings } from "react-icons/bs";
// import { HiOutlineUserGroup } from "react-icons/hi";

// const QuickActions = () => {
//   const actions = [
//     {
//       title: "Create School",
//       icon: <FaSchool size={26} />,
//       color: "#6f42c1",
//       bg: "#f3e8ff",
//     },
//     {
//       title: "Create Superadmin",
//       icon: <FaUserTie size={26} />,
//       color: "#0d6efd",
//       bg: "#e7f0ff",
//     },
//     {
//       title: "Create Module",
//       icon: <MdViewInAr size={27} />,
//       color: "#198754",
//       bg: "#e8f7ef",
//     },
//     {
//       title: "Create Menu",
//       icon: <AiOutlineBars size={27} />,
//       color: "#fd7e14",
//       bg: "#fff0e1",
//     },
//     {
//       title: "Create User Group",
//       icon: <HiOutlineUserGroup size={27} />,
//       color: "#d63384",
//       bg: "#fce7f3",
//     },
//     {
//       title: "Map School",
//       icon: <BsBuildings size={26} />,
//       color: "#dc3545",
//       bg: "#fde8ea",
//     },
//     {
//       title: "User Mapping",
//       icon: <FaUsers size={26} />,
//       color: "#0dcaf0",
//       bg: "#e5f9fd",
//     },
//     {
//       title: "View Reports",
//       icon: <MdAssessment size={27} />,
//       color: "#795548",
//       bg: "#f3ebe7",
//     },
//   ];

//   return (
//     <div className="container-fluid px-2 mt-4">
//       <div className="card shadow-sm border-0">
//         <div className="card-body">
//           <h5 className="fw-semibold mb-4">Quick Actions</h5>

//           <div className="row g-3">
//             {actions.map((action, index) => (
//               <div key={index} className="col-6 col-sm-4 col-md-3 col-lg">
//                 <div className="border rounded-3 h-100 p-3 d-flex flex-column justify-content-center align-items-center text-center">
//                   {/* Icon */}
//                   <div
//                     className="rounded-circle d-flex justify-content-center align-items-center mb-2"
//                     style={{
//                       width: "55px",
//                       height: "55px",
//                       backgroundColor: action.bg,
//                     }}
//                   >
//                     <span style={{ color: action.color }}>{action.icon}</span>
//                   </div>

//                   {/* Name */}
//                   <small className="fw-semibold">{action.title}</small>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default QuickActions;

import React from "react";
import { FaSchool, FaUserTie, FaUsers } from "react-icons/fa";
import { MdViewInAr, MdAssessment } from "react-icons/md";
import { AiOutlineBars } from "react-icons/ai";
import { BsBuildings } from "react-icons/bs";
import { HiOutlineUserGroup } from "react-icons/hi";

const QuickActions = () => {
  const actions = [
    {
      title: "Create School",
      icon: <FaSchool size={26} />,
      color: "#6f42c1",
      bg: "#f3e8ff",
    },
    {
      title: "Create Superadmin",
      icon: <FaUserTie size={26} />,
      color: "#0d6efd",
      bg: "#e7f0ff",
    },
    {
      title: "Create Module",
      icon: <MdViewInAr size={26} />,
      color: "#198754",
      bg: "#e8f7ef",
    },
    {
      title: "Create Menu",
      icon: <AiOutlineBars size={26} />,
      color: "#fd7e14",
      bg: "#fff0e1",
    },
    {
      title: "Create User Group",
      icon: <HiOutlineUserGroup size={26} />,
      color: "#d63384",
      bg: "#fce7f3",
    },
    {
      title: "Map School",
      icon: <BsBuildings size={26} />,
      color: "#dc3545",
      bg: "#fde8ea",
    },
    {
      title: "User Mapping",
      icon: <FaUsers size={26} />,
      color: "#0dcaf0",
      bg: "#e5f9fd",
    },
    {
      title: "View Reports",
      icon: <MdAssessment size={26} />,
      color: "#795548",
      bg: "#f3ebe7",
    },
  ];

  return (
    <div className="container-fluid px-2 mt-4">

      <div className="card shadow-sm border-0">

        <div className="card-body">

          <h5 className="fw-semibold mb-4">
            Quick Actions
          </h5>

          <div className="row g-3">

            {actions.map((action, index) => (
              <div
                key={index}
                className="col-6 col-sm-4 col-md-3 col-lg "
              >

                <div
                  className="border rounded-3 p-2 h-100 d-flex flex-column justify-content-center align-items-center text-center "style={{backgroundColor:action.bg}}
                >

                  {/* ICON */}
                  <div
                    className="rounded-circle d-flex justify-content-center align-items-center mb-2 "
                    style={{
                   
                      backgroundColor: action.bg,
                    
                    }}
                  >
                    {React.cloneElement(action.icon, {
                      color: action.color,
                    })}
                  </div>

                  {/* NAME */}
                  <small className="fw-semibold">
                    {action.title}
                  </small>

                </div>

              </div>
            ))}

          </div>

        </div>

      </div>

    </div>
  );
};

export default QuickActions;