import { useEffect, useState } from "react";

import { Outlet, useLocation } from "react-router-dom";

import CardHead from "../../components/SuperDashboard/CardHead";
import StudentAttendanceNotice from "../../components/SuperDashboard/StudentAttendanceNotice";
import AdmissionFeeToday from "../../components/SuperDashboard/AdmissionFeeToday";
import BirthdayActivitiesCollection from "../../components/SuperDashboard/BirthdayActivitiesCollection";
import Greetings from "../../components/SuperDashboard/Greetings";

const SuperDashboard = () => {
  const location = useLocation();
  const showCards = location.pathname === "/";

  return (
    <>
      {/* <Greetings /> */}

      <CardHead />

      <StudentAttendanceNotice />

      <AdmissionFeeToday />

      <BirthdayActivitiesCollection />
      <Outlet />
    </>
  );
};

export default SuperDashboard;
