import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import FormField from "../components/FormField";
import CustomButton from "../components/CustomButton";
import registrationForm from "../components/FormValidation"; // Make sure to provide the correct path to FormValidation

import "../styles/Register.css"; // Import a CSS file for custom styles

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const validateName = (inputName) => {
    if (inputName.trim() === "") {
      return "Name is required";
    }
    return "";
  };

  const validateEmail = (inputEmail) => {
    if (!inputEmail) {
      return "Email is required";
    }
    // Implement email validation logic here
    // Return an error message if email is invalid, otherwise return an empty string
    return "";
  };

  const validatePassword = (inputPassword) => {
    if (!inputPassword) {
      return "Password is required";
    }
    if (inputPassword.length <= 5) {
      return "Enter more than 5 characters for the password";
    }
    // Implement password validation logic here
    // Return an error message if password is invalid, otherwise return an empty string
    return "";
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = { name, email, password, role };
    const validationErrors = registrationForm(formData);

    if (Object.keys(validationErrors).length === 0) {
      axios
        .post("http://localhost:3001/signup", {
          user: { name, email, password, role }, // Include role in the request
        })
        .then((response) => {
          if (response.status === 200) {
            console.log("Signup successful");
            navigate("/login");
          } else {
            console.error("Signup failed");
          }
        })
        .catch((error) => {
          console.error("Error during signup:", error);
        });
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className="register-page">
      <div className="card p-4 form-container" style={{  height: "80vh" }}>
        <div className="row align-items-center">
          <div className="col-md-6">
            <img
              src="https://img.freepik.com/free-vector/register-concept-illustration_114360-727.jpg?w=2000"
              alt="Register"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
              }}
            />
          </div>
          <div className="col-md-6">
            <h2 className="mb-4">Register Page</h2>
            <form onSubmit={handleSubmit}>
              <FormField
                type="text"
                label="Name"
                name="name"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setErrors({ ...errors, name: validateName(e.target.value) }); 
                }}
                style={{ width: "70%" }}
              />
              {errors.name && (
                <div className="text-danger">{errors.name}</div>
              )}

              <FormField
                type="email"
                label="Email"
                name="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setErrors({ ...errors, email: validateEmail(e.target.value) });
                }}
                style={{ width: "70%" }}
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}

              <FormField
                type="password"
                label="Password"
                name="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setErrors({
                    ...errors,
                    password: validatePassword(e.target.value),
                  });
                }}
                style={{ width: "70%" }}
              />
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}
              <label className="role-label">Role</label><br></br>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                style={{ width: "70%" }}
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                {/* Add more role options as needed */}
              </select>

              <div style={{ marginTop: "20px" }}>
                <CustomButton
                  type="submit"
                  color="primary"
                  className="signup-button"
                  style={{ width: "70%" }}
                >
                  Sign Up
                </CustomButton>
              </div>
            </form>
            <div className="login-link">
              <p className="m-2">
                Already have an account? <Link to="/login">Login here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
