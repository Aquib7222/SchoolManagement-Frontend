// menuItems.js
import React from "react";

import cogwheel from "../../assets/icon/cogwheel.png";
import school from "../../assets/icon/school.png";
import fee from "../../assets/icon/money.png";
import student from "../../assets/icon/man.png";
import teacher from "../../assets/icon/teacher.png";
import attendance from "../../assets/icon/attendance.png";
import search from "../../assets/icon/search.png";
import report from "../../assets/icon/health-check.png";
import library from "../../assets/icon/library.png";
import checklist from "../../assets/icon/checklist.png";
import bus from "../../assets/icon/bus-school.png";
import settings from "../../assets/icon/settings.png";
import sports from "../../assets/icon/Sports.png";
import tc from "../../assets/icon/TC.png";

export const allMenuItems = {
  MenuSetup: {
    label: "Menu Setup",
    icon: <img src={settings} alt="setup" style={{ width: 20, height: 20 }} />,
    userType: ["admin"],
    subMenus: [
      { label: "Create Module", path: "/create_module" },
      { label: "Create Menu", path: "/menu/create" },
      { label: "Module List", path: "/menu/module_list" },
      { label: "Module wise Menu", path: "/menu/module_wise" },
      { label: "School Module Mapping", path: "/menu/school_module_mapping" },
      { label: "School Mapping", path: "/menu/school_mapping" },

      { label: "UserGroup Mapping", path: "/menu/usergroup_mapping" },
      { label: "Individual Mapping", path: "/menu/individual_mapping" },

      { label: "Bulk Menu Edit", path: "/menu/bulk_edit" },
      { label: "Bulk Menu Access Manage", path: "/menu/bulk_access" },
      {
        label: "Copy Menu UsetType Wise",
        path: "/menu/copy_menu_usertype_wise",
      },
    ],
  },
  Setup: {
    label: "Setup",
    icon: <img src={cogwheel} alt="setup" style={{ width: 20, height: 20 }} />,
    userType: ["SUPERADMIN", "schooladmin"],
    subMenus: [
      { label: "School Info", path: "/setup/school-info" },
      { label: "User Management", path: "/setup/users" },
      { label: "Leave Year Calendar", path: "/setup/leave_year_calendar" },
      { label: "Section Assign", path: "/setup/section_assign" },
      { label: "Accounts Creation", path: "/setup/account_creations" },
      {
        label: "Account Creation Report",
        path: "/setup/account_creation_report",
      },
      { label: "Admission Fee Setup", path: "/setup/admission_fee" },
      { label: "HR & Payroll", path: "/setup/hr_payroll" },
      { label: "Section Shuffling", path: "/setup/section_shuffling" },
      { label: "Promoted Student", path: "/setup/promoted_student" },
      { label: "Discontinue Student", path: "/setup/discontinue" },
      { label: "Periods", path: "/setup/periods" },
      { label: "Holidays", path: "/setup/holidays" },
      { label: "Holiday Calendar", path: "/setup/holidays_calendar" },
      { label: "School Activity", path: "/setup/school_activity" },
      { label: "Class Seat Vacant", path: "/setup/class_vacant" },
      { label: "Roll No Generation", path: "/setup/roll_no_generation" },
      { label: "Subjects", path: "/setup/subject" },
      { label: "Assign Subject To Class", path: "/setup/subject/assign" },

      { label: "Auto Time Table Generator", path: "/setup/time_table" },
      {
        label: "Time Table",
        subSubMenu: [
          { label: "Add Time Table", path: "/setup/time_table_add" },
          { label: "Show Time Table", path: "/setup/time_table_show" },
        ],
      },
    ],
  },
  Admission: {
    label: "Admission",
    icon: <img src={school} alt="setup" style={{ width: 20, height: 20 }} />,
    userType: ["SUPERADMIN", "schooladmin"],
    subMenus: [
      // { label: "Online New Registration", path: "/admission/new_registration" },
      { label: "New Admissions", path: "/admission/new_admission" ,},
      { label: "Manage Admissions", path: "/admission/manage" },
      { label: "Admissions List", path: "/admission/list" },
      

      {
        label: "Documents",
        subSubMenu: [
          {
            label: "Upload/View Documents",
            path: "/admission/document_view_upload",
          },
          {
            label: "Document List",
            path: "/admission/documents",
          },
        ],
      },

      {
        label: "Fee Collection",
        subSubMenu: [
          { label: "Admission Fee Payment", path: "/admission/fee_payment" },
          { label: "Generate Receipt", path: "/admission/generate_receipt" },
          { label: "Pending Admission", path: "/admission/pending_admission" },
        ],
      },
      { label: "Admission Cancel", path: "/admission/cancel" },
      { label: "Create Accounts", path: "/admission/create_accounts" },
      { label: "New Accounts", path: "/admission/new_accounts" },
      { label: "Admit Cards", path: "/admission/admit_card" },
      { label: "Print New ID", path: "/admission/new_Id" },

      {
        label: "Reports",
        subSubMenu: [
          {
            label: "Confirm Admission Report",
            path: "/admission/confirm_admission_report",
          },
          { label: "Admission Report", path: "/admission/report" },
        ],
      },
      {
        label: "Enquiry Process",
        subSubMenu: [
          { label: "Enquiry", path: "/admission/enquiry" },
          { label: "Enquiry Report", path: "/admission/enquiry_report" },
          {
            label: "Convert To Admission",
            path: "/admission/convert_Admission",
          },
        ],
      },
      {
        label: "Admission Setup",
        subSubMenu: [
          {
            label: "Available Classes",
            path: "/admission/available_classes",
          },
          {
            label: "Verification Status",
            path: "/admission/document_verification",
          },
        ],
      },
    ],
  },
  Fees: {
    label: "Fees",
    icon: <img src={fee} alt="setup" style={{ width: 20, height: 20 }} />,
    userType: ["SUPERADMIN", "schooladmin"],
    subMenus: [
      {
        label: "Create Fee Structure",
        path: "/fee/setup/fee_structure",
      },
      {
        label: "Assign Fee to Students",
        path: "/fee/assignment/students",
      },
      {
        label: "Generate Fee Studentwise",
        path: "/fee/generate_fee",
      },
      {
        label: "Fee Collection",
        path: "/fee/fee_collection",
      },
      {
        label: "Fee Ledger",
        path: "/fee/feeledger",
      },
      {
        label: "Delete Fee Receipt",
        path: "/fee/delete_fee_receipt",
      },
      {
        label: "Fee Batch Category Student Mapping",
        path: "/fee/batch_cat_allocation",
      },
      {
        label: "Fee Reports",
        subSubMenu: [
          {
            label: "Daily Collection Report",
            path: "/fee/reports/daily_collection",
          },
          {
            label: "Monthly Collection Report",
            path: "/fee/reports/monthly_collection",
          },

          { label: "Student-wise Report", path: "/fee/reports/student_wise" },
          { label: "Fee Due Report", path: "/fee/due_reports" },

          { label: "Concession Report", path: "/fee/reports/concession" },
          { label: "Transport Fee Report", path: "/fee/reports/transport" },
          {
            label: "Cancelled Receipts Report",
            path: "/fee/reports/cancelled",
          },
        ],
      },
      {
        label: "Online Payment",
        subSubMenu: [
          {
            label: "Configure Payment Gateway",
            path: "/fee/online/configure_gateway",
          },
          { label: "Payment History", path: "/fee/online/history" },
          { label: "Verify Payment", path: "/fee/online/verify" },
          { label: "Handle Failed Transactions", path: "/fee/online/failed" },
          { label: "Process Refunds", path: "/fee/online/refunds" },
          { label: "Payment Summary by Mode", path: "/fee/online/summary" },
        ],
      },
      {
        label: "Fine & Penalty",
        subSubMenu: [
          { label: "Define Late Fee Rules", path: "/fee/fine/late_rules" },
          { label: "Auto Apply Late Fee", path: "/fee/fine/auto_apply" },
          { label: "Waive Fine", path: "/fee/fine/waive" },
          { label: "Manual Fine Entry", path: "/fee/fine/manual_entry" },
          { label: "Fine Collection Report", path: "/fee/fine/report" },
        ],
      },
      {
        label: "Discounts & Concessions",
        subSubMenu: [
          { label: "Create Discount Schemes", path: "/fee/discounts/create" },
          { label: "Apply Student Discounts", path: "/fee/discounts/apply" },
          { label: "View Discount History", path: "/fee/discounts/history" },
          { label: "Cancel Concession", path: "/fee/discounts/cancel" },
        ],
      },
      {
        label: "Advance/Wallet",
        subSubMenu: [
          { label: "Add Advance Amount", path: "/fee/advance/add" },
          { label: "Adjust Against Fee", path: "/fee/advance/adjust" },
          { label: "View Wallet Balance", path: "/fee/advance/balance" },
          { label: "Refund Advance", path: "/fee/advance/refund" },
        ],
      },
      {
        label: "Fee Settings",
        subSubMenu: [
          {
            label: "Define Academic Year",
            path: "/fee/settings/academic_year",
          },
          { label: "Enable Auto Fine", path: "/fee/settings/auto_fine" },
          {
            label: "Enable Notifications",
            path: "/fee/settings/notifications",
          },
          { label: "Set Fee Due Reminders", path: "/fee/settings/reminders" },
        ],
      },
    ],
  },

  Student: {
    label: "Student",
    icon: <img src={student} alt="setup" style={{ width: 20, height: 20 }} />,
    userType: ["SUPERADMIN", "schooladmin", "TEACHER"],
    subMenus: [
      { label: "Students", path: "/student/list" ,userType: ["SUPERADMIN", "schooladmin","TEACHER"],},
      {
        label: "Siblings",
        subSubMenu: [
          { label: "Add Siblings", path: "/student/add_siblings" },
          { label: "Delete Siblings", path: "/student/delete_siblings" },
        ],
      },
      { label: "Leave letter", path: "/student/leave_letter" },

      { label: "Id Card", path: "/student/Id" },
      { label: "Student Documents", path: "/student/documents" },

      { label: "PTM Report", path: "/student/ptm" },
      { label: "Transport Details", path: "/student/transports" },
      {
        label: "Certificates",
        subSubMenu: [
          { label: "Issue Certificates", path: "/student/issue_certificates" },
          {
            label: "Saved Certificate Reports ",
            path: "/student/saved_certificates",
          },
          {
            label: "Make Certificate Request Reports ",
            path: "/student/make_certificates",
          },
          { label: "Student Label Printing", path: "/student/label_printing" },
        ],
      },
    ],
  },

  Teacher: {
    label: "Teacher",
    icon: <img src={teacher} alt="setup" style={{ width: 20, height: 20 }} />,
    userType: ["SUPERADMIN", "schooladmin"],
    subMenus: [
      { label: "Teachers", path: "/teacher/list" },
      { label: "Assign Subject To Teacher", path: "/subject/teacher_assign" },
      { label: "Teacher Account Login", path: "/teacher/lesson_plan" },
      { label: "Teacher Attendance", path: "/teacher/attendance" },
      {
        label: "Teacher Attendance Report ",
        path: "/teacher/attendance_report",
      },
      // { label: "Teacher PayScale Master", path: "/teacher/payscale" },
      { label: "Teacher Notice Board", path: "/teacher/notice_board" },
      { label: "Class Teacher Mapping", path: "/teacher/class_mapping" },
      // {
      //   label: "Multiple Class Teacher Mapping",
      //   path: "/teacher/multiple_mapping",
      // },
      {
        label: "Teacher Assessment",
        subSubMenu: [
          { label: "Add Assesement", path: "/teacher/add_assessment" },
          { label: "Assessment Reports ", path: "/teacher/assessment_report" },
          {
            label: "Teacher Standard Mapping",
            path: "/teacher/standard_mapping",
          },
        ],
      },
    ],
  },
  Attendance: {
    label: "Attendence",
    icon: (
      <img src={attendance} alt="setup" style={{ width: 20, height: 20 }} />
    ),
    userType: ["SUPERADMIN", "schooladmin"],
    subMenus: [
      {
        label: "Teachers Attendence",
        userType: ["SUPERADMIN", "schooladmin"],
        subSubMenu: [
          { label: "Staff In/Out", path: "/attendance/teacher/staff_in_out" },
          {
            label: "Attendence Log Upload ",
            path: "/attendance/teacher/log_upload",
          },
          {
            label: "Monthly Attendence Report",
            path: "/attendance/teacher/monthly_report",
          },
          {
            label: "Teacher Absent Report",
            path: "/attendance/teacher/absent_report",
          },
          {
            label: "Today Teacher Attendence",
            path: "/attendance/teacher/absent",
          },
        ],
      },
      {
        label: "Student Attendence",
        subSubMenu: [
          { label: "Mark Attendence", path: "/attendance/student/mark" },
          { label: "view Attendence", path: "/attendance/student/view" },
          {
            label: "Attendence Count Report",
            path: "/attendance/student/count_report",
          },
          {
            label: "Daily Attendence Report",
            path: "/attendance/student/daily_attendance",
          },

          {
            label: "MonthlyAttendence Report",
            path: "/attendance/student/monthly_report",
          },
        ],
      },
    ],
  },
  Attendence_Student: {
    label: "Attendence",
    icon: (
      <img src={attendance} alt="setup" style={{ width: 20, height: 20 }} />
    ),
    // path: "/student_attendance",
    userType: ["Teacher"],
    subMenus: [
      { label: "Mark Attendence", path: "/student_attendance/mark" },
      {
        label: "Monthly Attendence Report",
        path: "/student_attendance/report",
      },
      { label: "Monthly Attendence View", path: "/student_attendance/view" },
    ],
  },
  Search: {
    label: "Search",
    icon: <img src={search} alt="setup" style={{ width: 20, height: 20 }} />,
    userType: ["SUPERADMIN", "schooladmin"],
    subMenus: [
      { label: "Students", path: "/search/students" },
      { label: "Teachers", path: "/search/teachers" },
      { label: "Parents", path: "search/parents" },
    ],
  },
  Report: {
    label: "Report",
    icon: <img src={report} alt="setup" style={{ width: 20, height: 20 }} />,
    userType: ["SUPERADMIN", "schooladmin", "Teacher"],
    path: "/report",
  },
  Library: {
    label: "Library",
    icon: <img src={library} alt="setup" style={{ width: 20, height: 20 }} />,
    path: "/library",
    userType: ["SUPERADMIN", "schooladmin", "Teacher", "Librarian"],
  },
  Assessment: {
    label: "Assessment",
    icon: <img src={library} alt="setup" style={{ width: 20, height: 20 }} />,
    userType: ["SUPERADMIN", "schooladmin", "Teacher"],
    subMenus: [
      {
        label: "Assessments",
        subSubMenu: [
          { label: "Create Assessment", path: "/add_assessment" },
          { label: "Schedule ", path: "/assessment/schedule" },
          {
            label: "Assessment List",
            path: "/assessment/list",
          },
        ],
        
        userType: ["SUPERADMIN", "schooladmin", "Teacher"],
      },
      {
        label: "Evaluation",
        subSubMenu: [
          { label: "Marks Entry", path: "/marks_entry" },
          { label: "Grade Calculation", path: "/grade_calculation" },
          
        ],
        
        userType: ["SUPERADMIN", "schooladmin", "Teacher"],
      },
      {
        label: "Results",
        subSubMenu: [
          { label: "Report Cards", path: "/report_cards" },
          { label: "Publish Results", path: "/publish_results" },
          
        ],
        
        userType: ["SUPERADMIN", "schooladmin", "Teacher"],
      },
      {
        label: "Reports",
        subSubMenu: [
          { label: "Performance Analysis", path: "/performance_analysis" },
          { label: "Export Reports", path: "/export_reports" },
          
        ],
        
        userType: ["SUPERADMIN", "schooladmin", "Teacher"],
      },
     
    ],
  },

  Transport: {
    label: "Transport",
    icon: <img src={bus} alt="setup" style={{ width: 20, height: 20 }} />,
    path: "/transport",
    userType: ["SUPERADMIN", "schooladmin"],
    subMenus: [
      { label: "Vehicle Management", path: "/transport/vehicles" },
      { label: "Route Management", path: "/transport/routes" },
      { label: "Stop Management", path: "/transport/stops" },
      {
        label: "Assign Route to Vehicle",
        path: "/transport/assign-vehicle-route",
      },
      { label: "Driver Management", path: "/transport/drivers" },
      { label: "Assign Driver to Vehicle", path: "/transport/assign-driver" },
      {
        label: "Student Transport Allocation",
        path: "/transport/student-allocation",
      },
      { label: "Transport Fee", path: "/transport/fees" },
      {
        label: "Pickup & Drop Timings",
        path: "/transport/pickup-drop-timings",
      },
      { label: "Transport Attendance", path: "/transport/attendance" },
      { label: "Vehicle Driver", path: "/transport/vehicle_driver_route" },
      {
        label: "Transport Reports",
        subSubMenu: [
          {
            label: "Route Wise Student Report",
            path: "/transport/reports/route-wise",
          },
          {
            label: "Student Allocation Report",
            path: "/transport/reports/student-allocation",
          },
          {
            label: "Vehicle Usage Report",
            path: "/transport/reports/vehicle-usage",
          },
          {
            label: "Transport Attendance Report",
            path: "/transport/reports/attendance",
          },
        ],
      },
    ],
  },
  TC: {
    label: "TC",
    icon: <img src={tc} alt="setup" style={{ width: 20, height: 20 }} />,
    userType: ["SUPERADMIN", "schooladmin", "Student"],
    subMenus: [{ label: "TC Generate", path: "/tc_generate" }],
  },
  Sports: {
    label: "Sports",
    icon: <img src={sports} alt="setup" style={{ width: 20, height: 20 }} />,
    path: "/sports",
    userType: ["SUPERADMIN", "schooladmin", "Teacher", "Student"],
  },
  Results: {
    label: "Result",
    icon: <img src={sports} alt="setup" style={{ width: 20, height: 20 }} />,
    path: "/result",
    userType: ["Teacher", "Student"],
    // subMenus: [
    //   { label: "Result", path: "/result" },

    // ],
  },
};

export const roleBasedMenus = {
  SUPERADMIN: [
    "Setup",
    "Admission",
    "Fees",
    "Student",
    "Teacher",
    "Attendance",
    "Search",
    "Report",
    "Library",
    "Assessment",
    "Transport",
    "TC",
    "Sports",
  ],
  admin: [
    "MenuSetup",
    "Setup",
    "Admission",
    "Fees",
    "Student",
    "Teacher",
    "Attendance",
    "Search",
    "Report",
    "Library",
    "Assessment",
    "Transport",
    "TC",
  ],
  schooladmin: ["Setup", "Admission", "Fees", "Student", "Teacher"],
  Teacher: ["Student", "Attendance", "Assessment", "Report"],
  student: ["Student"],
};
