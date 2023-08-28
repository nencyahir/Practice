import React, { useState } from 'react';
import axios from 'axios';

const LectureCreationForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');


  const teacherId = JSON.parse(localStorage.getItem("currentUser")).id; // Get the user's ID from localStorage
  console.log(teacherId,"jhbdfcjbjdf")
  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const requestData = {
        lecture: {
          title: title,
          description: description,
          teacher_id: teacherId, // Replace with the actual teacher's ID
        },
      };

      const response = await axios.post("http://localhost:3001/lectures", requestData);

      console.log('Lecture created:', response.data);
      // You can perform additional actions like showing success messages or redirecting.
    } catch (error) {
      console.error('Error creating lecture:', error);
      if (error.response) {
        console.log('API Response:', error.response.data); // Log the API response for debugging
      }
    }
  };

  return (
    <div>
      <h2>Create Lecture</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Title" value={title} onChange={handleTitleChange} />
        <textarea
          placeholder="Description"
          value={description}
          onChange={handleDescriptionChange}
        />
        <button type="submit">Create Lecture</button>
      </form>
    </div>
  );
};

export default LectureCreationForm;
