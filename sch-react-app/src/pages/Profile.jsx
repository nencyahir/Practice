import React, { useState, useEffect } from 'react';
import { BsPencilSquare } from 'react-icons/bs'; // Import the edit icon
import Modal from 'react-modal';
import axios from 'axios';

export default function Profile() {
  const [userData, setUserData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedUserData, setEditedUserData] = useState({
    name: '',
    email: '',
    // Add other editable fields here
  });

  useEffect(() => {
    const storedUserData = JSON.parse(localStorage.getItem('currentUser'));

    if (storedUserData) {
      setUserData(storedUserData);
    }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
    setEditedUserData({
      name: userData.name,
      email: userData.email,
      // Initialize other editable fields here
    });
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    axios.put('/signup/edit', editedUserData)
      .then(response => {
        const updatedUserData = response.data;
        setUserData(updatedUserData);
        closeModal();
      })
      .catch(error => {
        console.error('Error updating user data:', error);
        // Handle error if necessary
      });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setEditedUserData({
      ...editedUserData,
      [name]: value,
    });
  };

  return (
    <div style={styles.container}>
      {userData ? (
        <div style={styles.profile}>
          <h1>User Profile</h1>
          <p>ID: {userData.id}</p>
          <p>Email: {userData.email}</p>
          <p>Name: {userData.name}</p>
          <p>Role: {userData.role}</p>

          <button onClick={openModal}>
            <BsPencilSquare /> Edit
          </button>

          <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
            <h2>Edit Profile</h2>
            <form onSubmit={handleFormSubmit}>
              <label>
                Name:
                <input
                  type="text"
                  name="name"
                  value={editedUserData.name}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={editedUserData.email}
                  onChange={handleInputChange}
                />
              </label>
              <button type="submit">Save Changes</button>
              <button onClick={closeModal}>Cancel</button>
            </form>
          </Modal>
        </div>
      ) : (
        <p>No user data found in local storage.</p>
      )}
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    background: '#f0f0f0',
  },
  profile: {
    padding: '20px',
    background: 'white',
    borderRadius: '10px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)',
  },
};
