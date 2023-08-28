import React from 'react';
import "../styles/MainDashboard.css"

export default function MainDashboard() {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <div style={{ textAlign: 'center' }}>
        <img
          src="https://cdn.pixabay.com/photo/2021/03/19/12/37/man-6107457_1280.png"
          alt="Student Image"
          style={{  width: '100vw', height: '100vh' }}
        />
        <div className="slider-text">Welcome to Bacancy School</div>
      </div>
    </div>
  );
}
