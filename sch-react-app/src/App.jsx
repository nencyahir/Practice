import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import PrivateRoutes from './routes/PrivateRoutes';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [key, setKey] = useState(0);
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  const userRole = currentUser ? currentUser.role : null;

  const handleLogin = () => {
    setKey(key + 1);
  };

  return (
      <Router>
        <>
          <Header />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={<PrivateRoutes key={key} role={userRole} />}
            />
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
          </Routes>
        </>
      </Router>
 
  );
}

export default App;
