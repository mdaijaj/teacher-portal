const express= require('express')
const teacherController= require('../controller/index')
const uploadDocument= require('../middleware/index')
const app = express.Router();



app.post('/api/teachers', uploadDocument.upload.array('documents'), teacherController.addTeacher);
app.post('/api/teachers/:teacherId/lectures', teacherController.addLector);
app.post('/api/teachers/:teacherId/lectures/:lectureIndex/students', teacherController.addStudents)
app.get('/api/teachers/:teacherId', teacherController.teacherDetails)
app.get('/api/all_teachers' , teacherController.allTeachersList)

module.exports = app;
