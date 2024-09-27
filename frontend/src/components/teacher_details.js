import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const TeacherDetails = () => {
    const { id } = useParams();
    const [showPdfViewer, setShowPdfViewer] = useState(false);

    const [teacher, setTeacher] = useState({
        name: '',
        email: '',
        lectures: [
            {
                title: '',
                subject: '',
                uploadDocument: '',
                students: [{ name: '', email: '' }]
            }
        ]
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

  


    useEffect(() => {
        const fetchTeacher = async () => {
            try {
                const response = await axios.get(`/api/teachers/${id}`);
                setTeacher(response.data); 
                setLoading(false);
            } catch (error) {
                console.error('Error fetching teacher data:', error);
                setError('Error fetching teacher data');
                setLoading(false);
            }
        };

        fetchTeacher();
    }, [id]);


    const handleTeacherChange = (e) => {
        setTeacher({ ...teacher, [e.target.name]: e.target.value });
    };

    const handleLectureChange = (index, e) => {
        const newLectures = [...teacher.lectures];
        newLectures[index][e.target.name] = e.target.value;
        setTeacher({ ...teacher, lectures: newLectures });
    };

    const handleStudentChange = (lectureIndex, studentIndex, e) => {
        const newLectures = [...teacher.lectures];
        newLectures[lectureIndex].students[studentIndex][e.target.name] = e.target.value;
        setTeacher({ ...teacher, lectures: newLectures });
    };

    const addLecture = () => {
        setTeacher({
            ...teacher,
            lectures: [...teacher.lectures, { title: '', subject: '', uploadDocument: '', students: [{ name: '', email: '' }] }]
        });
    };

    const addStudent = (lectureIndex) => {
        const newLectures = [...teacher.lectures];
        newLectures[lectureIndex].students.push({ name: '', email: '' });
        setTeacher({ ...teacher, lectures: newLectures });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/teachers/${id}`, teacher);
            alert('Teacher updated successfully');
            console.log('Response:', response.data);
        } catch (error) {
            console.error('Error updating teacher:', error);
            alert('Error updating teacher');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    const handleViewPdf = () => {
    setShowPdfViewer(!showPdfViewer);
  };


    return (
        <div className="container">
            <h2 className="text-center mb-4">Update Teacher Details</h2>
            <form onSubmit={handleSubmit}>

                {/* Teacher Details */}
                <div className="form-group mb-3">
                    <label htmlFor="name">Teacher Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={teacher.name}
                        onChange={handleTeacherChange}
                        required
                    />
                </div>
                <div className="form-group mb-3">
                    <label htmlFor="email">Teacher Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={teacher.email}
                        onChange={handleTeacherChange}
                        required
                    />
                </div>


                {/* Lectures Section */}
                {teacher.lectures.map((lecture, lectureIndex) => (
                    <div key={lectureIndex} className="form-group mb-3">
                        <h5>Lecture {lectureIndex + 1}</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor={`lecture-title-${lectureIndex}`}>Lecture Title</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`lecture-title-${lectureIndex}`}
                                    name="title"
                                    value={lecture.title}
                                    onChange={(e) => handleLectureChange(lectureIndex, e)}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor={`lecture-subject-${lectureIndex}`}>Lecture Subject</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`lecture-subject-${lectureIndex}`}
                                    name="subject"
                                    value={lecture.subject}
                                    onChange={(e) => handleLectureChange(lectureIndex, e)}
                                    required
                                />
                            </div>
                        </div>


                        {lecture.uploadDocument ? (
                            <div className="form-group mt-3">
                                <strong>Uploaded Document:</strong>
                                <br />

                                {/* If it's an image */}
                                {lecture.uploadDocument.endsWith('.jpg') || lecture.uploadDocument.endsWith('.png') ? (
                                    <img
                                    src={`http://localhost:5000/${lecture.uploadDocument}`}
                                    alt="Lecture document"
                                    style={{ maxWidth: '200px', maxHeight: '200px', marginTop: '10px' }}
                                    />
                                ) : lecture.uploadDocument.endsWith('.pdf') ? (
                                    <>
                                    <button onClick={handleViewPdf} style={{ marginTop: '10px' }}>
                                        {showPdfViewer ? 'Hide PDF' : 'View PDF'}
                                    </button>

                                    {showPdfViewer && (
                                        <div style={{ height: '600px', marginTop: '10px' }}>
                                        <h4>PDF Document Viewer</h4>
                                        <Worker workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}>
                                            <Viewer fileUrl={`http://localhost:5000/${lecture.uploadDocument}`} />
                                        </Worker>
                                        </div>
                                    )}
                                    </>
                                ) : (
                                    <a href={`http://localhost:5000/${lecture.uploadDocument}`} target="_blank" rel="noopener noreferrer">
                                    View Document
                                    </a>
                                )}
                            </div>
                        ) : (
                            <p>No document uploaded.</p>
                        )}


                        {/* Students Section */}
                        {lecture.students.map((student, studentIndex) => (
                            <div key={studentIndex} className="form-group mb-3">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label htmlFor={`student-name-${lectureIndex}-${studentIndex}`}>
                                            Student Name
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id={`student-name-${lectureIndex}-${studentIndex}`}
                                            name="name"
                                            value={student.name}
                                            onChange={(e) =>
                                                handleStudentChange(lectureIndex, studentIndex, e)
                                            }
                                            required
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label htmlFor={`student-email-${lectureIndex}-${studentIndex}`}>
                                            Student Email
                                        </label>
                                        <input
                                            type="email"
                                            className="form-control"
                                            id={`student-email-${lectureIndex}-${studentIndex}`}
                                            name="email"
                                            value={student.email}
                                            onChange={(e) =>
                                                handleStudentChange(lectureIndex, studentIndex, e)
                                            }
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            onClick={() => addStudent(lectureIndex)}
                        >
                            Add Student
                        </button>
                    </div>
                ))}

                <button type="button" className="btn btn-info mb-4" onClick={addLecture}>
                    Add Lecture
                </button>

                <div className="col-md-6 mx-auto">
                    <button type="submit" className="btn btn-success btn-block">
                        Update Teacher
                    </button>
                </div>
            </form>
        </div>
    );
};


export default TeacherDetails;
