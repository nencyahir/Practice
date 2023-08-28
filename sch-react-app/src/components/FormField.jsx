import React from "react";

const FormField = ({ label, type, name, value, onChange, children }) => {
  return (
    <div className="form-group">
      <label style={{ marginBottom: '5px', marginTop: "20px" }}>{label}</label>
      {type === "select" ? (
        <select className="form-control" name={name} value={value} onChange={onChange}>
          {children}
        </select>
      ) : (
        <input
          className="form-control"
          type={type}
          name={name}
          value={value}
          onChange={onChange}
        />
      )}
    </div>
  );
};

export default FormField;
