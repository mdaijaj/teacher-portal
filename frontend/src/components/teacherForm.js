import React, { useState } from 'react';
import LectureForm from './lectorForm';
import { useNavigate } from 'react-router-dom';

const TeacherForm = () => {
    const navigate= useNavigate();
    const [teacher, setTeacher] = useState({
        name: '',
        email: '',
        lectures: [{ title: '', subject: '', students: [], uploadDocument: null }]
    });


    const handleLectureChange = (lectureIndex, event) => {
        const { name, value } = event.target;
        const updatedLectures = [...teacher.lectures];
        updatedLectures[lectureIndex][name] = value;
        setTeacher({ ...teacher, lectures: updatedLectures });
    };


    const handleFileChange = (lectureIndex, event) => {
        const file = event.target.files[0];
        const updatedLectures = [...teacher.lectures];
        updatedLectures[lectureIndex].uploadDocument = file;
        setTeacher({ ...teacher, lectures: updatedLectures });
    };


    const addLecture = () => {
        const newLecture = { title: '', subject: '', students: [], uploadDocument: null };
        setTeacher({ ...teacher, lectures: [...teacher.lectures, newLecture] });
    };


    const addStudent = (lectureIndex) => {
        const updatedLectures = [...teacher.lectures];
        updatedLectures[lectureIndex].students.push({ name: '', email: '' });
        setTeacher({ ...teacher, lectures: updatedLectures });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', teacher.name);
        formData.append('email', teacher.email);
        formData.append('lectures', JSON.stringify(teacher.lectures.map(lecture => {
            const { uploadDocument, ...rest } = lecture;
            return rest;
        })));

        teacher.lectures.forEach((lecture, index) => {
            if (lecture.uploadDocument) {
                formData.append('documents', lecture.uploadDocument);
            }
        });

        const response = await fetch('/api/teachers', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        console.log(data);
        if(data){
            navigate("/teachers_list")
        }

    };


    return (
        <div className='container'>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="teacher-name">Teacher Name</label>
                <input
                    type="text"
                    className="form-control"
                    id="teacher-name"
                    value={teacher.name}
                    onChange={(e) => setTeacher({ ...teacher, name: e.target.value })}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="teacher-email">Teacher Email</label>
                <input
                    type="email"
                    className="form-control"
                    id="teacher-email"
                    value={teacher.email}
                    onChange={(e) => setTeacher({ ...teacher, email: e.target.value })}
                    required
                />
            </div>
            

            {/* Render multiple lectures */}
            {teacher.lectures.map((lecture, lectureIndex) => (
                <LectureForm
                    key={lectureIndex}
                    lecture={lecture}
                    lectureIndex={lectureIndex}
                    handleLectureChange={handleLectureChange}
                    handleStudentChange={(lectureIndex, studentIndex, e) => {
                        const { name, value } = e.target;
                        const updatedLectures = [...teacher.lectures];
                        updatedLectures[lectureIndex].students[studentIndex][name] = value;
                        setTeacher({ ...teacher, lectures: updatedLectures });
                    }}
                    addStudent={addStudent}
                    handleFileChange={handleFileChange}
                />
            ))}

            <button type="button" className="btn btn-primary mt-3" onClick={addLecture}>
                Add Lecture
            </button>

            <button type="submit" className="btn btn-primary mt-3">
                Submit
            </button>
        </form>
        </div>
    );
};

export default TeacherForm;
