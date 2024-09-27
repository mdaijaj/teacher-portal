import {Route, Routes} from 'react-router-dom';
import TeacherList from './all_teachers'
import TeacherDetails from './teacher_details';
import TeacherForm from './teacherForm';
import Home from './home'

const Routing=()=>{

  return(
    <>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/teachers_list" element={<TeacherList/>} />
          <Route path="/add_teacher" element={<TeacherForm/>} />
          <Route path="/teacher_details/:id" element={<TeacherDetails/>} />
          <Route path="/update_teacher/:id" element={<TeacherDetails/>} />
        </Routes>
    </>
    )
}


export default Routing;