import React from "react";

export const FormGroup = ({ type, label, value, onChange }) => {
  return (
    <div className="form-group">
      <label className="text-light">{label}</label>
      <input
        name={`${label.toLowerCase()}`}
        type={type}
        className="form-control"
        value={value}
        onChange={onChange}
      />
    </div>
  );
};
