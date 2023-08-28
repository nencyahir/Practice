import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';
import { RiEdit2Fill } from 'react-icons/ri'; 
import { MdDelete } from 'react-icons/md';
import '../styles/LectureTable.css';

function LectureTable() {
  const [lectures, setLectures] = useState([]);
  const [selectedLecture, setSelectedLecture] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const lecturesPerPage = 4;

  useEffect(() => {
    fetchLectures();
  }, []);

  const fetchLectures = async () => {
    try {
      const response = await axios.get("http://localhost:3001/lectures");
      setLectures(response.data);
    } catch (error) {
      console.error('Error fetching lectures:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/lectures/${id}`);
      fetchLectures(); 
    } catch (error) {
      console.error('Error deleting lecture:', error);
    }
  };

  const handleEdit = (lecture) => {
    setSelectedLecture(lecture);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedLecture(null);
    setShowModal(false);
  };

  const handleUpdate = async () => {
    try {
      await axios.patch(`http://localhost:3001/lectures/${selectedLecture.id}`, {
        lecture: selectedLecture,
      });
      fetchLectures();
      handleCloseModal();
    } catch (error) {
      console.error('Error updating lecture:', error);
    }
  };

  const indexOfLastLecture = currentPage * lecturesPerPage;
  const indexOfFirstLecture = indexOfLastLecture - lecturesPerPage;
  const currentLectures = lectures.slice(indexOfFirstLecture, indexOfLastLecture);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <h2>Lectures Table</h2>
      <table className="custom-table">
        <thead>
          <tr>
            <th>Subject</th>
            <th>Duration</th>
            <th>Date and Time</th>
            <th>Title</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentLectures.map((lecture) => (
            <tr key={lecture.id}>
              <td>{lecture.subject}</td>
              <td>{lecture.duration} minutes</td>
              <td>{new Date(lecture.datetime).toLocaleString()}</td>
              <td>{lecture.title}</td>
              <td>{lecture.description}</td>
              <td>
                <button onClick={() => handleEdit(lecture)} className="btn btn-warning btn-sm m-2"><RiEdit2Fill /> Edit</button>
                <button onClick={() => handleDelete(lecture.id)} className="btn btn-danger btn-sm"><MdDelete /> Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        {Array.from({ length: Math.ceil(lectures.length / lecturesPerPage) }, (_, index) => (
          <button key={index} onClick={() => paginate(index + 1)} className={currentPage === index + 1 ? 'active' : ''}>
            {index + 1}
          </button>
        ))}
      </div>

      {selectedLecture && (
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Lecture</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group>
                <Form.Label>Title</Form.Label>
                <Form.Control type="text" value={selectedLecture.title} onChange={(e) => setSelectedLecture({ ...selectedLecture, title: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Description</Form.Label>
                <Form.Control as="textarea" rows={4} value={selectedLecture.description} onChange={(e) => setSelectedLecture({ ...selectedLecture, description: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Subject</Form.Label>
                <Form.Control type="text" value={selectedLecture.subject} onChange={(e) => setSelectedLecture({ ...selectedLecture, subject: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Date and Time</Form.Label>
                <Form.Control type="datetime-local" value={selectedLecture.datetime} onChange={(e) => setSelectedLecture({ ...selectedLecture, datetime: e.target.value })} />
              </Form.Group>
              <Form.Group>
                <Form.Label>Duration (minutes)</Form.Label>
                <Form.Control type="number" value={selectedLecture.duration} onChange={(e) => setSelectedLecture({ ...selectedLecture, duration: parseInt(e.target.value) })} />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
          </Modal.Footer>

        </Modal>
      )}
    </div>
  );
}

export default LectureTable;
