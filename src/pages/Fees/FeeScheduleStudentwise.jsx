
import React, { useEffect, useState } from "react";
import {
  FaCalendarCheck,
  FaCheck,
  FaSearch,
  FaUsers,
  FaMoneyBillWave,
  FaReceipt,
  FaUserGraduate,
} from "react-icons/fa";
import { MdMoney, MdOutlineSchool, MdPayments } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import axiosInstance from "../../api/axiosInstance";
import useMasters from "../../hooks/useMasters";

const months = [
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
  "January",
  "February",
  "March",
];

const FeeScheduleStudentwise = () => {
  const token = localStorage.getItem("token");
  const schoolId = localStorage.getItem("schoolId");

  const { sessions, standards, sections } = useMasters();

  // =====================================================
  // FILTER
  // =====================================================

  const [session, setSession] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [section, setSection] = useState("");

  // =====================================================
  // STUDENTS
  // =====================================================

  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);

  // =====================================================
  // SELECTED STUDENT DETAILS
  // =====================================================

  const [selectedStudentDetails, setSelectedStudentDetails] =
    useState([]);

  // =====================================================
  // ADMISSION DETAILS
  // =====================================================

  const [admissionDetails, setAdmissionDetails] = useState({});

  // =====================================================
  // ADMISSION FEE PAYMENTS
  // =====================================================

  const [admissionFeePayments, setAdmissionFeePayments] = useState([]);

  // =====================================================
  // ASSIGNED STUDENT FEES
  // =====================================================

  const [assignedFees, setAssignedFees] = useState([]);

  // =====================================================
  // FEE SCHEDULE PREVIEW
  // =====================================================

  const [schedulePreview, setSchedulePreview] = useState([]);

  // =====================================================
  // STATES
  // =====================================================

  const [loadingStudents, setLoadingStudents] = useState(false);
  const [loadingDetails, setLoadingDetails] = useState(false);
  const [creating, setCreating] = useState(false);

  const [search, setSearch] = useState("");

  // =====================================================
  // LOAD STUDENTS
  // =====================================================

  const loadStudents = async () => {
    if (!schoolId) {
      alert("School ID not found.");
      return;
    }

    if (!session) {
      alert("Please select session.");
      return;
    }

    if (!studentClass) {
      alert("Please select class.");
      return;
    }

    try {
      setLoadingStudents(true);

      setStudents([]);
      setSelectedStudents([]);
      setSelectedStudentDetails([]);
      setAdmissionDetails({});
      setAdmissionFeePayments([]);
      setAssignedFees([]);
      setSchedulePreview([]);

      const response = await axiosInstance.get("/api/students/search", {
        params: {
          schoolId: schoolId,
          academicYear: session,
          studentClass: studentClass,
          section: section || null,
        },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setStudents(response.data || []);
    } catch (error) {
      console.log("Student loading error:", error);

      setStudents([]);

      alert(
        error.response?.data?.message ||
          "Students load nahi ho paaye.",
      );
    } finally {
      setLoadingStudents(false);
    }
  };

  // =====================================================
  // LOAD STUDENT DETAILS
  // =====================================================

  const loadStudentDetails = async (student) => {
    if (!student?.admissionNumber) {
      return;
    }

    try {
      setLoadingDetails(true);

      const admissionNumber = student.admissionNumber;

      // -------------------------------------------------
      // 1. GET ADMISSION BY SCHOOL + ADMISSION NUMBER
      // -------------------------------------------------

      const admissionResponse = await axiosInstance.get(
        "/api/admissions/admission",
        {
          params: {
            schoolId: Number(schoolId),
            admissionNumber: admissionNumber,
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const admission = admissionResponse.data;

      setAdmissionDetails(admission || {});

      // IMPORTANT:
      // Admission ki actual ID yahan se milegi
      const admissionId = admission?.id;

      if (!admissionId) {
        console.log("Admission ID not found:", admission);
        throw new Error("Admission ID not found.");
      }

      // -------------------------------------------------
      // 2. GET ALL ADMISSION FEE PAYMENTS
      // -------------------------------------------------

      const admissionFeeResponse = await axiosInstance.get(
        "/api/admission-fee/school",
        {
          params: {
            schoolId: Number(schoolId),
          },
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const allAdmissionPayments =
        admissionFeeResponse.data || [];

      // IMPORTANT:
      // admission_fee_payment table mein
      // admission_id -> Admission ki ID hai
      //
      // Isliye admissionNumber se match nahi karna hai.
      // Admission object ki id se match karenge.

      const matchedPayments = allAdmissionPayments.filter(
        (payment) => {
          const paymentAdmissionId =
            payment.admission?.id ??
            payment.admissionId;

          return Number(paymentAdmissionId) === Number(admissionId);
        },
      );

      setAdmissionFeePayments(matchedPayments);

      // -------------------------------------------------
      // 3. GET ASSIGNED FEES
      // -------------------------------------------------

      const assignedFeeResponse = await axiosInstance.get(
        `/api/student-fee/${admissionNumber}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const studentFees = assignedFeeResponse.data || [];

      setAssignedFees(studentFees);

      // -------------------------------------------------
      // 4. BUILD SCHEDULE PREVIEW
      // -------------------------------------------------

      const preview = buildSchedulePreview(
        matchedPayments,
        studentFees,
        admission,
      );

      setSchedulePreview(preview);
    } catch (error) {
      console.log(
        "Student details loading error:",
        error,
      );

      setAdmissionDetails({});
      setAdmissionFeePayments([]);
      setAssignedFees([]);
      setSchedulePreview([]);

      alert(
        error.response?.data?.message ||
          error.message ||
          "Student fee details load nahi ho paaye.",
      );
    } finally {
      setLoadingDetails(false);
    }
  };

  // =====================================================
  // BUILD SCHEDULE PREVIEW
  // =====================================================

  const buildSchedulePreview = (
    payments,
    studentFees,
    admission,
  ) => {
    const result = [];

    // -------------------------------------------------
    // PAID MONTHS FROM ADMISSION PAYMENT
    // -------------------------------------------------

    const paidMonthMap = {};

    payments.forEach((payment) => {
      let paidMonths = [];

      try {
        if (payment.paidMonths) {
          if (Array.isArray(payment.paidMonths)) {
            paidMonths = payment.paidMonths;
          } else if (
            typeof payment.paidMonths === "string"
          ) {
            paidMonths = JSON.parse(payment.paidMonths);
          }
        }
      } catch (error) {
        console.log(
          "paidMonths JSON parse error:",
          error,
        );
      }

      if (!Array.isArray(paidMonths)) {
        paidMonths = [];
      }

      paidMonths.forEach((monthItem) => {
        let monthName = "";
        let amount = 0;

        // Example:
        // "April"
        if (typeof monthItem === "string") {
          monthName = monthItem;
        }

        // Example:
        // {month:"April", amount:1000}
        else if (
          typeof monthItem === "object" &&
          monthItem !== null
        ) {
          monthName =
            monthItem.month ||
            monthItem.name ||
            monthItem.monthName ||
            "";

          amount =
            Number(
              monthItem.amount ||
                monthItem.paidAmount ||
                0,
            ) || 0;
        }

        if (!monthName) {
          return;
        }

        paidMonthMap[monthName] = {
          month: monthName,
          amount,
          paymentDate: payment.paymentDate,
          paymentId: payment.id,
          paymentMode: payment.paymentMode,
          totalAmount: payment.totalAmount,
          standard: payment.standard,
          session: payment.session,
        };
      });
    });

    // -------------------------------------------------
    // ASSIGNED FEE + PAID MONTH
    // -------------------------------------------------

    months.forEach((month) => {
      const paidInfo = paidMonthMap[month];

      // Assigned fee for current student
      const monthFees = studentFees.filter((fee) => {
        return (
          String(fee.session || "") ===
            String(
              admission?.academicYear ||
                session ||
                "",
            ) &&
          String(fee.feeName || "").trim() !== ""
        );
      });

      monthFees.forEach((fee) => {
        result.push({
          month: month,

          feeId: fee.id,
          feeMasterId: fee.feeMasterId,
          feeStructureId: fee.feeStructureId,

          feeCode: fee.feeCode,
          feeName: fee.feeName,

          feeCategory: fee.feeCategory,
          feeBatch: fee.feeBatch,

          amount: Number(fee.amount || 0),

          assignedPaidAmount: Number(
            fee.paidAmount || 0,
          ),

          assignedDueAmount: Number(
            fee.dueAmount || 0,
          ),

          feeStatus: fee.status || "UNPAID",

          assignDate: fee.assignDate,
          paidDate: fee.paidDate,

          admissionPaid: !!paidInfo,

          admissionPaidAmount:
            paidInfo?.amount || 0,

          admissionPaymentDate:
            paidInfo?.paymentDate || null,

          admissionPaymentMode:
            paidInfo?.paymentMode || null,

          admissionPaymentId:
            paidInfo?.paymentId || null,

          admissionPaymentTotal:
            paidInfo?.totalAmount || 0,

          admissionSession:
            paidInfo?.session || null,

          admissionStandard:
            paidInfo?.standard || null,
        });
      });
    });

    return result;
  };

  // =====================================================
  // SEARCH
  // =====================================================

  const filteredStudents = students.filter(
    (student) => {
      const value = search.toLowerCase();

      const name =
        `${student.firstName || ""} ${
          student.middleName || ""
        } ${student.lastName || ""}`.toLowerCase();

      const admissionNumber = String(
        student.admissionNumber || "",
      ).toLowerCase();

      const rollNo = String(
        student.rollNo || "",
      ).toLowerCase();

      return (
        name.includes(value) ||
        admissionNumber.includes(value) ||
        rollNo.includes(value)
      );
    },
  );

  // =====================================================
  // SELECT SINGLE STUDENT
  // =====================================================

  const handleStudentSelect = async (student) => {
    const admissionNumber =
      student.admissionNumber;

    const alreadySelected =
      selectedStudents.includes(admissionNumber);

    if (alreadySelected) {
      setSelectedStudents((prev) =>
        prev.filter(
          (item) => item !== admissionNumber,
        ),
      );

      setSelectedStudentDetails((prev) =>
        prev.filter(
          (item) =>
            item.admissionNumber !==
            admissionNumber,
        ),
      );

      // Agar currently selected student remove hua
      if (
        admissionDetails?.admissionNumber ===
        admissionNumber
      ) {
        setAdmissionDetails({});
        setAdmissionFeePayments([]);
        setAssignedFees([]);
        setSchedulePreview([]);
      }

      return;
    }

    setSelectedStudents((prev) => [
      ...prev,
      admissionNumber,
    ]);

    setSelectedStudentDetails((prev) => [
      ...prev,
      student,
    ]);

    // Selected student ka complete detail load
    await loadStudentDetails(student);
  };

  // =====================================================
  // SELECT ALL
  // =====================================================

  const handleSelectAll = async () => {
    const filteredAdmissionNumbers =
      filteredStudents.map(
        (student) => student.admissionNumber,
      );

    const allSelected =
      filteredAdmissionNumbers.length > 0 &&
      filteredAdmissionNumbers.every(
        (admissionNumber) =>
          selectedStudents.includes(
            admissionNumber,
          ),
      );

    if (allSelected) {
      setSelectedStudents((prev) =>
        prev.filter(
          (item) =>
            !filteredAdmissionNumbers.includes(
              item,
            ),
        ),
      );

      setSelectedStudentDetails((prev) =>
        prev.filter(
          (item) =>
            !filteredAdmissionNumbers.includes(
              item.admissionNumber,
            ),
        ),
      );

      setAdmissionDetails({});
      setAdmissionFeePayments([]);
      setAssignedFees([]);
      setSchedulePreview([]);

      return;
    }

    setSelectedStudents((prev) => [
      ...new Set([
        ...prev,
        ...filteredAdmissionNumbers,
      ]),
    ]);

    setSelectedStudentDetails((prev) => {
      const existing = prev.map(
        (item) => item.admissionNumber,
      );

      const newStudents =
        filteredStudents.filter(
          (student) =>
            !existing.includes(
              student.admissionNumber,
            ),
        );

      return [...prev, ...newStudents];
    });

    // Last selected student ki detail show
    const lastStudent =
      filteredStudents[
        filteredStudents.length - 1
      ];

    if (lastStudent) {
      await loadStudentDetails(lastStudent);
    }
  };

  // =====================================================
  // CREATE SCHEDULE
  // =====================================================

 

// const handleCreateSchedule = async () => {
//   if (selectedStudents.length === 0) {
//     alert("Please select at least one student.");
//     return;
//   }

//   if (!session) {
//     alert("Please select session.");
//     return;
//   }

//   if (!studentClass) {
//     alert("Please select class.");
//     return;
//   }

//   try {
//     setCreating(true);

//     let successCount = 0;
//     let failedCount = 0;

//     const failedStudents = [];

//     // =====================================================
//     // PROCESS EACH SELECTED STUDENT
//     // =====================================================

//     for (const admissionNumber of selectedStudents) {
//       try {
//         // -------------------------------------------------
//         // 1. GET ADMISSION
//         // -------------------------------------------------

//         const admissionResponse =
//           await axiosInstance.get(
//             "/api/admissions/admission",
//             {
//               params: {
//                 schoolId: Number(schoolId),
//                 admissionNumber:
//                   admissionNumber,
//               },
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             },
//           );

//         const admission =
//           admissionResponse.data;

//         if (!admission?.id) {
//           throw new Error(
//             `Admission not found for ${admissionNumber}`,
//           );
//         }

//         const admissionId =
//           admission.id;

//         // -------------------------------------------------
//         // 2. GET ASSIGNED STUDENT FEES
//         // -------------------------------------------------

//         const feeResponse =
//           await axiosInstance.get(
//             `/api/student-fee/${admissionNumber}`,
//             {
//               headers: {
//                 Authorization: `Bearer ${token}`,
//               },
//             },
//           );

//         const studentFees =
//           feeResponse.data || [];

//         if (
//           !Array.isArray(studentFees) ||
//           studentFees.length === 0
//         ) {
//           throw new Error(
//             `No assigned fee found for ${admissionNumber}`,
//           );
//         }

//         // -------------------------------------------------
//         // 3. FILTER CURRENT SESSION
//         // -------------------------------------------------

//         const currentSessionFees =
//           studentFees.filter(
//             (fee) =>
//               String(
//                 fee.session || "",
//               ) === String(session),
//           );

//         if (
//           currentSessionFees.length === 0
//         ) {
//           throw new Error(
//             `No assigned fee found for ${admissionNumber} in session ${session}`,
//           );
//         }

      

//         const schedules = [];

//         months.forEach((month) => {
//           currentSessionFees.forEach(
//             (fee) => {
//               if (!fee.feeMasterId) {
//                 return;
//               }

//               schedules.push({
//                 month: month,

//                 feeMasterId:
//                   fee.feeMasterId,

//                 feeCode:
//                   fee.feeCode || "",

//                 feeName:
//                   fee.feeName || "",

//                 amount:
//                   Number(
//                     fee.amount || 0,
//                   ),
//               });
//             },
//           );
//         });

//         if (schedules.length === 0) {
//           throw new Error(
//             `No schedule data found for ${admissionNumber}`,
//           );
//         }

//         // -------------------------------------------------
//         // 5. GENERATE FEE REQUEST
//         // -------------------------------------------------

//         const payload = {
//           admissionNumber:
//             admissionNumber,

//           admissionId:
//             Number(admissionId),

//           schedules:
//             schedules,
//         };

//         console.log(
//           `Generate Fee Payload - ${admissionNumber}:`,
//           payload,
//         );

//         // -------------------------------------------------
//         // 6. CALL EXISTING BACKEND
//         // -------------------------------------------------

//         await axiosInstance.post(
//           "/api/student-fee/generate",
//           payload,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           },
//         );

//         successCount++;
//       } catch (studentError) {
//         failedCount++;

//         console.log(
//           `Schedule creation failed for ${admissionNumber}:`,
//           studentError,
//         );

//         failedStudents.push({
//           admissionNumber:
//             admissionNumber,

//           message:
//             studentError.response
//               ?.data?.message ||
//             studentError.message ||
//             "Schedule creation failed",
//         });
//       }
//     }

//     // =====================================================
//     // RESULT
//     // =====================================================

//     if (
//       successCount > 0 &&
//       failedCount === 0
//     ) {
//       alert(
//         `${successCount} student ka fee schedule successfully create ho gaya.`,
//       );
//     } else if (
//       successCount > 0 &&
//       failedCount > 0
//     ) {
//       alert(
//         `${successCount} student ka schedule create hua.\n${failedCount} student ka schedule create nahi ho paya.\n\nFailed Students:\n${failedStudents
//           .map(
//             (item) =>
//               `${item.admissionNumber} - ${item.message}`,
//           )
//           .join("\n")}`,
//       );
//     } else {
//       alert(
//         `Kisi bhi student ka fee schedule create nahi ho paya.\n\n${failedStudents
//           .map(
//             (item) =>
//               `${item.admissionNumber} - ${item.message}`,
//           )
//           .join("\n")}`,
//       );
//     }

//     // =====================================================
//     // CLEAR AFTER SUCCESS
//     // =====================================================

//     if (successCount > 0) {
//       setSelectedStudents([]);
//       setSelectedStudentDetails([]);

//       setAdmissionDetails({});
//       setAdmissionFeePayments([]);
//       setAssignedFees([]);
//       setSchedulePreview([]);

//       await loadStudents();
//     }
//   } catch (error) {
//     console.log(
//       "Create schedule error:",
//       error,
//     );

//     alert(
//       error.response?.data?.message ||
//         error.message ||
//         "Fee schedule create nahi ho paya.",
//     );
//   } finally {
//     setCreating(false);
//   }
// };


const handleCreateSchedule = async () => {
  if (selectedStudents.length === 0) {
    alert("Please select at least one student.");
    return;
  }

  if (!session) {
    alert("Please select session.");
    return;
  }

  if (!studentClass) {
    alert("Please select class.");
    return;
  }

  try {
    setCreating(true);

    let successCount = 0;
    let failedCount = 0;

    const failedStudents = [];

    // =====================================================
    // PROCESS EACH SELECTED STUDENT
    // =====================================================

    for (const admissionNumber of selectedStudents) {
      try {
        // =================================================
        // 1. GET ADMISSION
        // =================================================

        const admissionResponse =
          await axiosInstance.get(
            "/api/admissions/admission",
            {
              params: {
                schoolId: Number(schoolId),
                admissionNumber: admissionNumber,
              },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        const admission = admissionResponse.data;

        if (!admission?.id) {
          throw new Error(
            `Admission not found for ${admissionNumber}`
          );
        }

        const admissionId = admission.id;

        // =================================================
        // 2. GET ADMISSION FEE PAYMENTS
        // =================================================

        const admissionFeeResponse =
          await axiosInstance.get(
            "/api/admission-fee/school",
            {
              params: {
                schoolId: Number(schoolId),
              },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        const allAdmissionPayments =
          admissionFeeResponse.data || [];

        // =================================================
        // 3. MATCH CURRENT STUDENT'S ADMISSION PAYMENTS
        // =================================================

        const matchedPayments =
          allAdmissionPayments.filter((payment) => {
            const paymentAdmissionId =
              payment.admission?.id ??
              payment.admissionId;

            return (
              Number(paymentAdmissionId) ===
              Number(admissionId)
            );
          });

        if (matchedPayments.length === 0) {
          throw new Error(
            `No admission fee payment found for ${admissionNumber}`
          );
        }

        // =================================================
        // 4. GET PAID MONTHS
        // =================================================

        const paidMonthsSet = new Set();

        matchedPayments.forEach((payment) => {
          let paymentMonths = [];

          try {
            if (Array.isArray(payment.paidMonths)) {
              paymentMonths = payment.paidMonths;
            } else if (
              typeof payment.paidMonths === "string"
            ) {
              paymentMonths = JSON.parse(
                payment.paidMonths
              );
            }
          } catch (error) {
            console.log(
              "paidMonths parse error:",
              error
            );
          }

          if (!Array.isArray(paymentMonths)) {
            return;
          }

          paymentMonths.forEach((item) => {
            let monthName = "";

            if (typeof item === "string") {
              monthName = item;
            } else if (
              typeof item === "object" &&
              item !== null
            ) {
              monthName =
                item.month ||
                item.monthName ||
                item.name ||
                "";
            }

            if (monthName) {
              paidMonthsSet.add(
                String(monthName).trim()
              );
            }
          });
        });

        const paidMonths = Array.from(
          paidMonthsSet
        );

        console.log(
          `Paid Months - ${admissionNumber}:`,
          paidMonths
        );

        // =================================================
        // NO PAID MONTH
        // =================================================

        if (paidMonths.length === 0) {
          throw new Error(
            `No paid month found for ${admissionNumber}`
          );
        }

        // =================================================
        // 5. GET ASSIGNED STUDENT FEES
        // =================================================

        const feeResponse =
          await axiosInstance.get(
            `/api/student-fee/${admissionNumber}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

        const studentFees =
          feeResponse.data || [];

        if (
          !Array.isArray(studentFees) ||
          studentFees.length === 0
        ) {
          throw new Error(
            `No assigned fee found for ${admissionNumber}`
          );
        }

        // =================================================
        // 6. FILTER CURRENT SESSION FEES
        // =================================================

        const currentSessionFees =
          studentFees.filter(
            (fee) =>
              String(fee.session || "") ===
              String(session)
          );

        if (currentSessionFees.length === 0) {
          throw new Error(
            `No assigned fee found for ${admissionNumber} in session ${session}`
          );
        }

        // =================================================
        // 7. CREATE ONLY PAID MONTH SCHEDULE
        // =================================================

        const schedules = [];

        paidMonths.forEach((paidMonth) => {
          currentSessionFees.forEach((fee) => {
            if (!fee.feeMasterId) {
              return;
            }

            schedules.push({
              month: paidMonth,

              feeMasterId:
                fee.feeMasterId,

              feeCode:
                fee.feeCode || "",

              feeName:
                fee.feeName || "",

              amount:
                Number(fee.amount || 0),
            });
          });
        });

        // =================================================
        // NO SCHEDULE DATA
        // =================================================

        if (schedules.length === 0) {
          throw new Error(
            `No schedule data found for ${admissionNumber}`
          );
        }

        // =================================================
        // 8. GENERATE FEE REQUEST
        // =================================================

        const payload = {
          admissionNumber:
            admissionNumber,

          admissionId:
            Number(admissionId),

          schedules:
            schedules,
        };

        console.log(
          `Generate Fee Payload - ${admissionNumber}:`,
          payload
        );

        // =================================================
        // 9. CALL EXISTING BACKEND
        // =================================================

        await axiosInstance.post(
          "/api/student-fee/generate",
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        successCount++;
      } catch (studentError) {
        failedCount++;

        console.log(
          `Schedule creation failed for ${admissionNumber}:`,
          studentError
        );

        failedStudents.push({
          admissionNumber:
            admissionNumber,

          message:
            studentError.response?.data?.message ||
            studentError.message ||
            "Schedule creation failed",
        });
      }
    }

    // =====================================================
    // RESULT
    // =====================================================

    if (
      successCount > 0 &&
      failedCount === 0
    ) {
      alert(
        `${successCount} student ka paid-month fee schedule successfully create ho gaya.`
      );
    } else if (
      successCount > 0 &&
      failedCount > 0
    ) {
      alert(
        `${successCount} student ka schedule create hua.\n` +
        `${failedCount} student ka schedule create nahi ho paya.\n\n` +
        `Failed Students:\n` +
        failedStudents
          .map(
            (item) =>
              `${item.admissionNumber} - ${item.message}`
          )
          .join("\n")
      );
    } else {
      alert(
        `Kisi bhi student ka fee schedule create nahi ho paya.\n\n` +
        failedStudents
          .map(
            (item) =>
              `${item.admissionNumber} - ${item.message}`
          )
          .join("\n")
      );
    }

    // =====================================================
    // CLEAR AFTER SUCCESS
    // =====================================================

    if (successCount > 0) {
      setSelectedStudents([]);
      setSelectedStudentDetails([]);

      setAdmissionDetails({});
      setAdmissionFeePayments([]);
      setAssignedFees([]);
      setSchedulePreview([]);

      await loadStudents();
    }
  } catch (error) {
    console.log(
      "Create schedule error:",
      error
    );

    alert(
      error.response?.data?.message ||
      error.message ||
      "Fee schedule create nahi ho paya."
    );
  } finally {
    setCreating(false);
  }
};



  // =====================================================
  // CLEAR
  // =====================================================

  const handleClear = () => {
    setSession("");
    setStudentClass("");
    setSection("");

    setStudents([]);
    setSelectedStudents([]);
    setSelectedStudentDetails([]);

    setAdmissionDetails({});
    setAdmissionFeePayments([]);
    setAssignedFees([]);
    setSchedulePreview([]);

    setSearch("");
  };

  // =====================================================
  // FORMAT DATE
  // =====================================================

  const formatDate = (date) => {
    if (!date) return "-";

    try {
      return new Date(date).toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        },
      );
    } catch {
      return date;
    }
  };

  // =====================================================
  // GET PAID MONTHS
  // =====================================================

  const getPaidMonths = () => {
    const paid = new Set();

    admissionFeePayments.forEach(
      (payment) => {
        try {
          let monthsData = [];

          if (Array.isArray(payment.paidMonths)) {
            monthsData =
              payment.paidMonths;
          } else if (
            typeof payment.paidMonths ===
            "string"
          ) {
            monthsData = JSON.parse(
              payment.paidMonths,
            );
          }

          if (!Array.isArray(monthsData)) {
            return;
          }

          monthsData.forEach((item) => {
            if (typeof item === "string") {
              paid.add(item);
            } else if (
              item?.month
            ) {
              paid.add(item.month);
            }
          });
        } catch (error) {
          console.log(error);
        }
      },
    );

    return Array.from(paid);
  };

  const paidMonths = getPaidMonths();

  // =====================================================
  // TOTALS
  // =====================================================

  const totalAssignedFee =
    assignedFees.reduce(
      (sum, fee) =>
        sum + Number(fee.amount || 0),
      0,
    );

  const totalAssignedPaid =
    assignedFees.reduce(
      (sum, fee) =>
        sum +
        Number(fee.paidAmount || 0),
      0,
    );

  const totalAssignedDue =
    assignedFees.reduce(
      (sum, fee) =>
        sum +
        Number(fee.dueAmount || 0),
      0,
    );

  // =====================================================
  // UI
  // =====================================================

  return (
    <>
      {/* =================================================
          HEADER
      ================================================= */}

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
                  <FaCalendarCheck
                    size={27}
                  />
                </div>

                <div>
                  <h5 className="mb-1 fw-bold text-dark">
                    Fee Schedule
                  </h5>

                  <div className="text-muted small">
                    Fees &nbsp;/&nbsp;
                    Student Fee Schedule
                  </div>
                </div>
              </div>

              <span
                className="badge rounded-pill px-3 py-2"
                style={{
                  backgroundColor:
                    "#eff6ff",
                  color: "#2563eb",
                  border:
                    "1px solid #bfdbfe",
                }}
              >
                <MdOutlineSchool className="me-1" />
                Fee Management
              </span>
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
              Home &nbsp;›&nbsp; Fees
              &nbsp;›&nbsp;
              <span className="text-primary fw-semibold">
                Fee Schedule
              </span>
            </small>
          </div>
        </div>
      </div>

      {/* =================================================
          FILTER
      ================================================= */}

      <div className="px-2">
        <div className="card shadow border-0 rounded-4 mb-4">
          <div className="card-header bg-white py-3">
            <div className="d-flex align-items-center">
              <div
                className="d-flex align-items-center justify-content-center rounded-3"
                style={{
                  width: "42px",
                  height: "42px",
                  background:
                    "linear-gradient(135deg,#2563eb,#3b82f6)",
                  color: "#fff",
                }}
              >
                <FaUsers size={22} />
              </div>

              <div className="ms-2">
                <h6 className="mb-0">
                  Select Students
                </h6>

                <small className="text-muted">
                  Class wise students load
                  karein
                </small>
              </div>
            </div>
          </div>

          <div className="card-body p-4">
            <div className="row g-3">

              {/* SESSION */}

              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold">
                  Session
                </label>

                <select
                  className="form-select"
                  value={session}
                  onChange={(e) => {
                    setSession(
                      e.target.value,
                    );

                    setStudents([]);
                    setSelectedStudents([]);
                    setSelectedStudentDetails([]);
                  }}
                >
                  <option value="">
                    Select Session
                  </option>

                  {sessions.map(
                    (item, index) => (
                      <option
                        key={
                          item.id ||
                          item.value ||
                          index
                        }
                        value={
                          item.value ||
                          item.name ||
                          item
                        }
                      >
                        {item.name ||
                          item.value ||
                          item}
                      </option>
                    ),
                  )}
                </select>
              </div>

              {/* CLASS */}

              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold">
                  Class
                </label>

                <select
                  className="form-select"
                  value={studentClass}
                  onChange={(e) => {
                    setStudentClass(
                      e.target.value,
                    );

                    setStudents([]);
                    setSelectedStudents([]);
                    setSelectedStudentDetails([]);
                  }}
                >
                  <option value="">
                    Select Class
                  </option>

                  {standards.map(
                    (item, index) => (
                      <option
                        key={
                          item.id ||
                          item.value ||
                          index
                        }
                        value={
                          item.value ||
                          item.name ||
                          item
                        }
                      >
                        {item.name ||
                          item.value ||
                          item}
                      </option>
                    ),
                  )}
                </select>
              </div>

              {/* SECTION */}

              <div className="col-xl-3 col-md-6">
                <label className="form-label fw-semibold">
                  Section
                </label>

                <select
                  className="form-select"
                  value={section}
                  onChange={(e) => {
                    setSection(
                      e.target.value,
                    );

                    setStudents([]);
                    setSelectedStudents([]);
                    setSelectedStudentDetails([]);
                  }}
                >
                  <option value="">
                    All Sections
                  </option>

                  {sections.map(
                    (item, index) => (
                      <option
                        key={
                          item.id ||
                          item.value ||
                          index
                        }
                        value={
                          item.value ||
                          item.name ||
                          item
                        }
                      >
                        {item.name ||
                          item.value ||
                          item}
                      </option>
                    ),
                  )}
                </select>
              </div>

              {/* BUTTONS */}

              <div className="col-xl-3 col-md-6 d-flex align-items-end gap-2">
                <button
                  className="btn btn-primary flex-grow-1"
                  onClick={
                    loadStudents
                  }
                  disabled={
                    loadingStudents
                  }
                >
                  {loadingStudents ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />
                      Loading...
                    </>
                  ) : (
                    <>
                      <FaSearch className="me-2" />
                      Load Students
                    </>
                  )}
                </button>

                <button
                  className="btn btn-outline-secondary"
                  onClick={handleClear}
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          STUDENT TABLE
      ================================================= */}

      <div className="px-2">
        <div className="card shadow border-0 rounded-4 mb-4">

          <div className="card-header bg-white py-3">
            <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

              <div className="d-flex align-items-center">
                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "42px",
                    height: "42px",
                    background:
                      "linear-gradient(135deg,#2563eb,#3b82f6)",
                    color: "#fff",
                  }}
                >
                  <MdMoney size={25} />
                </div>

                <div className="ms-2">
                  <h6 className="mb-0">
                    Student Fee Schedule
                  </h6>

                  <small className="text-muted">
                    Student select karke
                    fee details check karein
                  </small>
                </div>
              </div>

              <div className="d-flex gap-2">
                <span className="badge bg-info">
                  {students.length} Students
                </span>

                <span className="badge bg-success">
                  {selectedStudents.length} Selected
                </span>
              </div>
            </div>
          </div>

          {students.length > 0 && (
            <div className="card-body border-bottom">
              <div className="row align-items-center g-3">

                <div className="col-md-6">
                  <div className="input-group">
                    <span className="input-group-text bg-white">
                      <FaSearch />
                    </span>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search name, admission no, roll no..."
                      value={search}
                      onChange={(e) =>
                        setSearch(
                          e.target.value,
                        )
                      }
                    />
                  </div>
                </div>

                <div className="col-md-6 text-md-end">
                  <button
                    className="btn btn-outline-primary"
                    onClick={
                      handleSelectAll
                    }
                  >
                    <FaCheck className="me-2" />

                    {filteredStudents.length >
                      0 &&
                    filteredStudents.every(
                      (student) =>
                        selectedStudents.includes(
                          student.admissionNumber,
                        ),
                    )
                      ? "Unselect All"
                      : "Select All"}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="card-body px-0">
            <div className="table-responsive">

              <table className="table table-hover align-middle mb-0">

                <thead className="small text-center table-light">
                  <tr>
                    <th width="70">
                      Select
                    </th>

                    <th width="70">
                      #
                    </th>

                    <th>
                      Admission No
                    </th>

                    <th>
                      Student Name
                    </th>

                    <th>
                      Class
                    </th>

                    <th>
                      Section
                    </th>

                    <th>
                      Mobile
                    </th>

                    <th>
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="small text-center">

                  {loadingStudents ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="py-5"
                      >
                        <div className="spinner-border text-primary" />

                        <div className="mt-2 text-muted">
                          Loading students...
                        </div>
                      </td>
                    </tr>
                  ) : students.length ===
                    0 ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="py-5 text-muted"
                      >
                        <FaUsers
                          size={35}
                          className="mb-2"
                        />

                        <div>
                          Session, class
                          select karke
                          students load
                          karein.
                        </div>
                      </td>
                    </tr>
                  ) : filteredStudents.length ===
                    0 ? (
                    <tr>
                      <td
                        colSpan="8"
                        className="py-5 text-danger"
                      >
                        No student found.
                      </td>
                    </tr>
                  ) : (
                    filteredStudents.map(
                      (student, index) => {
                        const admissionNumber =
                          student.admissionNumber;

                        const selected =
                          selectedStudents.includes(
                            admissionNumber,
                          );

                        return (
                          <tr
                            key={
                              student.id ||
                              admissionNumber
                            }
                            className={
                              selected
                                ? "table-success"
                                : ""
                            }
                          >

                            <td>
                              <input
                                type="checkbox"
                                className="form-check-input"
                                checked={
                                  selected
                                }
                                onChange={() =>
                                  handleStudentSelect(
                                    student,
                                  )
                                }
                              />
                            </td>

                            <td>
                              {index + 1}
                            </td>

                            <td>
                              <span className="badge bg-light text-dark border">
                                {
                                  admissionNumber
                                }
                              </span>
                            </td>

                            <td className="fw-semibold">
                              {
                                student.firstName
                              }{" "}
                              {
                                student.middleName ||
                                ""
                              }{" "}
                              {
                                student.lastName ||
                                ""
                              }
                            </td>

                            <td>
                              {
                                student.studentClass ||
                                student.class ||
                                "-"
                              }
                            </td>

                            <td>
                              {student.section ||
                                "-"}
                            </td>

                            <td>
                              {
                                student.mobile ||
                                student.preferredNo ||
                                "-"
                              }
                            </td>

                            <td>
                              <span className="badge bg-success">
                                Active
                              </span>
                            </td>
                          </tr>
                        );
                      },
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* =================================================
          SELECTED STUDENT DETAILS
      ================================================= */}

      {selectedStudents.length > 0 && (
        <div className="px-2">

          <div className="card shadow border-0 rounded-4 mb-4">

            <div className="card-header bg-white py-3">

              <div className="d-flex align-items-center">

                <div
                  className="d-flex align-items-center justify-content-center rounded-3"
                  style={{
                    width: "42px",
                    height: "42px",
                    background:
                      "linear-gradient(135deg,#198754,#20c997)",
                    color: "#fff",
                  }}
                >
                  <FaUserGraduate
                    size={22}
                  />
                </div>

                <div className="ms-2">
                  <h6 className="mb-0">
                    Selected Student Fee Details
                  </h6>

                  <small className="text-muted">
                    Admission + payment +
                    assigned fee details
                  </small>
                </div>

              </div>
            </div>

            {loadingDetails ? (
              <div className="card-body text-center py-5">
                <div className="spinner-border text-primary" />

                <div className="mt-2 text-muted">
                  Loading admission and fee
                  details...
                </div>
              </div>
            ) : (
              <div className="card-body">

                {/* =================================================
                    ADMISSION DETAILS
                ================================================= */}

                <div className="row g-3 mb-4">

                  <div className="col-md-3">
                    <div className="border rounded-3 p-3 h-100">
                      <small className="text-muted">
                        Admission ID
                      </small>

                      <div className="fw-bold">
                        {admissionDetails?.id ||
                          "-"}
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="border rounded-3 p-3 h-100">
                      <small className="text-muted">
                        Admission Number
                      </small>

                      <div className="fw-bold">
                        {
                          admissionDetails?.admissionNumber ||
                          "-"
                        }
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="border rounded-3 p-3 h-100">
                      <small className="text-muted">
                        Session
                      </small>

                      <div className="fw-bold">
                        {
                          admissionDetails?.academicYear ||
                          admissionDetails?.session ||
                          session ||
                          "-"
                        }
                      </div>
                    </div>
                  </div>

                  <div className="col-md-3">
                    <div className="border rounded-3 p-3 h-100">
                      <small className="text-muted">
                        Class
                      </small>

                      <div className="fw-bold">
                        {
                          admissionDetails?.studentClass ||
                          admissionDetails?.standard ||
                          studentClass ||
                          "-"
                        }
                      </div>
                    </div>
                  </div>

                </div>

                {/* =================================================
                    PAID MONTHS
                ================================================= */}

                <div className="mb-4">

                  <div className="d-flex align-items-center mb-2">
                    <FaMoneyBillWave className="text-success me-2" />

                    <h6 className="mb-0 fw-bold">
                      Admission Fee Paid Months
                    </h6>
                  </div>

                  {paidMonths.length === 0 ? (
                    <div className="alert alert-warning mb-0">
                      No paid month found in
                      admission fee payment.
                    </div>
                  ) : (
                    <div className="d-flex flex-wrap gap-2">
                      {months.map((month) => {
                        const isPaid =
                          paidMonths.includes(
                            month,
                          );

                        return (
                          <span
                            key={month}
                            className={`badge px-3 py-2 ${
                              isPaid
                                ? "bg-success"
                                : "bg-light text-muted border"
                            }`}
                          >
                            {isPaid && (
                              <FaCheck className="me-1" />
                            )}

                            {month}
                          </span>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* =================================================
                    ADMISSION PAYMENT TABLE
                ================================================= */}

                <div className="mb-4">

                  <div className="d-flex align-items-center mb-2">
                    <FaReceipt className="text-primary me-2" />

                    <h6 className="mb-0 fw-bold">
                      Admission Fee Payment
                    </h6>
                  </div>

                  <div className="table-responsive">

                    <table className="table table-bordered table-hover align-middle text-center small">

                      <thead className="table-light">
                        <tr>
                          <th>
                            Payment ID
                          </th>

                          <th>
                            Admission ID
                          </th>

                          <th>
                            Session
                          </th>

                          <th>
                            Standard
                          </th>

                          <th>
                            Paid Months
                          </th>

                          <th>
                            Total Amount
                          </th>

                          <th>
                            Payment Mode
                          </th>

                          <th>
                            Payment Date
                          </th>
                        </tr>
                      </thead>

                      <tbody>

                        {admissionFeePayments.length ===
                        0 ? (
                          <tr>
                            <td
                              colSpan="8"
                              className="text-danger py-4"
                            >
                              No admission fee
                              payment found.
                            </td>
                          </tr>
                        ) : (
                          admissionFeePayments.map(
                            (payment) => {

                              let paymentMonths = [];

                              try {
                                if (
                                  Array.isArray(
                                    payment.paidMonths,
                                  )
                                ) {
                                  paymentMonths =
                                    payment.paidMonths;
                                } else if (
                                  typeof payment.paidMonths ===
                                  "string"
                                ) {
                                  paymentMonths =
                                    JSON.parse(
                                      payment.paidMonths,
                                    );
                                }
                              } catch {}

                              return (
                                <tr
                                  key={
                                    payment.id
                                  }
                                >

                                  <td>
                                    <span className="badge bg-primary">
                                      {
                                        payment.id
                                      }
                                    </span>
                                  </td>

                                  <td>
                                    {
                                      payment.admission
                                        ?.id ||
                                      payment.admissionId ||
                                      admissionDetails?.id ||
                                      "-"
                                    }
                                  </td>

                                  <td>
                                    {
                                      payment.session ||
                                      "-"
                                    }
                                  </td>

                                  <td>
                                    {
                                      payment.standard ||
                                      "-"
                                    }
                                  </td>

                                  <td>
                                    <div className="d-flex flex-wrap justify-content-center gap-1">

                                      {Array.isArray(
                                        paymentMonths,
                                      ) &&
                                      paymentMonths.length >
                                        0 ? (
                                        paymentMonths.map(
                                          (
                                            item,
                                            index,
                                          ) => (
                                            <span
                                              key={
                                                index
                                              }
                                              className="badge bg-success"
                                            >
                                              {typeof item ===
                                              "string"
                                                ? item
                                                : item?.month ||
                                                  item?.name ||
                                                  "-"}
                                            </span>
                                          ),
                                        )
                                      ) : (
                                        <span className="text-muted">
                                          -
                                        </span>
                                      )}

                                    </div>
                                  </td>

                                  <td className="fw-bold">
                                    ₹{" "}
                                    {Number(
                                      payment.totalAmount ||
                                        0,
                                    ).toFixed(
                                      2,
                                    )}
                                  </td>

                                  <td>
                                    <span className="badge bg-info">
                                      {
                                        payment.paymentMode ||
                                        "-"
                                      }
                                    </span>
                                  </td>

                                  <td>
                                    {formatDate(
                                      payment.paymentDate,
                                    )}
                                  </td>

                                </tr>
                              );
                            },
                          )
                        )}

                      </tbody>
                    </table>

                  </div>
                </div>

                {/* =================================================
                    ASSIGNED FEE TABLE
                ================================================= */}

                <div className="mb-4">

                  <div className="d-flex align-items-center mb-2">
                    <MdPayments className="text-success me-2" />

                    <h6 className="mb-0 fw-bold">
                      Assigned Student Fee
                    </h6>
                  </div>

                  <div className="table-responsive">

                    <table className="table table-bordered table-hover align-middle text-center small">

                      <thead className="table-light">
                        <tr>
                          <th>
                            #
                          </th>

                          <th>
                            Fee Code
                          </th>

                          <th>
                            Fee Name
                          </th>

                          <th>
                            Category
                          </th>

                          <th>
                            Batch
                          </th>

                          <th>
                            Amount
                          </th>

                          <th>
                            Paid
                          </th>

                          <th>
                            Due
                          </th>

                          <th>
                            Status
                          </th>

                          <th>
                            Assign Date
                          </th>

                          <th>
                            Paid Date
                          </th>
                        </tr>
                      </thead>

                      <tbody>

                        {assignedFees.length ===
                        0 ? (
                          <tr>
                            <td
                              colSpan="11"
                              className="text-danger py-4"
                            >
                              No assigned fee
                              found.
                            </td>
                          </tr>
                        ) : (
                          assignedFees.map(
                            (
                              fee,
                              index,
                            ) => (
                              <tr
                                key={
                                  fee.id ||
                                  index
                                }
                              >

                                <td>
                                  {index +
                                    1}
                                </td>

                                <td>
                                  <span className="badge bg-primary">
                                    {
                                      fee.feeCode ||
                                      "-"
                                    }
                                  </span>
                                </td>

                                <td className="fw-semibold">
                                  {
                                    fee.feeName ||
                                    "-"
                                  }
                                </td>

                                <td>
                                  {
                                    fee.feeCategory ||
                                    "-"
                                  }
                                </td>

                                <td>
                                  {
                                    fee.feeBatch ||
                                    "-"
                                  }
                                </td>

                                <td className="fw-bold">
                                  ₹{" "}
                                  {Number(
                                    fee.amount ||
                                      0,
                                  ).toFixed(
                                    2,
                                  )}
                                </td>

                                <td>
                                  <span className="badge bg-success">
                                    ₹{" "}
                                    {Number(
                                      fee.paidAmount ||
                                        0,
                                    ).toFixed(
                                      2,
                                    )}
                                  </span>
                                </td>

                                <td>
                                  <span className="badge bg-danger">
                                    ₹{" "}
                                    {Number(
                                      fee.dueAmount ||
                                        0,
                                    ).toFixed(
                                      2,
                                    )}
                                  </span>
                                </td>

                                <td>
                                  <span
                                    className={`badge ${
                                      fee.status ===
                                      "PAID"
                                        ? "bg-success"
                                        : fee.status ===
                                          "PARTIAL"
                                        ? "bg-warning text-dark"
                                        : "bg-danger"
                                    }`}
                                  >
                                    {fee.status ||
                                      "UNPAID"}
                                  </span>
                                </td>

                                <td>
                                  {formatDate(
                                    fee.assignDate,
                                  )}
                                </td>

                                <td>
                                  {formatDate(
                                    fee.paidDate,
                                  )}
                                </td>

                              </tr>
                            ),
                          )
                        )}

                      </tbody>

                      {assignedFees.length >
                        0 && (
                        <tfoot className="table-light">
                          <tr>
                            <th
                              colSpan="5"
                              className="text-end"
                            >
                              Total
                            </th>

                            <th>
                              ₹{" "}
                              {totalAssignedFee.toFixed(
                                2,
                              )}
                            </th>

                            <th className="text-success">
                              ₹{" "}
                              {totalAssignedPaid.toFixed(
                                2,
                              )}
                            </th>

                            <th className="text-danger">
                              ₹{" "}
                              {totalAssignedDue.toFixed(
                                2,
                              )}
                            </th>

                            <th
                              colSpan="3"
                            ></th>
                          </tr>
                        </tfoot>
                      )}

                    </table>

                  </div>
                </div>

                {/* =================================================
                    FINAL SCHEDULE PREVIEW
                ================================================= */}

                <div>

                  <div className="d-flex align-items-center mb-2">
                    <FaCalendarCheck className="text-primary me-2" />

                    <h6 className="mb-0 fw-bold">
                      Fee Schedule Preview
                    </h6>
                  </div>

                  <div className="table-responsive">

                    <table className="table table-bordered align-middle text-center small">

                      <thead className="table-light">
                        <tr>
                          <th>
                            Month
                          </th>

                          <th>
                            Fee Code
                          </th>

                          <th>
                            Fee Name
                          </th>

                          <th>
                            Amount
                          </th>

                          <th>
                            Admission Paid
                          </th>

                          <th>
                            Payment Date
                          </th>

                          <th>
                            Payment Mode
                          </th>

                          <th>
                            Fee Status
                          </th>
                        </tr>
                      </thead>

                      <tbody>

                        {schedulePreview.length ===
                        0 ? (
                          <tr>
                            <td
                              colSpan="8"
                              className="py-4 text-muted"
                            >
                              Schedule preview
                              available nahi
                              hai.
                            </td>
                          </tr>
                        ) : (
                          schedulePreview.map(
                            (
                              item,
                              index,
                            ) => (
                              <tr
                                key={`${item.month}-${item.feeId}-${index}`}
                              >

                                <td>
                                  <span
                                    className={`badge ${
                                      item.admissionPaid
                                        ? "bg-success"
                                        : "bg-light text-dark border"
                                    }`}
                                  >
                                    {item.admissionPaid && (
                                      <FaCheck className="me-1" />
                                    )}

                                    {
                                      item.month
                                    }
                                  </span>
                                </td>

                                <td>
                                  {
                                    item.feeCode
                                  }
                                </td>

                                <td className="fw-semibold">
                                  {
                                    item.feeName
                                  }
                                </td>

                                <td>
                                  ₹{" "}
                                  {Number(
                                    item.amount ||
                                      0,
                                  ).toFixed(
                                    2,
                                  )}
                                </td>

                                <td>
                                  {item.admissionPaid ? (
                                    <span className="badge bg-success">
                                      PAID
                                    </span>
                                  ) : (
                                    <span className="badge bg-danger">
                                      UNPAID
                                    </span>
                                  )}
                                </td>

                                <td>
                                  {formatDate(
                                    item.admissionPaymentDate,
                                  )}
                                </td>

                                <td>
                                  {
                                    item.admissionPaymentMode ||
                                    "-"
                                  }
                                </td>

                                <td>
                                  <span
                                    className={`badge ${
                                      item.feeStatus ===
                                      "PAID"
                                        ? "bg-success"
                                        : item.feeStatus ===
                                          "PARTIAL"
                                        ? "bg-warning text-dark"
                                        : "bg-danger"
                                    }`}
                                  >
                                    {
                                      item.feeStatus
                                    }
                                  </span>
                                </td>

                              </tr>
                            ),
                          )
                        )}

                      </tbody>
                    </table>
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      )}

      {/* =================================================
          STAT CARDS
      ================================================= */}

      {selectedStudents.length > 0 && (
        <div className="row g-3 mb-4 px-2">

          <div className="col-xl-4 col-md-6">
            <div className="premium-stat-card stat-blue shadow">
              <div className="stat-icon">
                <FaUsers />
              </div>

              <div className="stat-content">
                <span>
                  Selected Students
                </span>

                <h3>
                  {selectedStudents.length}
                </h3>

                <small>
                  Ready for schedule
                </small>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="premium-stat-card stat-green shadow">
              <div className="stat-icon">
                <FaMoneyBillWave />
              </div>

              <div className="stat-content">
                <span>
                  Assigned Fee
                </span>

                <h3>
                  ₹{" "}
                  {totalAssignedFee.toFixed(
                    2,
                  )}
                </h3>

                <small>
                  Total assigned fee
                </small>
              </div>
            </div>
          </div>

          <div className="col-xl-4 col-md-6">
            <div className="premium-stat-card stat-orange shadow">
              <div className="stat-icon">
                <MdPayments />
              </div>

              <div className="stat-content">
                <span>
                  Due Fee
                </span>

                <h3>
                  ₹{" "}
                  {totalAssignedDue.toFixed(
                    2,
                  )}
                </h3>

                <small>
                  Current assigned due
                </small>
              </div>
            </div>
          </div>

        </div>
      )}

      {/* =================================================
          CREATE BUTTON
      ================================================= */}

      {selectedStudents.length > 0 && (
        <div className="px-2 mb-5">

          <div className="card shadow border-0 rounded-4">

            <div className="card-body p-4">

              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">

                <div>
                  <div className="text-muted">
                    Selected Students
                  </div>

                  <strong className="text-primary fs-4">
                    {
                      selectedStudents.length
                    }
                  </strong>

                  <div className="small text-muted mt-1">
                    Admission paid months
                    ko assigned fee ke
                    saath map karke
                    schedule create hoga.
                  </div>
                </div>

                <button
                  className="btn btn-success px-4"
                  disabled={
                    selectedStudents.length ===
                      0 ||
                    creating
                  }
                  onClick={
                    handleCreateSchedule
                  }
                >
                  {creating ? (
                    <>
                      <span className="spinner-border spinner-border-sm me-2" />

                      Creating Schedule...
                    </>
                  ) : (
                    <>
                      <FaCalendarCheck className="me-2" />

                      Create Fee Schedule
                    </>
                  )}
                </button>

              </div>

            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default FeeScheduleStudentwise;

