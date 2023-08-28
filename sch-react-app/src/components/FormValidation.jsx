const registrationForm = (formData) => {
    let errors = {};
  
    if (!formData.name.trim()) {
      errors.name = "*Name is required.";
    }
  
   
  
    if (!formData.email.trim()) {
      errors.email = "*Email is required.";
    }
  
    if (!formData.password.trim()) {
      errors.password = "*Password is required.";
    } else if (formData.password.trim().length < 6) {
      errors.password = "*Password must be at least 6 characters long.";
    }
  
    return errors; 
  };
  
  const loginForm = (formData) => {
    let errors = {};
    if (!formData.email.trim()) {
      errors.email = "*Email is required.";
    }
  
    if (!formData.password.trim()) {
      errors.password = "*Password is required.";
    }
  
    return errors;
  };
  
  export default registrationForm;
  export { loginForm };
  