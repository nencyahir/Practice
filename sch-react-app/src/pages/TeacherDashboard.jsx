import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { markAttendance } from '../redux/attendance/attendanceActions';

const TeacherDashboard = () => {
  const [students, setStudents] = useState([]);
  const dispatch = useDispatch();
  const attendanceState = useSelector(state => state);

  useEffect(() => {
    fetchStudentRecords();
  }, []);

  const fetchStudentRecords = async () => {
    try {
      const response = await axios.get('http://localhost:3001/students');
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching student records:', error);
    }
  };

  const handleAttendanceChange = (studentId, isPresent) => {
    dispatch(markAttendance(studentId, isPresent));
  };

  return (
    <div>
      <h1>Teacher Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Attendance</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>
                <input
                  type="checkbox"
                  checked={attendanceState[student.id] || false}
                  onChange={e => handleAttendanceChange(student.id, e.target.checked)}
                />
                {attendanceState[student.id] && <span>Present</span>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TeacherDashboard;
