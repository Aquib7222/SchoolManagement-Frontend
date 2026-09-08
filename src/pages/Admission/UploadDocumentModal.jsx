
// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";

// const UploadDocumentModal = ({ admission }) => {
//   const [documentType, setDocumentType] = useState("");
//   const [file, setFile] = useState(null);
//   const navigate =useNavigate();

//   const token = localStorage.getItem("token");

//   const handleUpload = async () => {
//     if (!admission) {
//       alert("Please select a student");
//       return;
//     }

//     if (!documentType || !file) {
//       alert("Select document type and file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("admissionId", admission.id);
//     formData.append("type", documentType);
//     formData.append("file", file);

//     try {
//       await axios.post(
//         "http://localhost:8080/api/documents/upload",
//         formData,
//         { headers: { Authorization: `Bearer ${token}` } }
//       );

//       alert("Document uploaded successfully");
//       setFile(null);
//       setDocumentType("");
//     } catch (err) {
//       console.error(err);
//       alert("Upload failed");
//     }
//     navigate(-1);
//   };

//   return (
//     <div className="modal fade" id="uploadModal" tabIndex="-1">
//       <div className="modal-dialog">
//         <div className="modal-content">

//           <div className="modal-header">
//             <h5 className="modal-title">
//               Upload Documents
//             </h5>
//             <button className="btn-close" data-bs-dismiss="modal"></button>
//           </div>

//           <div className="modal-body">
//             {admission && (
//               <p className="mb-2">
//                 <strong>{admission.admissionNumber}</strong> –{" "}
//                 {admission.firstName} {admission.lastName}
//               </p>
//             )}

//             <select
//               className="form-select mb-2"
//               value={documentType}
//               onChange={e => setDocumentType(e.target.value)}
//             >
//               <option value="">Select Document</option>
//               <option value="STUDENT_PHOTO">Student Photo</option>
//               <option value="FATHER_PHOTO">Father Photo</option>
//               <option value="MOTHER_PHOTO">Mother Photo</option>
//               <option value="AADHAR">Aadhaar Card</option>
//               <option value="TC">Transfer Certificate</option>
//             </select>

//             <input
//               type="file"
//               className="form-control"
//               onChange={e => setFile(e.target.files[0])}
//             />
//           </div>

//           <div className="modal-footer">
//             <button className="btn btn-success" onClick={handleUpload}>
//               Upload
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadDocumentModal;

// import React, { useState } from "react";
// import axios from "axios";

// const UploadDocumentModal = ({ admission, onSuccess }) => {
//   const [documentType, setDocumentType] = useState("");
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleUpload = async () => {
//     if (!admission?.id) {
//       alert("Admission not found");
//       return;
//     }

//     if (!documentType || !file) {
//       alert("Please select document type and file");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("admissionId", admission.id);
//     formData.append("documentType", documentType);
//     formData.append("file", file);

//     try {
//       setLoading(true);

//       await axios.post(
//         "http://localhost:8080/api/documents/upload",
//         formData,
//         { headers: { "Content-Type": "multipart/form-data" } }
//       );

//       alert("Document uploaded successfully");
//       setDocumentType("");
//       setFile(null);
//       onSuccess(); // refresh list

//       document.getElementById("closeUploadModal").click();
//     } catch (error) {
//       console.error(error);
//       alert("Upload failed");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="modal fade" id="uploadDocumentModal">
//       <div className="modal-dialog">
//         <div className="modal-content">

//           <div className="modal-header">
//             <h5 className="modal-title">
//               Upload Document ({admission?.admissionNumber})
//             </h5>
//             <button
//               id="closeUploadModal"
//               type="button"
//               className="btn-close"
//               data-bs-dismiss="modal"
//             />
//           </div>

//           <div className="modal-body">
//             <select
//               className="form-control mb-3"
//               value={documentType}
//               onChange={(e) => setDocumentType(e.target.value)}
//             >
//               <option value="">Select Document Type</option>
//               <option value="AADHAR">Aadhar Card</option>
//               <option value="BIRTH_CERTIFICATE">Birth Certificate</option>
//               <option value="TC">Transfer Certificate</option>
//               <option value="MARKSHEET">Marksheet</option>
//             </select>

//             <input
//               type="file"
//               className="form-control"
//               onChange={(e) => setFile(e.target.files[0])}
//             />
//           </div>

//           <div className="modal-footer">
//             <button
//               className="btn btn-primary"
//               onClick={handleUpload}
//               disabled={loading}
//             >
//               {loading ? "Uploading..." : "Upload"}
//             </button>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// };

// export default UploadDocumentModal;

import React, { useState } from "react";
import axios from "axios";

const UploadDocumentModal = ({ admission, onSuccess }) => {
  const [documentType, setDocumentType] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const token = localStorage.getItem("token");

  const handleUpload = async () => {
    if (!admission?.id) {
      alert("Admission not found");
      return;
    }

    if (!documentType || !file) {
      alert("Please select document type and file");
      return;
    }

    const formData = new FormData();
    formData.append("admissionId", admission.id);
    formData.append("type", documentType);
    formData.append("file", file);

    try {
      setLoading(true);

      await axios.post(
        "http://localhost:8080/api/documents/upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Document uploaded successfully");
      setDocumentType("");
      setFile(null);

      onSuccess(); // refresh document list
    } catch (error) {
      console.error(error);
      alert("Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="modal fade"
      id="uploadDocumentModal"
      tabIndex="-1"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">

          <div className="modal-header">
            <h5 className="modal-title">
              Upload Document ({admission?.admissionNumber})
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
            />
          </div>

          <div className="modal-body">
            <select
              className="form-select mb-3"
              value={documentType}
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <option value="">Select Document Type</option>
              <option value="AADHAR">Aadhar Card</option>
              <option value="BIRTH_CERTIFICATE">Birth Certificate</option>
              <option value="TC">Transfer Certificate</option>
              <option value="MARKSHEET">Marksheet</option>
            </select>

            <input
              type="file"
              className="form-control"
              onChange={(e) => setFile(e.target.files[0])}
            />
          </div>

          <div className="modal-footer">
            <button
              className="btn btn-primary"
              onClick={handleUpload}
              disabled={loading}
            >
              {loading ? "Uploading..." : "Upload"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default UploadDocumentModal;
