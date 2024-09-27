import React from 'react';

const LectureForm = ({ lecture, lectureIndex, handleLectureChange, handleStudentChange, addStudent, handleFileChange }) => {
    return (
        <div className="form-group mb-3">
            <div className="card-body">
                <h5 className="card-title">Lecture {lectureIndex + 1}</h5>

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
                            placeholder="e.g., Math Lecture"
                            required
                        />
                    </div>

                    <div className="col-md-6">
                        <label htmlFor={`lecture-subject-${lectureIndex}`}>Subject</label>
                        <input
                            type="text"
                            className="form-control"
                            id={`lecture-subject-${lectureIndex}`}
                            name="subject"
                            value={lecture.subject}
                            onChange={(e) => handleLectureChange(lectureIndex, e)}
                            placeholder="e.g., Mathematics"
                            required
                        />
                    </div>
                </div>

                <div className="form-group mt-3">
                    <label htmlFor={`lecture-document-${lectureIndex}`}>Upload Document</label>
                    <input
                        type="file"
                        className="form-control"
                        id={`lecture-document-${lectureIndex}`}
                        onChange={(e) => handleFileChange(lectureIndex, e)}
                    />
                </div>

                

                {/* Students Section */}
                <h6 className="mt-4">Students:</h6>
                {lecture.students.map((student, studentIndex) => (
                    <div key={studentIndex} className="form-group mb-3">
                        <div className="row">
                            <div className="col-md-6">
                                <label htmlFor={`student-name-${lectureIndex}-${studentIndex}`}>Student Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id={`student-name-${lectureIndex}-${studentIndex}`}
                                    name="name"
                                    value={student.name}
                                    onChange={(e) => handleStudentChange(lectureIndex, studentIndex, e)}
                                    placeholder="e.g., John Doe"
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor={`student-email-${lectureIndex}-${studentIndex}`}>Student Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    id={`student-email-${lectureIndex}-${studentIndex}`}
                                    name="email"
                                    value={student.email}
                                    onChange={(e) => handleStudentChange(lectureIndex, studentIndex, e)}
                                    placeholder="e.g., john.doe@example.com"
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
        </div>
    );
};

export default LectureForm;
