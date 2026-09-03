import { useEffect, useState } from "react";

import { Outlet, useLocation } from "react-router-dom";

import StudentAttendanceNotice from "../../components/SuperDashboard/StudentAttendanceNotice";
import AdmissionFeeToday from "../../components/SuperDashboard/AdmissionFeeToday";
import BirthdayActivitiesCollection from "../../components/SuperDashboard/BirthdayActivitiesCollection";
import Greetings from "../../components/SuperDashboard/Greetings";
import CardHead from "../../components/TeacherDashboard/CardHead";
import TimeTableAttendanceNotice from "../../components/TeacherDashboard/TimeTableAttendanceNotice";
import ClassesHomeworkNotice from "../../components/TeacherDashboard/ClassesHomeworkNotice";
import TeacherSelfAttendanceCard from "../Teacher/TeacherSelfAttendanceCard";

const TeacherDashboard = () => {
  const location = useLocation();
  const showCards = location.pathname === "/";

  return (
    <>
      <TeacherSelfAttendanceCard />

      <CardHead />

      <TimeTableAttendanceNotice />

      <ClassesHomeworkNotice />

      <Outlet />
    </>
  );
};

export default TeacherDashboard;
