import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import { loginForm } from "../components/FormValidation";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = { email, password };
    const validationErrors = loginForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:3001/login", {
          user: { email, password },
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("login successful");
        
            const userData = response.data.data.user;
            console.log("userdata", userData);
        
            localStorage.setItem("currentUser", JSON.stringify(userData));
            localStorage.setItem("loggedInUserToken", userData.token);
            localStorage.setItem("isLoggedIn", "true"); 
        
            setIsLoggedIn(true); 
            onLogin();
        
            navigate("/");
          } else {
            console.error("login failed");
          }
        })
        
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "800px", height: "auto", display: "flex", flexDirection: "row" }}>
        <div style={{ flex: 1 }}>
          <img
            src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?w=2000"
            alt="Login"
            style={{ maxWidth: "100%" }}
          />
        </div>
        <div style={{ flex: 1, marginLeft: "20px" }}>
          <h2 className="mb-4">Login Page</h2>
          <form onSubmit={handleSubmit}>
            <FormField
              type="email"
              label="Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <div className="text-danger">{errors.email}</div>}

            <FormField
              type="password"
              label="Password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <div className="text-danger">{errors.password}</div>
            )}

            <div className="text-center" style={{ marginTop: "20px" }}>
              <CustomButton type="submit" color="primary">
                Login
              </CustomButton>
            </div>
          </form>
          <div className="login-link">
            <Link to="/register">Register here</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
