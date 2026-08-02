
import { useEffect, useState } from "react";

import { Outlet, useLocation } from "react-router-dom";




import StudentAttendanceNotice from "../../components/SuperDashboard/StudentAttendanceNotice";
import AdmissionFeeToday from "../../components/SuperDashboard/AdmissionFeeToday";
import BirthdayActivitiesCollection from "../../components/SuperDashboard/BirthdayActivitiesCollection";
import Greetings from "../../components/SuperDashboard/Greetings";
import CardHead from "../../components/TeacherDashboard/CardHead";
import TimeTableAttendanceNotice from "../../components/TeacherDashboard/TimeTableAttendanceNotice";
import ClassesHomeworkNotice from "../../components/TeacherDashboard/ClassesHomeworkNotice";

const TeacherDashboard = () => {
  const location = useLocation();
  const showCards = location.pathname === "/";
  

  

  return (
    <>
      <Greetings/>

     <CardHead/>

      {/* SECOND ROW STUDENT CLASS WISE ,ATTENDANCE OVERVIEW AND NOTIVE BOARD  */}

      <TimeTableAttendanceNotice/>

      {/* THIRD ROW WHERE SHOW RECENT ADMISSIONS ,FEE PENDING STUDENTS,TODAYS EVENTS  */}

      <ClassesHomeworkNotice/>

     
      <Outlet />
    </>
  );
};

export default TeacherDashboard;
