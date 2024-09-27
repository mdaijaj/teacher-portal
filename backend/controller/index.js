const TeacherModel= require('../model/index');
    
  
  exports.addTeacher= async (req, res) => {
    try {
      const { name, email, lectures } = req.body;
      const parsedLectures = JSON.parse(lectures);
  
      
      // Add uploaded document paths to each lecture
      const lecturesWithDocuments = parsedLectures.map((lecture, index) => ({
        ...lecture,
        uploadDocument: req.files[index] ?  req.files[index].path : null
      }));
  
      const teacher = new TeacherModel({
        name,
        email,
        lectures: lecturesWithDocuments
      });
      await teacher.save();
      res.status(201).json(teacher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  
  // Add a new lecture to an existing teacher
  exports.addLector= async (req, res) => {
    try {
      const { teacherId } = req.params;
      const { title, subject } = req.body;
      const teacher = await TeacherModel.findById(teacherId);
  
      teacher.lectures.push({ title, subject });
      await teacher.save();
  
      res.status(201).json(teacher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  
  // Add a student to a specific lecture
exports.addStudents= async (req, res) => {
    try {
      const { teacherId, lectureIndex } = req.params;
      const { name, email } = req.body;
  
      const teacher = await TeacherModel.findById(teacherId);
      teacher.lectures[lectureIndex].students.push({ name, email });
      await teacher.save();
  
      res.status(201).json(teacher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  
  // Get a teacher and all their lectures and students
  exports.teacherDetails= async (req, res) => {
    try {
      const { teacherId } = req.params;
      const teacher = await TeacherModel.findById(teacherId);
      res.json(teacher);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
  
  
  // Get a teacher and all their lectures and students
 exports.allTeachersList= async (req, res) => {
      try {
        const teacher = await TeacherModel.find();
        res.json(teacher);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
  }