import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SchoolAddForm = () => {
  // const [form, setForm] = useState({
  //   schoolName: "",
  //   schoolCode: "",
  //   address: "",
  //   email: "",
  //   academicYear: "",
  //   phone: "",
  //   year: "",
  //   principal: "",
  //   status: "Active",
  // });

  const [form, setForm] = useState({
  // School Details
  schoolName: "",
  schoolCode: "",
  schoolType: "",
  registrationNumber: "",
  affiliationBoard: "",
  establishedYear: "",
  academicYear: "",
  gstNumber: "",
  schoolLogo: null,

  // Contact Details
  principalName: "",
  contactPerson: "",
  mobileNo: "",
  alternateNo: "",
  email: "",
  website: "",
  address: "",
  city: "",
  state: "",
  country: "India",
  pincode: "",

  // Subscription Details
  subscriptionPlan: "",
  subscriptionType: "",
  startDate: "",
  endDate: "",
  trialStartDate: "",
  trialEndDate: "",
  renewalDate: "",
  subscriptionStatus: "Active",
  paymentStatus: "Pending",
  invoiceNumber: "",
  amount: 0,

  // Resource Limits
  maxStudents: 0,
  maxTeachers: 0,
  maxAdmins: 0,
  storageLimit: 0,
  smsCredits: 0,
  whatsappCredits: 0,
});

const PLAN_PRICES = {
  Basic: 2000,
  Standard: 3500,
  Premium: 5000,
};

const PLAN_LIMITS = {
  Basic: {
    maxStudents: 500,
    maxTeachers: 20,
    maxAdmins: 2,
    storageLimit: 10,
    smsCredits: 1000,
    whatsappCredits: 500,
  },

  Standard: {
    maxStudents: 1500,
    maxTeachers: 75,
    maxAdmins: 5,
    storageLimit: 50,
    smsCredits: 5000,
    whatsappCredits: 2500,
  },

  Premium: {
    maxStudents: 5000,
    maxTeachers: 200,
    maxAdmins: 10,
    storageLimit: 200,
    smsCredits: 20000,
    whatsappCredits: 10000,
  },
};
const calculateAmount = (plan, type) => {
  const monthlyPrice = PLAN_PRICES[plan] || 0;

  switch (type) {
    case "Monthly":
      return monthlyPrice;

    case "Quarterly":
      return monthlyPrice * 3;

    case "Annually":
      return monthlyPrice * 12;

    default:
      return 0;
  }
};
const calculateEndDate = (startDate, type) => {
  if (!startDate) return "";

  const date = new Date(startDate);

  switch (type) {
    case "Monthly":
      date.setMonth(date.getMonth() + 1);
      break;

    case "Quarterly":
      date.setMonth(date.getMonth() + 3);
      break;

    case "Annually":
      date.setFullYear(date.getFullYear() + 1);
      break;

    default:
      break;
  }

  return date.toISOString().split("T")[0];
};

const handleChange = (e) => {
  const { name, value, files } = e.target;

  let updatedForm = {
    ...form,
    [name]: files ? files[0] : value,
  };

  const selectedPlan =
    name === "subscriptionPlan"
      ? value
      : updatedForm.subscriptionPlan;

  const selectedType =
    name === "subscriptionType"
      ? value
      : updatedForm.subscriptionType;

  if (
    name === "subscriptionPlan" ||
    name === "subscriptionType"
  ) {
    updatedForm.amount = calculateAmount(
      selectedPlan,
      selectedType
    );

    if (PLAN_LIMITS[selectedPlan]) {
      updatedForm = {
        ...updatedForm,
        ...PLAN_LIMITS[selectedPlan],
      };
    }
  }

  if (
    name === "startDate" ||
    name === "subscriptionType"
  ) {
    const startDate =
      name === "startDate"
        ? value
        : updatedForm.startDate;

    updatedForm.endDate = calculateEndDate(
      startDate,
      selectedType
    );

    updatedForm.renewalDate =
      updatedForm.endDate;
  }

  setForm(updatedForm);
};
const saveSchool = async () => {
  try {
    const token = localStorage.getItem("token");

    const formData = new FormData();

    Object.keys(form).forEach((key) => {
      if (form[key] !== null) {
        formData.append(key, form[key]);
      }
    });

    await axios.post(
      "http://localhost:8080/api/school/add",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    alert("School Created Successfully");
    navigate(-1);
  } catch (error) {
    console.error(error);
    alert("Failed to create school");
  }
};
  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };

  // const saveSchool = async () => {
  //   try {
  //     const token = localStorage.getItem("token");
  //     if (!token) {
  //       alert("You are not logged in!");
  //       return;
  //     }

  //     // Create FormData if you are uploading a logo, or send JSON for only text
  //     const response = await axios.post(
  //       "http://localhost:8080/api/school/add",
  //       form, // or formData if you have a file
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           "Content-Type": "application/json", // or multipart/form-data if file
  //         },
  //       },
  //     );

  //     alert("School added successfully!");
  //   } catch (error) {
  //     console.error("Error adding school:", error.response || error);
  //     if (error.response && error.response.status === 403) {
  //       alert("You do not have permission to add a school (Admin only).");
  //     } else if (error.response && error.response.status === 401) {
  //       alert("Invalid or expired token. Please login again.");
  //     } else {
  //       alert("Failed to add school. Check console for details.");
  //     }
  //   }
  // };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <>
      {/* ---------- HEADER ---------- */}
      <div
        className="row shadow"
        style={{
          // backgroundColor: "white",
          background:
            "linear-gradient(135deg, rgb(61, 87, 236) 0%, rgb(97, 150, 248) 50%, #87ddf7 100%)",
          margin: "10px",
          height: "67px",
          borderRadius: "5px",
          padding: "10px",
          color: "black",
        }}
      >
        <h6>
          <strong>Create Accounts</strong>
        </h6>
        <nav aria-label="breadcrumb py-2">
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/" style={{ textDecoration: "none", color: "black" }}>
                Home
              </a>
            </li>
            <li className="breadcrumb-item">
              <a href="#" style={{ textDecoration: "none", color: "black" }}>
                School Creation
              </a>
            </li>
          </ol>
        </nav>
      </div>

      <div className="border p-4 rounded shadow mx-2 mt-4">
        <h5>Add New School</h5>

        <div
          className="row mt-3 text-center  text-white rounded"
          style={{ backgroundColor: "rgb(30, 58, 138)" }}
        >
          <h5>School Details</h5>
        </div>

        <div className="row mt-3">
          <div className="col-md-4">
            <label>School Name</label>
            <input
              type="text"
              className="form-control"
              name="schoolName"
              value={form.schoolName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label>School Code</label>
            <input
              type="text"
              className="form-control"
              name="schoolCode"
              value={form.schoolCode}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label>School Type</label>
            <input
              type="text"
              className="form-control"
              name="schoolType"
              value={form.schoolType}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-4">
            <label>Registration Number</label>
            <input
              type="text"
              className="form-control"
              name="registrationNumber"
              value={form.registrationNumber}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label>Affiliation Board</label>
            <input
              type="text"
              className="form-control"
              name="affiliationBoard"
              value={form.affiliationBoard}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label>Established Year</label>
            <input
              type="text"
              className="form-control"
              name="establishedYear"
              value={form.establishedYear}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Contact Details Fields  */}
        <div
          className="row mt-3 text-center  text-white rounded"
          style={{ backgroundColor: "rgb(30, 58, 138)" }}
        >
          <h5>Contacts Details</h5>
        </div>

        <div className="row mt-3">
          <div className="col-md-4">
            <label>Principal Name</label>
            <input
              type="text"
              className="form-control"
              name="principalName"
              value={form.principalName}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label>Contact Person Name</label>
            <input
              type="text"
              className="form-control"
              name="contactPerson"
              value={form.contactPerson}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label>Mobile No</label>
            <input
              type="text"
              className="form-control"
              name="mobileNo"
              value={form.mobileNo}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-4">
            <label>Alternate Mobile No</label>
            <input
              type="text"
              className="form-control"
              name="alternateNo"
              value={form.alternateNo}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label>Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={form.email}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label>Address</label>
            <input
              type="text"
              className="form-control"
              name="address"
              value={form.address}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mt-3">
          <div className="col-md-4">
            <label>City</label>
            <input
              type="text"
              className="form-control"
              name="city"
              value={form.city}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label>State</label>
            <input
              type="text"
              className="form-control"
              name="State"
              value={form.State}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-4">
            <label>Country</label>
            <input
              type="text"
              className="form-control"
              name="Country"
              value={form.Country}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-4">
            <label>Pincode</label>
            <input
              type="text"
              className="form-control"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
            />
          </div>
        </div>

        {/* Subscription Details  */}
        <div
          className="row mt-3 text-center  text-white rounded"
          style={{ backgroundColor: "rgb(30, 58, 138)" }}
        >
          <h5>Subscriptions Details</h5>
        </div>

        <div className="row mt-3">
          {/* <div className="col-md-3">
            <label>Subscription Plan Name</label>
            <input
              type="text"
              className="form-control"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label>Subscription Type</label>
            <input
              type="text"
              className="form-control"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <label>Start Date</label>
            <input
              type="text"
              className="form-control"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <label>End Date</label>
            <input
              type="text"
              className="form-control"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
            />
          </div> */}
          <div className="col-md-3">
  <label>Plan</label>
  <select
    className="form-control"
    name="subscriptionPlan"
    value={form.subscriptionPlan}
    onChange={handleChange}
  >
    <option value="">Select</option>
    <option value="Basic">Basic</option>
    <option value="Standard">Standard</option>
    <option value="Premium">Premium</option>
  </select>
</div>

<div className="col-md-3">
  <label>Type</label>
  <select
    className="form-control"
    name="subscriptionType"
    value={form.subscriptionType}
    onChange={handleChange}
  >
    <option value="">Select</option>
    <option value="Monthly">Monthly</option>
    <option value="Quarterly">Quarterly</option>
    <option value="Annually">Annually</option>
  </select>
</div>

<div className="col-md-3">
  <label>Amount</label>
  <input
    className="form-control"
    value={form.amount}
    readOnly
  />
</div>
        </div>

        <div className="row mt-3">
          <div className="col-md-3">
            <label>Trial Start Date</label>
            <input
              type="text"
              className="form-control"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
            />
          </div>

          <div className="col-md-3">
            <label>Trial End Date</label>
            <input
              type="text"
              className="form-control"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label>Subscription Status</label>
            <input
              type="text"
              className="form-control"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-3">
            <label>Renewal Date</label>
            <input
              type="text"
              className="form-control"
              name="pincode"
              value={form.pincode}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="row mt-3">
  <div className="col-md-2">
    <label>Students</label>
    <input
      className="form-control"
      value={form.maxStudents}
      readOnly
    />
  </div>

  <div className="col-md-2">
    <label>Teachers</label>
    <input
      className="form-control"
      value={form.maxTeachers}
      readOnly
    />
  </div>

  <div className="col-md-2">
    <label>Admins</label>
    <input
      className="form-control"
      value={form.maxAdmins}
      readOnly
    />
  </div>

  <div className="col-md-2">
    <label>Storage (GB)</label>
    <input
      className="form-control"
      value={form.storageLimit}
      readOnly
    />
  </div>

  <div className="col-md-2">
    <label>SMS</label>
    <input
      className="form-control"
      value={form.smsCredits}
      readOnly
    />
  </div>

  <div className="col-md-2">
    <label>WhatsApp</label>
    <input
      className="form-control"
      value={form.whatsappCredits}
      readOnly
    />
  </div>
</div>

        <div className="mt-4 d-flex">
          <button className="btn btn-success me-2" onClick={saveSchool}>
            Create School
          </button>
          <button className="btn btn-danger" onClick={handleBack}>
            Cancel
          </button>
        </div>
      </div>
    </>
  );
};

export default SchoolAddForm;
