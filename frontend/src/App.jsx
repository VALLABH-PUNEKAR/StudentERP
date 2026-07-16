import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from  './components/Login.jsx'
import Fl from './components/FacultyLogin.jsx'
import Sd from './components/StudentDashboard.jsx'
import Fd from './components/FacultyDashboard.jsx'
import Md from './components/MainDashboard.jsx'
import Fmd from './components/FmainDashboard.jsx'
import Pd from './components/Profile.jsx'
import Lms from './components/StudentLMS.jsx'
import Sa from './components/StudentAttendance.jsx'
import S_Syllabus from './components/StudentSyllabus.jsx'
import S_Notes from './components/StudentNotes.jsx'
import Subject from './components/Subjects.jsx'
import Subject_init from './components/SubjectInitial.jsx'
import Subs from './components/Subjects.jsx'
import Sexam from './components/Exams.jsx'
import SNotes from './components/SNotes.jsx';
import SAssignment from './components/SAssignment.jsx'
import FProfile from './components/FProfile.jsx'
import FStudents from './components/FacultyStudents.jsx'
import F_lms from './components/FacultyLMS.jsx'
import F_L from './components/FacultyList.jsx'
import AddStudents from './components/AddStudents.jsx';
import Credentials from './components/HodPages/Credentials.jsx';
import StudentBatch from './components/HodPages/StudentBatch.jsx';
import SubmitStudent from './components/HodPages/SubmitStudent.jsx';

import ProtectedRoute from './security/ProtectedRoute.jsx';


function App() {
  const [count, setCount] = useState(0)
  

  return (
    
    <div>
       <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/FacultyLogin" element={<Fl />} />
        <Route element={<ProtectedRoute allowedrole={'Student'} />}>
          <Route path="/StudentDashboard" element={<Sd />}>
            <Route index element={<Md/>}/>
            <Route path="MainDashboard" element={<Md/>}/>
            <Route path="Profile" element={<Pd/>}></Route>
            <Route path="Exams" element={<Sexam/>}/>
            <Route path="StudentLMS" element={<Lms/>}>
              <Route index  element={<Subject_init/>}/>
              <Route path="SubjectInitial" element={<Subject_init/>}/>
              <Route path="Subjects" element={<Subs/>}/>
              <Route path="StudentSyllabus" element={<S_Syllabus/>}/>
              <Route path="Notes" element={<SNotes/>}/>
              <Route path="Assignment" element={<SAssignment/>}/>
            </Route>
            <Route path="StudentAttendance" element={<Sa/>}/>
          </Route>
         </Route>
         <Route element={<ProtectedRoute allowedrole={['Faculty','Hod']} />}>
          <Route path="/FacultyDashboard" element={<Fd />}>
            <Route index element={<Fmd/>}/>
            <Route path="FmainDashboard" element={<Fmd/>}/>
            <Route path="FProfile" element={<FProfile/>}/>
            <Route path="FacultyStudents" element={<FStudents/>}/>
            <Route path="FacultyLMS" element={<F_lms/>}/>
            <Route element={<ProtectedRoute allowedrole={'Hod'} />}>
              <Route path="FacultyList" element={<F_L/>}/>
              <Route path="AddStudents" element={<AddStudents/>}>
                <Route index element={<Credentials/>}/>
                <Route path="Credentials" element={<Credentials/>}/>
                <Route path="StudentBatch" element={<StudentBatch/>}/>
                <Route path="SubmitStudent" element={<SubmitStudent/>}/>

              </Route>
            </Route>
            
          </Route>
         </Route>
       
      </Routes>
    </BrowserRouter>
     
    </div>
  )
}

export default App
