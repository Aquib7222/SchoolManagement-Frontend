import React from 'react'
import Card from '../../components/StudentDashboard/Card'
import AnnouncementTimetable from '../../components/StudentDashboard/AnnouncementTimetable'
import TermMarksAttendance from '../../components/StudentDashboard/TermMarksAttendance'
import NotificationListener from '../../components/StudentDashboard/NotificationListener'

const StudentDashboard = () => {
  return (
    <>
    {/* <NotificationListener/> */}
    <Card/>
    <AnnouncementTimetable/>
    <TermMarksAttendance/>
    
    
    </>
  )
}

export default StudentDashboard