import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import LectureTable from "../pages/LectureTable";
import Profile from "../pages/Profile";

const PrivateRoutes = ({ role }) => {
  if (role === "teacher") {
    return (
      <Routes>
         <Route path="/" element={<MainDashboard />} />
        <Route path="/lectures" element={<LectureTable />} />
        <Route path="/profile" element={<Profile />} />
      
      </Routes>
    );
  } else if (role === "student") {
    return (
      <Routes>
        <Route path="/" element={<LectureTable />} />
      </Routes>
    );
  } else {
    return <Navigate to="/login" />;
  }
};

export default PrivateRoutes;
