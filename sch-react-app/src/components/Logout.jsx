import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    axios
      .delete('http://localhost:3001/users/sign_out', {
        headers: {
          "content-type": "application/json",
          "Authorization": localStorage.getItem("loggedInUserToken")
        }
      })
      .then((response) => {
        if (response.status === 200) {
          console.log('Logout successful');
          // Clear local storage
          localStorage.removeItem("loggedInUserToken");
          localStorage.removeItem("loggedInUserId");
          navigate('/Login'); // Redirect after clearing local storage
        } else {
          console.error('Logout failed');
        }
      })
      .catch((error) => {
        console.error('Error during logout:', error);
      });
  };

  return (
    <div>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Logout;

