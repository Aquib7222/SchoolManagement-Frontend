// import { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import axiosInstance from "../../api/axiosInstance";

// const EditTeacher = () => {
//   const { employeeId } = useParams(); // EMP1001
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));
//   const schoolId = user?.school?.id;
//   const token = localStorage.getItem("token");

//   const [formData, setFormData] = useState({});
//   const [teacherDbId, setTeacherDbId] = useState(null); // IMPORTANT
//   const [loading, setLoading] = useState(true);

//   // ================= FETCH TEACHER =================
//   useEffect(() => {
//     if (!employeeId || !schoolId || !token) return;

//     const fetchTeacher = async () => {
//       try {
//         const res = await axiosInstance.get(
//           "/api/teachers/search",
//           {
//             params: { employeeId, schoolId },
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );

//         setFormData(res.data);
//         setTeacherDbId(res.data.id); // DB id for PUT
//         setLoading(false);
//       } catch (err) {
//         console.error(err);
//         alert("Failed to fetch teacher");
//         setLoading(false);
//       }
//     };

//     fetchTeacher();
//   }, [employeeId, schoolId, token]);

//   // ================= HANDLE CHANGE =================
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ================= IMAGE UPLOAD =================
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (event) => {
//       setFormData((prev) => ({ ...prev, photo: event.target.result }));
//     };
//     reader.readAsDataURL(file);
//   };

//   // ================= UPDATE =================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       await axios.put(
//         `/api/teachers/${teacherDbId}`,
//         formData,
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       alert("Teacher updated successfully");
//       navigate(-1);
//     } catch (err) {
//       console.error(err);
//       alert("Update failed");
//     }
//   };

//   if (loading) return <div>Loading teacher data...</div>;

//   return (
//     <form onSubmit={handleSubmit} className="ms-2 me-2 rounded bg-white p-3">
//       <h4>Edit Teacher</h4>

//       <div className="row">
//         <div className="col-md-3">
//           <label>First Name</label>
//           <input
//             name="firstName"
//             value={formData.firstName || ""}
//             onChange={handleChange}
//             className="w-100 p-2"
//           />
//         </div>

//         <div className="col-md-3">
//           <label>Last Name</label>
//           <input
//             name="lastName"
//             value={formData.lastName || ""}
//             onChange={handleChange}
//             className="w-100 p-2"
//           />
//         </div>

//         <div className="col-md-3">
//           <label>Employee ID</label>
//           <input
//             value={formData.employeeId || ""}
//             readOnly
//             className="w-100 p-2 bg-light"
//           />
//         </div>

//         <div className="col-md-3">
//           <label>Status</label>
//           <select
//             name="status"
//             value={formData.status || ""}
//             onChange={handleChange}
//             className="w-100 p-2"
//           >
//             <option value="">Select</option>
//             <option value="Working">Working</option>
//             <option value="Resign">Resign</option>
//           </select>
//         </div>
//       </div>

//       <div className="row mt-3">
//         <div className="col-md-3">
//           <label>Upload Photo</label>
//           <input type="file" onChange={handleImageUpload} />
//           {formData.photo && (
//             <img src={formData.photo} alt="" width="100" />
//           )}
//         </div>
//       </div>

//       <button className="btn btn-primary mt-3">Update</button>
//     </form>
//   );
// };

// export default EditTeacher;

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosInstance from "../../api/axiosInstance";

const EditTeacher = () => {

  const { employeeId } = useParams();
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const schoolId = user?.school?.id;
  const token = localStorage.getItem("token");


  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);


  // ================= FETCH TEACHER =================

  useEffect(() => {

    if (!employeeId || !schoolId || !token) return;


    const fetchTeacher = async () => {

      try {

        const res = await axiosInstance.get(
          "/api/teachers/search",
          {
            params:{
              employeeId: employeeId,
              schoolId: schoolId
            },
            headers:{
              Authorization:`Bearer ${token}`
            }
          }
        );


        setFormData(res.data);
        setLoading(false);


      } catch(err){

        console.error(err);
        alert("Failed to fetch teacher");
        setLoading(false);

      }

    };


    fetchTeacher();


  },[employeeId, schoolId, token]);





  // ================= HANDLE CHANGE =================

  const handleChange = (e)=>{

    const {name,value}=e.target;

    setFormData((prev)=>({
      ...prev,
      [name]:value
    }));

  };





  // ================= IMAGE UPLOAD =================

  const handleImageUpload = (e)=>{

    const file=e.target.files[0];

    if(!file) return;


    const reader=new FileReader();


    reader.onload=(event)=>{

      setFormData((prev)=>({
        ...prev,
        photo:event.target.result
      }));

    };


    reader.readAsDataURL(file);

  };






  // ================= UPDATE TEACHER =================

  const handleSubmit = async(e)=>{

    e.preventDefault();


    try{


      await axiosInstance.put(
        `/api/teachers/${employeeId}`,
        formData,
        {
          params:{
            schoolId:schoolId
          },
          headers:{
            Authorization:`Bearer ${token}`,
            "Content-Type":"application/json"
          }
        }
      );



      alert("Teacher updated successfully");

      navigate(-1);



    }catch(err){

      console.error(err);
      alert("Update failed");

    }

  };






  if(loading)
    return <div>Loading teacher data...</div>;





  return (

    <form
      onSubmit={handleSubmit}
      className="ms-2 me-2 rounded bg-white p-3 shadow"
    >


      <h4 className="mb-4">
        Edit Teacher
      </h4>



      <div className="row">


        <div className="col-md-3">

          <label>
            First Name
          </label>

          <input
            type="text"
            name="firstName"
            value={formData.firstName || ""}
            onChange={handleChange}
            className="form-control"
          />

        </div>





        <div className="col-md-3">

          <label>
            Last Name
          </label>

          <input
            type="text"
            name="lastName"
            value={formData.lastName || ""}
            onChange={handleChange}
            className="form-control"
          />

        </div>





        <div className="col-md-3">

          <label>
            Employee ID
          </label>

          <input
            type="text"
            value={formData.employeeId || ""}
            readOnly
            className="form-control bg-light"
          />

        </div>






        <div className="col-md-3">

          <label>
            Status
          </label>


          <select
            name="status"
            value={formData.status || ""}
            onChange={handleChange}
            className="form-control"
          >

            <option value="">
              Select
            </option>

            <option value="Working">
              Working
            </option>

            <option value="Resign">
              Resign
            </option>


          </select>


        </div>


      </div>





      <div className="row mt-3">


        <div className="col-md-3">


          <label>
            Upload Photo
          </label>


          <input
            type="file"
            className="form-control"
            onChange={handleImageUpload}
          />



          {
            formData.photo &&
            <img
              src={formData.photo}
              alt="Teacher"
              className="mt-2 rounded"
              width="100"
              height="100"
            />
          }


        </div>


      </div>





      <button
        type="submit"
        className="btn btn-primary mt-4"
      >
        Update Teacher
      </button>



    </form>

  );

};


export default EditTeacher;