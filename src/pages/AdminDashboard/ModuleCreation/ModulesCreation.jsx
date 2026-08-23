
// import React, { useState } from "react";
// import axiosInstance from "axiosInstance";

// const ModuleCreation = () => {
//   const [form, setForm] = useState({
//     moduleName: "",
//     icon: "",
//     path: "",
//     hasMenu: true,
//     status: "Active",
//   });

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     setForm({
//       ...form,
//       [name]: type === "checkbox" ? checked : value,
//     });
//   };

//   const saveModule = async () => {
//     await axiosInstance.post(
//       "http://localhost:8080/api/module/create",
//       form
//     );

//     alert("Module Created");
//   };

//   return (
//     <>

//      {/* ---------- HEADER ---------- */}
//       <div
//         className="row shadow"
//         style={{
//           // backgroundColor: "white",
//           background:
//             "linear-gradient(135deg, rgb(61, 87, 236) 0%, rgb(97, 150, 248) 50%, #87ddf7 100%)",
//           margin: "10px",
//           height: "67px",
//           borderRadius: "5px",
//           padding: "10px",
//           color: "black",
//         }}
//       >
//         <h6>
//           <strong>Module Create</strong>
//         </h6>
//         <nav aria-label="breadcrumb py-2">
//           <ol className="breadcrumb">
//             <li className="breadcrumb-item">
//               <a href="/" style={{ textDecoration: "none", color: "black" }}>
//                 Home
//               </a>
//             </li>
//             <li className="breadcrumb-item">
//               <a href="#" style={{ textDecoration: "none", color: "black" }}>
//                 Modules Creation
//               </a>
//             </li>
//           </ol>
//         </nav>
//       </div>

//     <div className="container mt-4 p-3 bg-white shadow rounded">
//       <h4>Create Module</h4>

//       <div className="row">
//         <div className="col-md-4">
//           <label>Module Name</label>
//           <input
//             className="form-control"
//             name="moduleName"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="col-md-4">
//           <label>Icon</label>
//           <input
//             className="form-control"
//             name="icon"
//             onChange={handleChange}
//           />
//         </div>

//         <div className="col-md-4">
//           <label>Has Menu</label>
//           <br />
//           <input
//             type="checkbox"
//             checked={form.hasMenu}
//             name="hasMenu"
//             onChange={handleChange}
//           />
//         </div>
//       </div>

//       {!form.hasMenu && (
//         <div className="row mt-3">
//           <div className="col-md-4">
//             <label>Direct Path</label>
//             <input
//               className="form-control"
//               name="path"
//               onChange={handleChange}
//             />
//           </div>
//         </div>
//       )}

//       <button
//         className="btn btn-primary mt-3"
//         onClick={saveModule}
//       >
//         Save Module
//       </button>
//     </div>

//     </>
//   );
// };

// export default ModuleCreation;

import React, { useState } from "react";
import axiosInstance from "../../../api/axiosInstance";


const ModuleCreation = () => {
  const initialState = {
    moduleName: "",
    icon: "",
    path: "",
    hasMenu: true,
    status: "Active",
  };

  const [form, setForm] = useState(initialState);
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "file") {
      const file = files[0];

      if (file) {
        setImage(file);
        setPreview(URL.createObjectURL(file));
      }
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  // Save Module
  const saveModule = async () => {
    if (!form.moduleName.trim()) {
      alert("Please enter Module Name");
      return;
    }

    try {
      const formData = new FormData();

      formData.append(
        "module",
        new Blob([JSON.stringify(form)], {
          type: "application/json",
        })
      );

      if (image) {
        formData.append("image", image);
      }

      await axiosInstance.post(
        "/api/module/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Module Created Successfully");

      setForm(initialState);
      setImage(null);
      setPreview("");

      document.getElementById("imageInput").value = "";
    } catch (error) {
      console.error(error);
      alert("Unable to create module");
    }
  };

  return (
    <>
      {/* Header */}
      <div
        className="row shadow"
        style={{
          background:
            "linear-gradient(135deg,rgb(61,87,236) 0%, rgb(97,150,248) 50%, #87ddf7 100%)",
          margin: "10px",
          height: "67px",
          borderRadius: "5px",
          padding: "10px",
        }}
      >
        <h5>
          <strong>Module Creation</strong>
        </h5>

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
                Home
              </a>
            </li>

            <li className="breadcrumb-item active">
              Module Creation
            </li>
          </ol>
        </nav>
      </div>

      {/* Form */}

      <div className="container bg-white shadow rounded p-4 mt-3">
        <h4 className="mb-4">Create Module</h4>

        <div className="row">

          {/* Module Name */}

          <div className="col-md-4 mb-3">
            <label className="form-label">
              Module Name
            </label>

            <input
              type="text"
              className="form-control"
              name="moduleName"
              value={form.moduleName}
              onChange={handleChange}
              placeholder="Enter Module Name"
            />
          </div>

          {/* Icon */}

          <div className="col-md-4 mb-3">
            <label className="form-label">
              Icon
            </label>

            <input
              type="text"
              className="form-control"
              name="icon"
              value={form.icon}
              onChange={handleChange}
              placeholder="FaUsers"
            />
          </div>

          {/* Has Menu */}

          <div className="col-md-4 mb-3">
            <label className="form-label d-block">
              Has Menu
            </label>

            <input
              type="checkbox"
              name="hasMenu"
              checked={form.hasMenu}
              onChange={handleChange}
            />
          </div>

          {/* Path */}

          {!form.hasMenu && (
            <div className="col-md-4 mb-3">
              <label className="form-label">
                Direct Path
              </label>

              <input
                type="text"
                className="form-control"
                name="path"
                value={form.path}
                onChange={handleChange}
                placeholder="/dashboard"
              />
            </div>
          )}

          {/* Status */}

          <div className="col-md-4 mb-3">
            <label className="form-label">
              Status
            </label>

            <select
              className="form-select"
              name="status"
              value={form.status}
              onChange={handleChange}
            >
              <option>Active</option>
              <option>Inactive</option>
            </select>
          </div>

          {/* Image */}

          <div className="col-md-4 mb-3">
            <label className="form-label">
              Module Image
            </label>

            <input
              id="imageInput"
              type="file"
              className="form-control"
              accept=".png,.jpg,.jpeg"
              onChange={handleChange}
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">
              Sequence Number
            </label>

            <input
              type="text"
              className="form-control"
              name="sequenceNumber"
              value={form.sequenceNumber}
              onChange={handleChange}
              placeholder="Enter Sequence Number"
            />
          </div>

          {/* Preview */}

          {preview && (
            <div className="col-md-3 mb-3">
              <label className="form-label">
                Preview
              </label>

              <div className="border rounded p-2">
                <img
                  src={preview}
                  alt="Preview"
                  style={{
                    width: "100%",
                    height: "120px",
                    objectFit: "contain",
                  }}
                />
              </div>
            </div>
          )}
        </div>

        <div className="text-end mt-3">
          <button
            className="btn btn-primary px-4"
            onClick={saveModule}
          >
            Save Module
          </button>
        </div>
      </div>
    </>
  );
};

export default ModuleCreation;