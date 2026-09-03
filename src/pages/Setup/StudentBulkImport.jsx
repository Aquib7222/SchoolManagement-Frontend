
import React, { useMemo, useState } from "react";
import * as XLSX from "xlsx";

import {
  LuUpload,
  LuFileSpreadsheet,
  LuDownload,
  LuTrash2,
  LuCheck,
  LuX,
  LuUsers,
  LuCircleAlert,
  LuLoader,
  LuRefreshCw,
} from "react-icons/lu";

import { MdOutlineSchool } from "react-icons/md";
import { FaUser } from "react-icons/fa";

import axiosInstance from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";


const StudentBulkImport = () => {

  const user = JSON.parse(
    localStorage.getItem("user") || "{}"
  );

  const schoolId = user?.schoolId;

  const {
    sessions,
    standards,
    sections
  } = useMasters();


  // =========================================================
  // STATE
  // =========================================================

  const [academicYear, setAcademicYear] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");

  const [selectedFile, setSelectedFile] = useState(null);

  const [students, setStudents] = useState([]);

  const [isDragging, setIsDragging] = useState(false);

  const [isReading, setIsReading] = useState(false);

  const [isImporting, setIsImporting] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [search, setSearch] = useState("");


  // =========================================================
  // EXCEL HEADERS
  // EXACTLY MATCHES BACKEND DTO
  // =========================================================

  const headers = [
    "Admission Number",

    "First Name",
    "Middle Name",
    "Last Name",

    "Date of Birth",
    "Gender",
    "Age",

    "Blood Group",
    "Nationality",
    "Mother Tongue",
    "Religion",
    "Category",
    "Caste",

    "Father Name",
    "Father Mobile",
    "Father Email",
    "Father Occupation",

    "Mother Name",
    "Mother Mobile",
    "Mother Email",
    "Mother Occupation",

    "Mobile",
    "Student Email",

    "Transport Required",

    "Fee Category",
    "Fee Batch",

    "House No",
    "Street",
    "Area",
    "Town",
    "City",
    "State",
    "Country",
    "ZIP",

    "Roll Number",
  ];


  // =========================================================
  // DOWNLOAD TEMPLATE
  // =========================================================

  const downloadTemplate = () => {

    setError("");
    setSuccess("");


    if (!academicYear) {
      setError("Please select academic year first.");
      return;
    }

    if (!studentClass) {
      setError("Please select class first.");
      return;
    }

    if (!section) {
      setError("Please select section first.");
      return;
    }


    // =======================================================
    // SAMPLE ROW
    // =======================================================

    const sampleRow = [

      "ADM00001",

      "Rahul",
      "",
      "Kumar",

      "12-05-2017",
      "Male",
      "9",

      "B+",
      "Indian",
      "Hindi",
      "Hindu",
      "General",
      "",

      "Raj Kumar",
      "9876543210",
      "raj.kumar@example.com",
      "Business",

      "Pooja Devi",
      "9876543211",
      "pooja.devi@example.com",
      "Teacher",

      "9876543212",
      "rahul@example.com",

      "No",

      "",
      "",

      "12",
      "Main Road",
      "Hathauri",
      "",
      "Siwan",
      "Bihar",
      "India",
      "841226",

      "1",
    ];


    // =======================================================
    // STUDENT SHEET
    // =======================================================

    const studentData = [
      headers,
      sampleRow
    ];


    const studentSheet =
      XLSX.utils.aoa_to_sheet(studentData);


    studentSheet["!cols"] =
      headers.map((header) => ({
        wch: Math.max(
          header.length + 3,
          18
        ),
      }));


    studentSheet["!freeze"] = {
      xSplit: 0,
      ySplit: 1,
    };


    // =======================================================
    // INSTRUCTIONS
    // =======================================================

    const instructions = [

      [
        "ZYNTaks Education - Student Bulk Import"
      ],

      [],

      [
        "Selected Academic Year",
        academicYear
      ],

      [
        "Selected Class",
        studentClass
      ],

      [
        "Selected Section",
        section
      ],

      [],

      [
        "IMPORTANT INSTRUCTIONS"
      ],

      [
        "1",
        "Delete the sample row before uploading."
      ],

      [
        "2",
        "Do not change the Excel column headers."
      ],

      [
        "3",
        "Date of Birth should be DD-MM-YYYY."
      ],

      [
        "4",
        "Admission Number must be unique."
      ],

      [
        "5",
        "Student Mobile must contain 10 digits."
      ],

      [
        "6",
        "Father/Mother Mobile should contain 10 digits if provided."
      ],

      [
        "7",
        "Transport Required should be Yes or No."
      ],

      [
        "8",
        "Do not add School ID in Excel."
      ],

      [
        "9",
        "Academic Year, Class and Section are selected from this page."
      ],

      [
        "10",
        "Student login username will be Student Mobile."
      ],

      [
        "11",
        "Default student password will be FirstName@AdmissionNumber."
      ],

      [
        "12",
        "Student will be created with ACTIVE status."
      ],

      [
        "13",
        "Student account will be created with STUDENT role."
      ],

      [
        "14",
        "Maximum 500 students can be imported at once."
      ],

    ];


    const instructionSheet =
      XLSX.utils.aoa_to_sheet(
        instructions
      );


    instructionSheet["!cols"] = [
      { wch: 30 },
      { wch: 100 }
    ];


    // =======================================================
    // WORKBOOK
    // =======================================================

    const workbook =
      XLSX.utils.book_new();


    XLSX.utils.book_append_sheet(
      workbook,
      studentSheet,
      "Student Data"
    );


    XLSX.utils.book_append_sheet(
      workbook,
      instructionSheet,
      "Instructions"
    );


    const safeClass =
      studentClass.replace(
        /\s+/g,
        "_"
      );


    const fileName =
      `ZYNTaks_Student_Import_${safeClass}_${section}_${academicYear}.xlsx`;


    XLSX.writeFile(
      workbook,
      fileName
    );


    setSuccess(
      "Excel template downloaded successfully."
    );
  };


  // =========================================================
  // EXCEL DATE
  // =========================================================

  const formatExcelDate = (value) => {

    if (!value) {
      return "";
    }


    // Excel numeric date

    if (typeof value === "number") {

      const date =
        XLSX.SSF.parse_date_code(
          value
        );


      if (!date) {
        return "";
      }


      const day =
        String(date.d).padStart(
          2,
          "0"
        );


      const month =
        String(date.m).padStart(
          2,
          "0"
        );


      const year =
        date.y;


      return `${day}-${month}-${year}`;
    }


    return String(value).trim();
  };


  // =========================================================
  // INTEGER VALUE
  // =========================================================

  const parseInteger = (value) => {

    if (
      value === null ||
      value === undefined ||
      String(value).trim() === ""
    ) {
      return null;
    }


    const number =
      Number(value);


    if (
      Number.isNaN(number)
    ) {
      return null;
    }


    return Math.trunc(number);
  };


  // =========================================================
  // READ EXCEL
  // =========================================================

  const readExcelFile = (file) => {

    setError("");
    setSuccess("");
    setStudents([]);


    if (!file) {
      return;
    }


    const allowedExtensions = [
      ".xlsx",
      ".xls"
    ];


    const extension =
      file.name
        .substring(
          file.name.lastIndexOf(".")
        )
        .toLowerCase();


    if (
      !allowedExtensions.includes(
        extension
      )
    ) {

      setError(
        "Please upload a valid Excel file (.xlsx or .xls)."
      );

      return;
    }


    setSelectedFile(file);

    setIsReading(true);


    const reader =
      new FileReader();


    reader.onload = (event) => {

      try {

        const data =
          new Uint8Array(
            event.target.result
          );


        const workbook =
          XLSX.read(
            data,
            {
              type: "array",
              cellDates: false,
            }
          );


        const sheetName =
          workbook.SheetNames.find(
            (name) =>
              name
                .trim()
                .toLowerCase() ===
              "student data"
          ) ||
          workbook.SheetNames[0];


        if (!sheetName) {

          throw new Error(
            "No worksheet found in Excel file."
          );
        }


        const worksheet =
          workbook.Sheets[
            sheetName
          ];


        const rows =
          XLSX.utils.sheet_to_json(
            worksheet,
            {
              header: 1,
              defval: "",
              raw: true,
              blankrows: false,
            }
          );


        if (
          !rows ||
          rows.length < 2
        ) {

          throw new Error(
            "Excel file does not contain student data."
          );
        }


        // ===================================================
        // HEADERS
        // ===================================================

        const excelHeaders =
          rows[0].map(
            (header) =>
              String(header).trim()
          );


        const missingHeaders =
          headers.filter(
            (header) =>
              !excelHeaders.includes(
                header
              )
          );


        if (
          missingHeaders.length > 0
        ) {

          throw new Error(
            `Invalid Excel template. Missing columns: ${missingHeaders.join(", ")}`
          );
        }


        // ===================================================
        // HEADER INDEX
        // ===================================================

        const headerIndex = {};


        excelHeaders.forEach(
          (header, index) => {

            headerIndex[
              header
            ] = index;

          }
        );


        // ===================================================
        // PARSE STUDENTS
        // ===================================================

        const parsedStudents = [];


        rows
          .slice(1)
          .forEach(
            (row, index) => {

              const isEmptyRow =
                row.every(
                  (cell) =>
                    cell === null ||
                    cell === undefined ||
                    String(
                      cell
                    ).trim() === ""
                );


              if (isEmptyRow) {
                return;
              }


              const getValue =
                (header) => {

                  const value =
                    row[
                      headerIndex[
                        header
                      ]
                    ];


                  if (
                    value === null ||
                    value === undefined
                  ) {
                    return "";
                  }


                  return String(
                    value
                  ).trim();
                };


              const student = {

                excelRow:
                  index + 2,


                admissionNumber:
                  getValue(
                    "Admission Number"
                  ),


                firstName:
                  getValue(
                    "First Name"
                  ),


                middleName:
                  getValue(
                    "Middle Name"
                  ),


                lastName:
                  getValue(
                    "Last Name"
                  ),


                dateOfBirth:
                  formatExcelDate(
                    row[
                      headerIndex[
                        "Date of Birth"
                      ]
                    ]
                  ),


                gender:
                  getValue(
                    "Gender"
                  ),


                age:
                  getValue(
                    "Age"
                  ),


                bloodGroup:
                  getValue(
                    "Blood Group"
                  ),


                nationality:
                  getValue(
                    "Nationality"
                  ),


                motherTongue:
                  getValue(
                    "Mother Tongue"
                  ),


                religion:
                  getValue(
                    "Religion"
                  ),


                category:
                  getValue(
                    "Category"
                  ),


                caste:
                  getValue(
                    "Caste"
                  ),


                // Father

                fatherName:
                  getValue(
                    "Father Name"
                  ),

                fatherMobile:
                  getValue(
                    "Father Mobile"
                  ),

                fatherEmail:
                  getValue(
                    "Father Email"
                  ),

                fatherOccupation:
                  getValue(
                    "Father Occupation"
                  ),


                // Mother

                motherName:
                  getValue(
                    "Mother Name"
                  ),

                motherMobile:
                  getValue(
                    "Mother Mobile"
                  ),

                motherEmail:
                  getValue(
                    "Mother Email"
                  ),

                motherOccupation:
                  getValue(
                    "Mother Occupation"
                  ),


                // Student

                mobile:
                  getValue(
                    "Mobile"
                  ),

                studentEmail:
                  getValue(
                    "Student Email"
                  ),


                transportRequired:
                  getValue(
                    "Transport Required"
                  ),


                feeCategory:
                  getValue(
                    "Fee Category"
                  ),


                feeBatch:
                  getValue(
                    "Fee Batch"
                  ),


                // Address

                houseNo:
                  getValue(
                    "House No"
                  ),

                street:
                  getValue(
                    "Street"
                  ),

                area:
                  getValue(
                    "Area"
                  ),

                town:
                  getValue(
                    "Town"
                  ),

                city:
                  getValue(
                    "City"
                  ),

                state:
                  getValue(
                    "State"
                  ),

                country:
                  getValue(
                    "Country"
                  ),

                zip:
                  getValue(
                    "ZIP"
                  ),


                rollNumber:
                  parseInteger(
                    row[
                      headerIndex[
                        "Roll Number"
                      ]
                    ]
                  ),
              };


              parsedStudents.push(
                student
              );

            }
          );


        if (
          parsedStudents.length === 0
        ) {

          throw new Error(
            "No student records found in Excel."
          );
        }


        // Maximum 500

        if (
          parsedStudents.length > 500
        ) {

          throw new Error(
            "Maximum 500 students can be imported at once."
          );
        }


        setStudents(
          parsedStudents
        );


        setSuccess(
          `${parsedStudents.length} student record${
            parsedStudents.length > 1
              ? "s"
              : ""
          } loaded successfully.`
        );


      } catch (err) {

        console.error(
          "Excel read error:",
          err
        );


        setSelectedFile(null);

        setStudents([]);


        setError(
          err?.message ||
            "Unable to read Excel file."
        );

      } finally {

        setIsReading(false);

      }
    };


    reader.onerror = () => {

      setIsReading(false);

      setSelectedFile(null);

      setError(
        "Failed to read Excel file."
      );

    };


    reader.readAsArrayBuffer(
      file
    );
  };


  // =========================================================
  // FILE INPUT
  // =========================================================

  const handleFileChange = (
    event
  ) => {

    const file =
      event.target.files?.[0];


    if (file) {

      readExcelFile(file);

    }


    event.target.value = "";
  };


  // =========================================================
  // DRAG DROP
  // =========================================================

  const handleDrop = (
    event
  ) => {

    event.preventDefault();

    setIsDragging(false);


    const file =
      event.dataTransfer.files?.[0];


    if (file) {

      readExcelFile(file);

    }
  };


  // =========================================================
  // REMOVE FILE
  // =========================================================

  const removeFile = () => {

    setSelectedFile(null);

    setStudents([]);

    setError("");

    setSuccess("");

    setSearch("");
  };


  // =========================================================
  // VALIDATION
  // =========================================================

  const validateStudent = (
    student
  ) => {

    const errors = [];


    // Admission Number

    if (
      !student.admissionNumber
    ) {

      errors.push(
        "Admission Number required"
      );
    }


    // First Name

    if (
      !student.firstName
    ) {

      errors.push(
        "First Name required"
      );
    }


    // DOB

    if (
      !student.dateOfBirth
    ) {

      errors.push(
        "Date of Birth required"
      );
    }


    // Gender

    if (
      !student.gender
    ) {

      errors.push(
        "Gender required"
      );
    }


    // Student Mobile

    if (
      !student.mobile
    ) {

      errors.push(
        "mobile required"
      );

    } else if (
      !/^\d{10}$/.test(
        student.mobile
      )
    ) {

      errors.push(
        "Invalid mobile"
      );
    }


    // Father Mobile

    if (
      student.fatherMobile &&
      !/^\d{10}$/.test(
        student.fatherMobile
      )
    ) {

      errors.push(
        "Invalid Father Mobile"
      );
    }


    // Mother Mobile

    if (
      student.motherMobile &&
      !/^\d{10}$/.test(
        student.motherMobile
      )
    ) {

      errors.push(
        "Invalid Mother Mobile"
      );
    }


    // Transport

    if (
      student.transportRequired &&
      ![
        "YES",
        "NO"
      ].includes(
        student
          .transportRequired
          .toUpperCase()
      )
    ) {

      errors.push(
        "Transport Required must be Yes/No"
      );
    }


    // Roll number

    if (
      student.rollNumber !== null &&
      student.rollNumber < 0
    ) {

      errors.push(
        "Invalid Roll Number"
      );
    }


    return errors;
  };


  // =========================================================
  // VALIDATED STUDENTS
  // =========================================================

  const validatedStudents =
    useMemo(() => {

      return students.map(
        (student) => {

          const errors =
            validateStudent(
              student
            );


          return {

            ...student,

            errors,

            valid:
              errors.length === 0,

          };

        }
      );

    }, [
      students,
      academicYear,
      studentClass,
      section,
    ]);


  // =========================================================
  // SEARCH
  // =========================================================

  const filteredStudents =
    useMemo(() => {

      if (
        !search.trim()
      ) {

        return validatedStudents;

      }


      const keyword =
        search
          .toLowerCase()
          .trim();


      return validatedStudents.filter(
        (student) =>

          student.admissionNumber
            ?.toLowerCase()
            .includes(keyword)

          ||

          student.firstName
            ?.toLowerCase()
            .includes(keyword)

          ||

          student.lastName
            ?.toLowerCase()
            .includes(keyword)

          ||

          student.fatherName
            ?.toLowerCase()
            .includes(keyword)

          ||

          student.mobile
            ?.includes(keyword)
      );

    }, [
      validatedStudents,
      search
    ]);


  // =========================================================
  // COUNTS
  // =========================================================

  const validCount =
    validatedStudents.filter(
      (student) =>
        student.valid
    ).length;


  const invalidCount =
    validatedStudents.length -
    validCount;


  // =========================================================
  // IMPORT STUDENTS
  // =========================================================

  const importStudents = async () => {

    setError("");

    setSuccess("");


    // =======================================================
    // SCHOOL
    // =======================================================

    if (!schoolId) {

      setError(
        "School ID not found. Please login again."
      );

      return;
    }


    // =======================================================
    // SETTINGS
    // =======================================================

    if (!academicYear) {

      setError(
        "Please select academic year."
      );

      return;
    }


    if (!studentClass) {

      setError(
        "Please select class."
      );

      return;
    }


    if (!section) {

      setError(
        "Please select section."
      );

      return;
    }


    // =======================================================
    // FILE
    // =======================================================

    if (
      students.length === 0
    ) {

      setError(
        "Please upload Excel file first."
      );

      return;
    }


    // =======================================================
    // INVALID ROWS
    // =======================================================

    if (
      invalidCount > 0
    ) {

      setError(
        `Please fix ${invalidCount} invalid row${
          invalidCount > 1
            ? "s"
            : ""
        } before importing.`
      );

      return;
    }

    let payload;

    try {

      setIsImporting(true);


      // =====================================================
      // EXACT BACKEND PAYLOAD
      // =====================================================

       payload = {

        schoolId:

          Number(
            schoolId
          ),


        academicYear:
          academicYear,


        studentClass:
          studentClass,


        section:
          section,


        students:

          validatedStudents.map(
            (student) => ({

              admissionNumber:
                student.admissionNumber,


              firstName:
                student.firstName,


              middleName:
                student.middleName,


              lastName:
                student.lastName,


              dateOfBirth:
                student.dateOfBirth,


              gender:
                student.gender,


              age:
                student.age,


              bloodGroup:
                student.bloodGroup,


              nationality:
                student.nationality,


              motherTongue:
                student.motherTongue,


              religion:
                student.religion,


              category:
                student.category,


              caste:
                student.caste,


              // Father

              fatherName:
                student.fatherName,


              fatherMobile:
                student.fatherMobile,


              fatherEmail:
                student.fatherEmail,


              fatherOccupation:
                student.fatherOccupation,


              // Mother

              motherName:
                student.motherName,


              motherMobile:
                student.motherMobile,


              motherEmail:
                student.motherEmail,


              motherOccupation:
                student.motherOccupation,


              // Student

             mobile:
                student.mobile,


              studentEmail:
                student.studentEmail,


              transportRequired:
                student.transportRequired,


              feeCategory:
                student.feeCategory,


              feeBatch:
                student.feeBatch,


              // Address

              houseNo:
                student.houseNo,


              street:
                student.street,


              area:
                student.area,


              town:
                student.town,


              city:
                student.city,


              state:
                student.state,


              country:
                student.country,


              zip:
                student.zip,


              rollNumber:
                student.rollNumber,

            })
          )
      };


      console.log(
        "Bulk Student Import Payload:",
        payload
      );


      // =====================================================
      // API
      // =====================================================

      const response =
        await axiosInstance.post(
          "/api/students/bulk-import",
          payload
        );


      console.log(
        "Bulk import response:",
        response.data
      );


      const imported =
        response?.data
          ?.studentsImported ??
        validCount;


      const accounts =
        response?.data
          ?.accountsCreated ??
        validCount;


      setSuccess(
        `${imported} students imported successfully and ${accounts} student accounts created.`
      );


      // Reset

      setSelectedFile(null);

      setStudents([]);

      setSearch("");


    } catch (err) {

      console.error(
        "Bulk import error:",
       
         JSON.stringify(payload, null, 2)
      );
       console.error("Status:", error.response?.status);
  console.error("Response data:", error.response?.data);
  console.error("Response headers:", error.response?.headers);
  console.error("Request data:", error.config?.data);


      let message =
        "Student import failed.";


      if (
        err?.response?.data
      ) {

        if (
          typeof err.response.data ===
          "string"
        ) {

          message =
            err.response.data;

        } else {

          message =
            err.response.data.message ||
            err.response.data.error ||
            message;
        }
      }


      setError(message);


    } finally {

      setIsImporting(false);

    }
  };


  // =========================================================
  // RESET
  // =========================================================

  const resetImport = () => {

    setAcademicYear("");

    setStudentClass("");

    setSection("");

    setSelectedFile(null);

    setStudents([]);

    setSearch("");

    setError("");

    setSuccess("");
  };


  // =========================================================
  // UI
  // =========================================================

  return (
    <>
      <div className="container-fluid">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="mx-2 mt-2 mb-3">

          <div
            className="rounded-4 shadow overflow-hidden"
            style={{
              background:
                "linear-gradient(135deg,#ffffff 0%,#f5f9ff 60%,#eaf3ff 100%)",
              border:
                "1px solid #dbeafe",
            }}
          >

            <div className="p-3 p-md-4">

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

                <div className="d-flex align-items-center gap-3">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "52px",
                      height: "52px",
                      background:
                        "linear-gradient(135deg,#2563eb,#3b82f6)",
                      color: "#fff",
                      boxShadow:
                        "0 8px 20px rgba(37,99,235,.22)",
                    }}
                  >

                    <FaUser size={27} />

                  </div>


                  <div>

                    <h5 className="mb-1 fw-bold text-dark">
                      Student Bulk Import
                    </h5>

                    <div className="text-muted small">
                      Setup &nbsp;/&nbsp; Student Bulk Import
                    </div>

                  </div>

                </div>


                <div className="d-flex align-items-center gap-2">

                  <span
                    className="badge rounded-pill px-3 py-2"
                    style={{
                      backgroundColor:
                        "#eff6ff",
                      color:
                        "#2563eb",
                      border:
                        "1px solid #bfdbfe",
                    }}
                  >

                    <MdOutlineSchool
                      className="me-1"
                    />

                    Setup

                  </span>

                </div>

              </div>

            </div>


            <div
              className="px-4 py-2"
              style={{
                backgroundColor:
                  "rgba(239,246,255,.75)",
                borderTop:
                  "1px solid #e0ecff",
              }}
            >

              <small className="text-muted">

                Home &nbsp;›&nbsp;
                Setup &nbsp;›&nbsp;

                <span className="text-primary fw-semibold">
                  Student Bulk Import
                </span>

              </small>

            </div>

          </div>

        </div>


        {/* ===================================================
            ALERTS
        =================================================== */}

        {error && (

          <div
            className="alert d-flex align-items-start gap-2"
            style={{
              background:
                "#fff1f2",
              color:
                "#be123c",
              border:
                "1px solid #fecdd3",
              borderRadius:
                "12px",
            }}
          >

            <LuCircleAlert
              size={20}
              className="mt-1"
            />

            <div>
              {error}
            </div>

            <button
              className="btn ms-auto p-0"
              onClick={() =>
                setError("")
              }
            >

              <LuX />

            </button>

          </div>

        )}


        {success && (

          <div
            className="alert d-flex align-items-center gap-2"
            style={{
              background:
                "#ecfdf5",
              color:
                "#047857",
              border:
                "1px solid #a7f3d0",
              borderRadius:
                "12px",
            }}
          >

            <LuCheck size={20} />

            <div>
              {success}
            </div>

            <button
              className="btn ms-auto p-0"
              onClick={() =>
                setSuccess("")
              }
            >

              <LuX />

            </button>

          </div>

        )}


        {/* ===================================================
            IMPORT SETTINGS
        =================================================== */}

        <div
          className="card border-0 mb-4"
          style={{
            borderRadius:
              "18px",
            boxShadow:
              "0 8px 25px rgba(15,23,42,0.06)",
          }}
        >

          <div className="card-body p-4">

            <div className="d-flex align-items-center gap-2 mb-3">

              <LuUsers
                size={21}
                color="#2563eb"
              />

              <h5
                className="mb-0"
                style={{
                  color:
                    "#0f172a",
                  fontWeight:
                    700,
                }}
              >
                Import Settings
              </h5>

            </div>


            <div className="row g-3">

              {/* Academic Year */}

              <div className="col-lg-4 col-md-6">

                <label className="form-label fw-semibold">
                  Academic Year
                </label>

                <select
                  className="form-select"
                  value={
                    academicYear
                  }
                  onChange={(e) =>
                    setAcademicYear(
                      e.target.value
                    )
                  }
                  style={{
                    borderRadius:
                      "10px",
                    minHeight:
                      "46px",
                  }}
                >

                  <option value="">
                    Select Academic Year
                  </option>

                  {sessions.map(
                    (year) => (

                      <option
                        key={year}
                        value={year}
                      >
                        {year}
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* Class */}

              <div className="col-lg-4 col-md-6">

                <label className="form-label fw-semibold">
                  Class
                </label>

                <select
                  className="form-select"
                  value={
                    studentClass
                  }
                  onChange={(e) =>
                    setStudentClass(
                      e.target.value
                    )
                  }
                  style={{
                    borderRadius:
                      "10px",
                    minHeight:
                      "46px",
                  }}
                >

                  <option value="">
                    Select Class
                  </option>

                  {standards.map(
                    (item) => (

                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>

                    )
                  )}

                </select>

              </div>


              {/* Section */}

              <div className="col-lg-4 col-md-6">

                <label className="form-label fw-semibold">
                  Section
                </label>

                <select
                  className="form-select"
                  value={section}
                  onChange={(e) =>
                    setSection(
                      e.target.value
                    )
                  }
                  style={{
                    borderRadius:
                      "10px",
                    minHeight:
                      "46px",
                  }}
                >

                  <option value="">
                    Select Section
                  </option>

                  {sections.map(
                    (item) => (

                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>

                    )
                  )}

                </select>

              </div>

            </div>


            {/* Selected */}

            {academicYear &&
              studentClass &&
              section && (

                <div
                  className="mt-3 p-3 rounded-3"
                  style={{
                    background:
                      "#eff6ff",
                    border:
                      "1px solid #bfdbfe",
                  }}
                >

                  <div className="small text-muted mb-1">
                    Students will be imported into
                  </div>

                  <div className="fw-bold text-primary">

                    {studentClass}
                    {" • "}
                    Section {section}
                    {" • "}
                    {academicYear}

                  </div>

                </div>

              )}

          </div>

        </div>


        {/* ===================================================
            TEMPLATE DOWNLOAD
        =================================================== */}

        <div
          className="card border-0 mb-4"
          style={{
            borderRadius:
              "18px",
            boxShadow:
              "0 8px 25px rgba(15,23,42,0.06)",
          }}
        >

          <div className="card-body p-4">

            <div className="row align-items-center">

              <div className="col-lg-8">

                <div className="d-flex gap-3">

                  <div
                    className="d-flex align-items-center justify-content-center rounded-3"
                    style={{
                      width: "48px",
                      height: "48px",
                      background:
                        "#eff6ff",
                      color:
                        "#2563eb",
                    }}
                  >

                    <LuFileSpreadsheet
                      size={24}
                    />

                  </div>


                  <div>

                    <h6 className="fw-bold mb-1">
                      Download Excel Template
                    </h6>

                    <p className="text-muted small mb-0">

                      Download the template for
                      the selected class and section.
                      Fill student details and upload
                      it below.

                    </p>

                  </div>

                </div>

              </div>


              <div className="col-lg-4 mt-3 mt-lg-0 text-lg-end">

                <button
                  className="btn btn-primary px-4"
                  onClick={
                    downloadTemplate
                  }
                  disabled={
                    !academicYear ||
                    !studentClass ||
                    !section
                  }
                  style={{
                    borderRadius:
                      "10px",
                    minHeight:
                      "44px",
                  }}
                >

                  <LuDownload
                    className="me-2"
                  />

                  Download Template

                </button>

              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            UPLOAD
        =================================================== */}

        <div
          className="card border-0 mb-4"
          style={{
            borderRadius:
              "18px",
            boxShadow:
              "0 8px 25px rgba(15,23,42,0.06)",
          }}
        >

          <div className="card-body p-4">

            <div className="d-flex align-items-center gap-2 mb-3">

              <LuUpload
                size={21}
                color="#2563eb"
              />

              <h5 className="mb-0 fw-bold">
                Upload Student Excel
              </h5>

            </div>


            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragging(true);
              }}

              onDragLeave={() =>
                setIsDragging(false)
              }

              onDrop={handleDrop}

              className="p-5 text-center"
              style={{
                border:
                  `2px dashed ${
                    isDragging
                      ? "#2563eb"
                      : "#bfdbfe"
                  }`,

                borderRadius:
                  "16px",

                background:
                  isDragging
                    ? "#eff6ff"
                    : "#f8fbff",

                cursor:
                  "pointer",

                transition:
                  "all .2s",
              }}
            >

              {isReading ? (

                <>

                  <LuLoader
                    size={40}
                    color="#2563eb"
                    className="mb-3"
                  />

                  <h6 className="fw-bold">
                    Reading Excel...
                  </h6>

                  <p className="text-muted small mb-0">
                    Please wait.
                  </p>

                </>

              ) : (

                <>

                  <LuFileSpreadsheet
                    size={42}
                    color="#2563eb"
                    className="mb-3"
                  />


                  <h6 className="fw-bold">
                    Drag & Drop Excel File
                  </h6>


                  <p className="text-muted small">
                    or select an Excel file
                    from your computer
                  </p>


                  <label
                    className="btn btn-outline-primary px-4"
                    style={{
                      borderRadius:
                        "10px",
                    }}
                  >

                    <LuUpload
                      className="me-2"
                    />

                    Choose Excel File

                    <input
                      type="file"
                      hidden
                      accept=".xlsx,.xls"
                      onChange={
                        handleFileChange
                      }
                    />

                  </label>


                  <div className="small text-muted mt-3">
                    Supported: .xlsx, .xls
                  </div>

                </>

              )}

            </div>


            {/* FILE */}

            {selectedFile && (

              <div
                className="d-flex flex-wrap justify-content-between align-items-center mt-3 p-3 rounded-3"
                style={{
                  background:
                    "#f8fafc",
                  border:
                    "1px solid #e2e8f0",
                }}
              >

                <div className="d-flex align-items-center gap-3">

                  <LuFileSpreadsheet
                    size={25}
                    color="#16a34a"
                  />

                  <div>

                    <div className="fw-semibold">
                      {selectedFile.name}
                    </div>

                    <small className="text-muted">
                      {students.length} student records
                    </small>

                  </div>

                </div>


                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={
                    removeFile
                  }
                >

                  <LuTrash2
                    className="me-1"
                  />

                  Remove

                </button>

              </div>

            )}

          </div>

        </div>


        {/* ===================================================
            SUMMARY
        =================================================== */}

        {students.length > 0 && (

          <div className="row g-3 mb-4">

            <div className="col-md-4">

              <div
                className="card border-0 h-100"
                style={{
                  borderRadius:
                    "16px",
                  boxShadow:
                    "0 6px 20px rgba(15,23,42,.05)",
                }}
              >

                <div className="card-body">

                  <small className="text-muted">
                    Total Students
                  </small>

                  <h3 className="fw-bold mb-0">
                    {validatedStudents.length}
                  </h3>

                </div>

              </div>

            </div>


            <div className="col-md-4">

              <div
                className="card border-0 h-100"
                style={{
                  borderRadius:
                    "16px",
                  boxShadow:
                    "0 6px 20px rgba(15,23,42,.05)",
                }}
              >

                <div className="card-body">

                  <small
                    style={{
                      color:
                        "#15803d",
                    }}
                  >
                    Valid Students
                  </small>

                  <h3
                    className="fw-bold mb-0"
                    style={{
                      color:
                        "#15803d",
                    }}
                  >
                    {validCount}
                  </h3>

                </div>

              </div>

            </div>


            <div className="col-md-4">

              <div
                className="card border-0 h-100"
                style={{
                  borderRadius:
                    "16px",
                  boxShadow:
                    "0 6px 20px rgba(15,23,42,.05)",
                }}
              >

                <div className="card-body">

                  <small
                    style={{
                      color:
                        "#dc2626",
                    }}
                  >
                    Invalid Students
                  </small>

                  <h3
                    className="fw-bold mb-0"
                    style={{
                      color:
                        "#dc2626",
                    }}
                  >
                    {invalidCount}
                  </h3>

                </div>

              </div>

            </div>

          </div>

        )}


        {/* ===================================================
            PREVIEW
        =================================================== */}

        {students.length > 0 && (

          <div
            className="card border-0 mb-4"
            style={{
              borderRadius:
                "18px",
              boxShadow:
                "0 8px 25px rgba(15,23,42,0.06)",
            }}
          >

            <div className="card-body p-4">

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">

                <div>

                  <h5 className="fw-bold mb-1">
                    Student Preview
                  </h5>

                  <small className="text-muted">
                    Review the imported records before saving.
                  </small>

                </div>


                <div
                  style={{
                    minWidth:
                      "280px",
                  }}
                >

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search admission, name, father, mobile..."
                    value={search}
                    onChange={(e) =>
                      setSearch(
                        e.target.value
                      )
                    }
                    style={{
                      borderRadius:
                        "10px",
                    }}
                  />

                </div>

              </div>


              <div
                className="table-responsive"
                style={{
                  maxHeight:
                    "550px",
                }}
              >

                <table
                  className="table table-hover align-middle mb-0"
                >

                  <thead
                    style={{
                      position:
                        "sticky",
                      top: 0,
                      zIndex: 2,
                      background:
                        "#eff6ff",
                    }}
                  >

                    <tr>

                      <th>
                        Row
                      </th>

                      <th>
                        Status
                      </th>

                      <th>
                        Admission No.
                      </th>

                      <th>
                        Student
                      </th>

                      <th>
                        DOB
                      </th>

                      <th>
                        Gender
                      </th>

                      <th>
                        Student Mobile
                      </th>

                      <th>
                        Father
                      </th>

                      <th>
                        Mother
                      </th>

                      <th>
                        Class
                      </th>

                      <th>
                        Section
                      </th>

                      <th>
                        Roll
                      </th>

                      <th>
                        Transport
                      </th>

                      <th>
                        Errors
                      </th>

                    </tr>

                  </thead>


                  <tbody>

                    {filteredStudents.map(
                      (student, index) => (

                        <tr key={`${student.admissionNumber}-${student.excelRow}`}>

                          <td>
                            {student.excelRow}
                          </td>


                          <td>

                            {student.valid ? (

                              <span
                                className="badge rounded-pill"
                                style={{
                                  background:
                                    "#dcfce7",
                                  color:
                                    "#15803d",
                                }}
                              >

                                <LuCheck
                                  size={13}
                                  className="me-1"
                                />

                                Valid

                              </span>

                            ) : (

                              <span
                                className="badge rounded-pill"
                                style={{
                                  background:
                                    "#fee2e2",
                                  color:
                                    "#dc2626",
                                }}
                              >

                                <LuX
                                  size={13}
                                  className="me-1"
                                />

                                Invalid

                              </span>

                            )}

                          </td>


                          <td className="fw-semibold">

                            {student.admissionNumber ||
                              "-"}

                          </td>


                          <td>

                            {[
                              student.firstName,
                              student.middleName,
                              student.lastName
                            ]
                              .filter(Boolean)
                              .join(" ") ||
                              "-"}

                          </td>


                          <td>
                            {student.dateOfBirth ||
                              "-"}
                          </td>


                          <td>
                            {student.gender ||
                              "-"}
                          </td>


                          <td>
                            {student.mobile ||
                              "-"}
                          </td>


                          <td>
                            {student.fatherName ||
                              "-"}
                          </td>


                          <td>
                            {student.motherName ||
                              "-"}
                          </td>


                          <td>
                            {studentClass}
                          </td>


                          <td>
                            {section}
                          </td>


                          <td>
                            {student.rollNumber ??
                              "-"}
                          </td>


                          <td>
                            {student.transportRequired ||
                              "-"}
                          </td>


                          <td>

                            {student.errors.length >
                            0 ? (

                              <div
                                style={{
                                  minWidth:
                                    "220px",
                                }}
                              >

                                {student.errors.map(
                                  (
                                    item,
                                    errorIndex
                                  ) => (

                                    <div
                                      key={
                                        errorIndex
                                      }
                                      className="small text-danger"
                                    >
                                      • {item}
                                    </div>

                                  )
                                )}

                              </div>

                            ) : (

                              <span className="text-success small">
                                No errors
                              </span>

                            )}

                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            </div>

          </div>

        )}


        {/* ===================================================
            ACTIONS
        =================================================== */}

        <div
          className="card border-0 mb-5"
          style={{
            borderRadius:
              "18px",
            boxShadow:
              "0 8px 25px rgba(15,23,42,0.06)",
          }}
        >

          <div className="card-body p-4">

            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

              <div>

                <div className="fw-bold">
                  Ready to Import?
                </div>

                <small className="text-muted">

                  {students.length > 0
                    ? `${validCount} valid student${
                        validCount !== 1
                          ? "s"
                          : ""
                      } will be imported.`
                    : "Upload an Excel file to continue."}

                </small>

              </div>


              <div className="d-flex gap-2">

                <button
                  className="btn btn-outline-secondary"
                  onClick={
                    resetImport
                  }
                  disabled={
                    isImporting
                  }
                  style={{
                    borderRadius:
                      "10px",
                  }}
                >

                  <LuRefreshCw
                    className="me-2"
                  />

                  Reset

                </button>


                <button
                  className="btn btn-primary px-4"
                  onClick={
                    importStudents
                  }
                  disabled={
                    isImporting ||
                    students.length === 0 ||
                    invalidCount > 0
                  }
                  style={{
                    borderRadius:
                      "10px",
                    minHeight:
                      "44px",
                  }}
                >

                  {isImporting ? (

                    <>

                      <LuLoader
                        className="me-2"
                        style={{
                          animation:
                            "spin 1s linear infinite",
                        }}
                      />

                      Importing...

                    </>

                  ) : (

                    <>

                      <LuUpload
                        className="me-2"
                      />

                      Import {validCount} Students

                    </>

                  )}

                </button>

              </div>

            </div>

          </div>

        </div>


        <style>
          {`
            @keyframes spin {
              from {
                transform: rotate(0deg);
              }
              to {
                transform: rotate(360deg);
              }
            }
          `}
        </style>

      </div>
    </>
  );
};


export default StudentBulkImport;