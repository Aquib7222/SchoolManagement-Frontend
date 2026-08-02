

import React, { useState } from "react";
import axios from "axios";
import useMasters from "../../hooks/useMasters";

const Admission_Fee_Setup = () => {
  const {sessions,standards} = useMasters();

  const user = JSON.parse(localStorage.getItem("user")); 
  // user must contain schoolId

  const [formData, setFormData] = useState({
    session: "",
    standard: "",
    annualCharges: "",
    examCharges: "",
    tuitionFee: "",
    sportsFee: "",
    photoCardFee: "",
    libraryLabFee: "",
    transportFee: "",
    miscCharges: "",
    registrationFee: "",
    securityMoney: "",
  });

  /* ---------------- INPUT CHANGE ---------------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  /* ---------------- SESSION / CLASS CHANGE ---------------- */
  const handleSessionClassChange = async (e) => {
    const { name, value } = e.target;
    const updatedForm = { ...formData, [name]: value };
    setFormData(updatedForm);

    if (!updatedForm.session || !updatedForm.standard) return;

    try {
      const res = await axios.get(
        "http://localhost:8080/api/admission-fee/get",
        {
          params: {
            schoolId: user.schoolId,
            session: updatedForm.session,
            standard: updatedForm.standard,
          },
        }
      );

      if (res.data) {
        setFormData(res.data); // ✅ LOAD DATA FROM DB
      } else {
        resetFeeFields(updatedForm);
      }

    } catch (error) {
      resetFeeFields(updatedForm);
    }
  };

  /* ---------------- RESET FIELDS ---------------- */
  const resetFeeFields = (updatedForm) => {
    setFormData({
      ...updatedForm,
      annualCharges: "",
      examCharges: "",
      tuitionFee: "",
      sportsFee: "",
      photoCardFee: "",
      libraryLabFee: "",
      transportFee: "",
      miscCharges: "",
      registrationFee: "",
      securityMoney: "",
    });
  };

  /* ---------------- SUBMIT ---------------- */
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(
        `http://localhost:8080/api/admission-fee/save?schoolId=${user.schoolId}`,
        formData
      );

      alert("Admission Fee Saved Successfully ✅");

    } catch (error) {
      alert("Error saving fee ❌");
      console.error(error);
    }
  };

  /* ---------------- UI ---------------- */
  return (
    <>
      <div className="row shadow-lg bg-white m-2 p-3 rounded">
        <h6><strong>Admission Fee Setup Classwise</strong></h6>
      </div>

      <div className="ms-2 mt-4 me-2 bg-white rounded p-3">
        <h6>Fee Generate For Admission</h6>

        <form onSubmit={handleSubmit}>
          {/* Session & Standard */}
          <div className="row">
            <div className="col-md-3">
              <label>Academic Session</label>
              <select
                name="session"
                value={formData.session}
                onChange={handleSessionClassChange}
                className="w-100 p-2 rounded mt-1"
                required
              >
                <option value="">Select</option>
                {sessions.map((item)=>(
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>

            <div className="col-md-3">
              <label>Standard</label>
              <select
                name="standard"
                value={formData.standard}
                onChange={handleSessionClassChange}
                className="w-100 p-2 rounded mt-1"
                required
              >
                <option value="">Select</option>
                {standards.map((item)=>(
                  <option key={item} value={item}>{item}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Fee Fields */}
           <div className="row mt-2" key={name}>
          {[
            ["annualCharges","Annual Charges"],
            ["examCharges","Examination Charges"],
            ["tuitionFee","Tuition Fee"],
            ["sportsFee","Sports Fee"],
            ["photoCardFee","Photo & I-Card"],
            ["libraryLabFee","Library & Lab"],
            ["transportFee","Transport Fee"],
            ["miscCharges","Misc Charges"],
            ["registrationFee","Registration Fee"],
            ["securityMoney","Security Money"],
          ].map(([name,label]) => (
           
              <div className="col-md-4" key={name}>
                <label>{label}</label>
                <input
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  className="w-100 p-2 rounded mt-1"
                  required
                />
              </div>
            
          ))}
</div>
          <button className="btn btn-success mt-4">Save Fee</button>
        </form>
      </div>
    </>
  );
};

export default Admission_Fee_Setup;


// import React, { useState } from "react";
// import axios from "axios";

// const Admission_Fee_Setup = () => {

//   const user = JSON.parse(localStorage.getItem("user")); 

//   const [formData, setFormData] = useState({
//     session: "",
//     standard: "",

//     feeBatch: "General",
//     feeCategory: "Private",
//     transportRequired: "No",
//     distanceRange: "",

//     annualCharges: "",
//     examCharges: "",
//     tuitionFee: "",
//     sportsFee: "",
//     photoCardFee: "",
//     libraryLabFee: "",
//     transportFee: "",
//     miscCharges: "",
//     registrationFee: "",
//     securityMoney: "",
//   });

//   /* ---------------- INPUT CHANGE ---------------- */
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     let updated = { ...formData, [name]: value };

//     /* ---------- TRANSPORT LOGIC ---------- */
//     if (
//       updated.transportRequired === "No" &&
//       updated.feeBatch === "General" &&
//       updated.feeCategory === "Private"
//     ) {
//       updated.transportFee = 0;
//       updated.distanceRange = "";
//     }

//     if (name === "distanceRange" && updated.transportRequired === "Yes") {
//       if (value === "UPTO_5") updated.transportFee = 500;
//       if (value === "UPTO_10") updated.transportFee = 800;
//       if (value === "ABOVE_10") updated.transportFee = 1200;
//     }

//     setFormData(updated);
//   };

//   /* ---------------- SUBMIT ---------------- */
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.post(
//         `http://localhost:8080/api/admission-fee/save?schoolId=${user.schoolId}`,
//         formData
//       );
//       alert("Admission Fee Saved Successfully ✅");
//     } catch (error) {
//       alert("Error saving fee ❌");
//       console.error(error);
//     }
//   };

//   return (
//     <>
//       <div className="row shadow-lg bg-white m-2 p-3 rounded">
//         <h6><strong>Admission Fee Setup Classwise</strong></h6>
//       </div>

//       <div className="ms-2 mt-4 me-2 bg-white rounded p-3">
//         <h6>Fee Generate For Admission</h6>

//         <form onSubmit={handleSubmit}>

//           {/* SESSION & STANDARD */}
//           <div className="row">
//             <div className="col-md-3">
//               <label>Academic Session</label>
//               <select name="session" className="form-select" required
//                 value={formData.session} onChange={handleChange}>
//                 <option value="">Select</option>
//                 <option value="2025-26">2025-26</option>
//                 <option value="2024-25">2024-25</option>
//               </select>
//             </div>

//             <div className="col-md-3">
//               <label>Standard</label>
//               <select name="standard" className="form-select" required
//                 value={formData.standard} onChange={handleChange}>
//                 <option value="">Select</option>
//                 {["Nursery","LKG","UKG","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"]
//                   .map(std => <option key={std}>{std}</option>)}
//               </select>
//             </div>
//           </div>

//           {/* TRANSPORT CONTROLS */}
//           <div className="row mt-3">
//             <div className="col-md-3">
//               <label>Fee Batch</label>
//               <select name="feeBatch" className="form-select"
//                 value={formData.feeBatch} onChange={handleChange}>
//                 <option value="General">General</option>
//                 <option value="Other">Other</option>
//               </select>
//             </div>

//             <div className="col-md-3">
//               <label>Fee Category</label>
//               <select name="feeCategory" className="form-select"
//                 value={formData.feeCategory} onChange={handleChange}>
//                 <option value="Private">Private</option>
//                 <option value="Govt">Govt</option>
//               </select>
//             </div>

//             <div className="col-md-3">
//               <label>Transport Required</label>
//               <select name="transportRequired" className="form-select"
//                 value={formData.transportRequired} onChange={handleChange}>
//                 <option value="No">No</option>
//                 <option value="Yes">Yes</option>
//               </select>
//             </div>

//             {formData.transportRequired === "Yes" && (
//               <div className="col-md-3">
//                 <label>Distance</label>
//                 <select name="distanceRange" className="form-select"
//                   value={formData.distanceRange} onChange={handleChange} required>
//                   <option value="">Select</option>
//                   <option value="UPTO_5">Up to 5 KM</option>
//                   <option value="UPTO_10">Up to 10 KM</option>
//                   <option value="ABOVE_10">Above 10 KM</option>
//                 </select>
//               </div>
//             )}
//           </div>

//           {/* FEES */}
//           {[
//             ["annualCharges","Annual Charges"],
//             ["examCharges","Examination Charges"],
//             ["tuitionFee","Tuition Fee"],
//             ["sportsFee","Sports Fee"],
//             ["photoCardFee","Photo & I-Card"],
//             ["libraryLabFee","Library & Lab"],
//             ["transportFee","Transport Fee"],
//             ["miscCharges","Misc Charges"],
//             ["registrationFee","Registration Fee"],
//             ["securityMoney","Security Money"],
//           ].map(([name,label]) => (
//             <div className="row mt-2" key={name}>
//               <div className="col-md-4">
//                 <label>{label}</label>
//                 <input
//                   name={name}
//                   value={formData[name]}
//                   onChange={handleChange}
//                   className="form-control"
//                   disabled={
//                     name === "transportFee" &&
//                     formData.transportRequired === "No"
//                   }
//                 />
//               </div>
//             </div>
//           ))}

//           <button className="btn btn-success mt-4">Save Fee</button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Admission_Fee_Setup;

// import React, { useState } from "react";
// import axios from "axios";

// const Admission_Fee_Setup = () => {

//   const user = JSON.parse(localStorage.getItem("user"));

//   const [errors, setErrors] = useState({});

//   const [formData, setFormData] = useState({
//     session: "",
//     standard: "",

//     transportRequired: "NO",
//     feeBatch: "GENERAL",
//     feeCategory: "PRIVATE",
//     transportDistance: "",

//     annualCharges: "",
//     examCharges: "",
//     tuitionFee: "",
//     sportsFee: "",
//     photoCardFee: "",
//     libraryLabFee: "",
//     transportFee: "",
//     miscCharges: "",
//     registrationFee: "",
//     securityMoney: "",
//   });

//   /* ---------------- HANDLE CHANGE ---------------- */
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));

//     setErrors(prev => ({ ...prev, [name]: "" }));
//   };

//   /* ---------------- SESSION / CLASS CHANGE ---------------- */
//   const handleSessionClassChange = async (e) => {
//     const { name, value } = e.target;
//     const updatedForm = { ...formData, [name]: value };
//     setFormData(updatedForm);

//     if (!updatedForm.session || !updatedForm.standard) return;

//     try {
//       const res = await axios.get(
//         "http://localhost:8080/api/admission-fee/get",
//         {
//           params: {
//             schoolId: user.schoolId,
//             session: updatedForm.session,
//             standard: updatedForm.standard,
//           },
//         }
//       );

//       if (res.data) {
//         setFormData(res.data);
//       }
//     } catch (err) {
//       console.log("No existing fee found");
//     }
//   };

//   /* ---------------- VALIDATION ---------------- */
//   const validate = () => {
//     const newErrors = {};

//     if (!formData.session) newErrors.session = "Session is required";
//     if (!formData.standard) newErrors.standard = "Standard is required";

//     if (
//       formData.transportRequired === "YES" &&
//       !formData.transportDistance
//     ) {
//       newErrors.transportDistance = "Transport distance is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   /* ---------------- SUBMIT ---------------- */
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) return;

//     try {
//       await axios.post(
//         `http://localhost:8080/api/admission-fee/save?schoolId=${user.schoolId}`,
//         formData
//       );
//       alert("Admission Fee Saved Successfully ✅");
//     } catch (error) {
//       alert(error.response?.data?.message || "Error saving fee ❌");
//     }
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <>
//       <div className="row shadow-lg bg-white m-2 p-3 rounded">
//         <h6><strong>Admission Fee Setup Classwise</strong></h6>
//       </div>

//       <div className="ms-2 mt-4 me-2 bg-white rounded p-3">
//         <h6>Fee Generate For Admission</h6>

//         <form onSubmit={handleSubmit}>

//           {/* SESSION & STANDARD */}
//           <div className="row">
//             <div className="col-md-3">
//               <label>Academic Session</label>
//               <select
//                 name="session"
//                 value={formData.session}
//                 onChange={handleSessionClassChange}
//                 className="w-100 p-2 rounded mt-1"
//               >
//                 <option value="">Select</option>
//                 <option value="2025-26">2025-26</option>
//                 <option value="2024-25">2024-25</option>
//               </select>
//               <small className="text-danger">{errors.session}</small>
//             </div>

//             <div className="col-md-3">
//               <label>Standard</label>
//               <select
//                 name="standard"
//                 value={formData.standard}
//                 onChange={handleSessionClassChange}
//                 className="w-100 p-2 rounded mt-1"
//               >
//                 <option value="">Select</option>
//                 {["Nursery","LKG","UKG","I","II","III","IV","V","VI","VII","VIII","IX","X","XI","XII"]
//                   .map(std => (
//                     <option key={std} value={std}>{std}</option>
//                   ))}
//               </select>
//               <small className="text-danger">{errors.standard}</small>
//             </div>
//           </div>

//           {/* TRANSPORT + BATCH + CATEGORY */}
//           <div className="row mt-3">
//             <div className="col-md-3">
//               <label>Transport Required</label>
//               <select
//                 name="transportRequired"
//                 value={formData.transportRequired}
//                 onChange={handleChange}
//                 className="w-100 p-2 rounded mt-1"
//               >
//                 <option value="NO">No</option>
//                 <option value="YES">Yes</option>
//               </select>
//             </div>

//             <div className="col-md-3">
//               <label>Fee Batch</label>
//               <select
//                 name="feeBatch"
//                 value={formData.feeBatch}
//                 onChange={handleChange}
//                 className="w-100 p-2 rounded mt-1"
//               >
//                 <option value="GENERAL">General</option>
//                 <option value="OTHER">Other</option>
//               </select>
//             </div>

//             <div className="col-md-3">
//               <label>Fee Category</label>
//               <select
//                 name="feeCategory"
//                 value={formData.feeCategory}
//                 onChange={handleChange}
//                 className="w-100 p-2 rounded mt-1"
//               >
//                 <option value="PRIVATE">Private</option>
//                 <option value="GOVT">Govt</option>
//               </select>
//             </div>
//           </div>

//           {/* TRANSPORT DISTANCE */}
//           {formData.transportRequired === "YES" && (
//             <div className="row mt-3">
//               <div className="col-md-3">
//                 <label>Transport Distance</label>
//                 <select
//                   name="transportDistance"
//                   value={formData.transportDistance}
//                   onChange={handleChange}
//                   className="w-100 p-2 rounded mt-1"
//                 >
//                   <option value="">Select</option>
//                   <option value="UPTO_5KM">Upto 5 KM</option>
//                   <option value="UPTO_10KM">Upto 10 KM</option>
//                   <option value="ABOVE_10KM">Above 10 KM</option>
//                 </select>
//                 <small className="text-danger">{errors.transportDistance}</small>
//               </div>
//             </div>
//           )}

//           {/* FEES */}
//           {[
//             ["annualCharges","Annual Charges"],
//             ["examCharges","Examination Charges"],
//             ["tuitionFee","Tuition Fee"],
//             ["sportsFee","Sports Fee"],
//             ["photoCardFee","Photo & I-Card"],
//             ["libraryLabFee","Library & Lab"],
//             ["miscCharges","Misc Charges"],
//             ["registrationFee","Registration Fee"],
//             ["securityMoney","Security Money"],
//           ].map(([name,label]) => (
//             <div className="row mt-2" key={name}>
//               <div className="col-md-4">
//                 <label>{label}</label>
//                 <input
//                   name={name}
//                   value={formData[name]}
//                   onChange={handleChange}
//                   className="w-100 p-2 rounded mt-1"
//                 />
//               </div>
//             </div>
//           ))}

//           <button className="btn btn-success mt-4">
//             Save Fee
//           </button>
//         </form>
//       </div>
//     </>
//   );
// };

// export default Admission_Fee_Setup;
