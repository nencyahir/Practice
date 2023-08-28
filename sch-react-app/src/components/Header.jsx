import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Modal from 'react-bootstrap/Modal';
import { FiLogOut } from 'react-icons/fi';
import { FaChalkboardTeacher } from 'react-icons/fa';
import { Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Header() {
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState('');
  const [duration, setDuration] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isLectureAdded, setIsLectureAdded] = useState(false); // Added state


  const navigate = useNavigate();

  const handleModalToggle = () => {
    setShowModal(!showModal);
  };

  const handleLogout = () => {
    localStorage.removeItem('currentUser');
    navigate('/login');
  };

  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userRole = currentUser ? currentUser.role : null;

  const handleSaveClass = async () => {
    try {
      const requestData = {
        lecture: {
          subject: subject,
          duration: duration,
          datetime: dateTime,
          title: title,
          description: description,
          teacher_id: currentUser.id,
        },
      };

      const response = await axios.post('http://localhost:3001/lectures', requestData);

      console.log('Lecture created:', response.data);
      setIsLectureAdded(true); // Set lecture added flag
      handleModalToggle();
      setTimeout(() => {
        setIsLectureAdded(false); // Reset lecture added flag after 2 seconds
        navigate('/lectures'); // Redirect to lectures page
      }, 2000);
      

      handleModalToggle();
    } catch (error) {
      console.error('Error creating lecture:', error);
      if (error.response) {
        console.log('API Response:', error.response.data);
      }
    }
  };

  return (
    <>
     {isLectureAdded && (
        <div className="alert alert-success m-2" role="alert">
          Lecture added successfully!
        </div>
      )}
      <Navbar expand="lg" className="bg-primary">
        <Container fluid>
          <Navbar.Brand href="#">
            <FaChalkboardTeacher className="text-light" size="30" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              {/* <Link className="text-decoration-none text-light m-2" to="/">
                Dashboard
              </Link> */}
              {userRole === 'teacher' && (
                <>
                <Link className="text-decoration-none text-light m-2" to="/">
                Dashboard
              </Link>
              <Link className="text-decoration-none text-light m-2" onClick={handleModalToggle}>
                  Classes
                </Link>
                <Link className="text-decoration-none text-light m-2" to="/lectures">
                  Lecture Planning
                </Link>
                <Link className="text-decoration-none text-light m-2" to="/profile">
                   Profile
                </Link>
                </>
                
              )}
              {userRole === 'student' && (
                <>
                <Link className="text-decoration-none text-light m-2" to="/">
                Dashboard
              </Link>
                <Link className="text-decoration-none text-light m-2" to="/register">
                  Courses
                </Link>
                </>
              )}
            </Nav>
            <Nav className="ms-auto me-2" navbarScroll>
              {currentUser && (
                <div className="text-light d-flex align-items-center">
                  <Link className="text-decoration-none text-light m-2" to="/login" onClick={handleLogout}>
                    <FiLogOut size="25" className="me-2" />
                  </Link>
                </div>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal show={showModal} onHide={handleModalToggle}>
        <Modal.Header closeButton>
          <Modal.Title className="text-center">Add Lecture</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
          <Form.Group controlId="subject">
              <Form.Label>Subject</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Subject Name"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="duration">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="date">
              <Form.Label>Date and Time</Form.Label>
              <Form.Control
                type="datetime-local"
                name="selectedDate"
                min={new Date().toISOString().split('T')[0]}
                value={dateTime}
                onChange={(e) => setDateTime(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Lecture Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Enter Lecture Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleModalToggle}>
            Close
          </Button>
          <Button variant="danger" onClick={handleSaveClass}>
            Add Lecture
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Header;
