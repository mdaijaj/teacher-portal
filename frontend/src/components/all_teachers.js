import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import '../teachers_style.css'

const TeacherList = () => {
    const [teachers, setTeachers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [showPdfViewer, setShowPdfViewer] = useState(false);


    const fetchTeachers = async () => {
        try {
            const response = await axios.get('/api/all_teachers');
            setTeachers(response.data); 
            setLoading(false);
        } catch (error) {
            console.error("Error fetching data: ", error);
            setError("Failed to fetch data.");
            setLoading(false);
        }
    };

    const teacherDetails = (id) => {
        navigate(`/teacher_details/${id}`);
    };
    
    const handleViewPdf = () => {
        setShowPdfViewer(!showPdfViewer);
      };


    useEffect(() => {
        fetchTeachers();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }


    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">All Teachers, Lectors and student list</h2>
            {teachers.length > 0 ? (
                <div className="accordion" style={{width: "80%"}} id="teacherAccordion">
                    {teachers.map((teacher, teacherIndex) => (
                        <div className="card" key={teacherIndex}>
                            <div className="card-header" id={`teacherHeading-${teacherIndex}`}>
                                <h5 className="mb-0">
                                    
                                <button
                                    className="btn btn-info custom-button-blink"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target={`#collapseTeacher-${teacherIndex}`}
                                    aria-expanded="true"
                                    aria-controls={`collapseTeacher-${teacherIndex}`}
                                >
                                    {teacher.name} ({teacher.email})
                                </button>
                                
                                    <button
                                        className="custom-button-details float-right" 
                                        type="button"
                                        onClick={() => teacherDetails(teacher._id)}
                                    >
                                    Teacher Details
                                </button>
                                </h5>
                            </div>

                            <div
                                id={`collapseTeacher-${teacherIndex}`}
                                className="collapse"
                                aria-labelledby={`teacherHeading-${teacherIndex}`}
                                data-parent="#teacherAccordion"
                            >
                                <div className="card-body">
                                    <h6>Lectures:</h6>
                                    {teacher.lectures.length > 0 ? (
                                        <ul className="list-group">
                                            {teacher.lectures.map((lecture, lectureIndex) => (
                                                <li key={lectureIndex} className="list-group-item">
                                                    <strong>{lecture.title}</strong> - {lecture.subject}


                                                    {/* Display the uploaded document (image URL) if available */}
                                                    {lecture.uploadDocument ? (
                                                            <div className="form-group mt-3">
                                                                <strong>Uploaded Document:</strong>
                                                                <br />

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

                                                    {/* Students List */}
                                                    <h6 className="mt-2">Students:</h6>
                                                    {lecture.students.length > 0 ? (
                                                        <ul className="list-group">
                                                            {lecture.students.map((student, studentIndex) => (
                                                                <li key={studentIndex} className="list-group-item">
                                                                    {student.name} ({student.email})
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    ) : (
                                                        <p>No students enrolled.</p>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p>No lectures available.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <p>No teachers available.</p>
            )}
        </div>
    );
};

export default TeacherList;
