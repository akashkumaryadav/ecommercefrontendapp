import React, { Fragment } from "react";

export const FormGroup = ({
  type,
  label,
  value,
  onChange,
  errors,
  placeholder,
  required,
}) => {
  console.log(errors);
  return (
    <Fragment>
      <input
        type={type}
        name={label.toLowerCase()}
        onChange={onChange}
        className="px-2 w-full text-2xl py-5 border-b-2 text-black"
        placeholder={placeholder}
        required
      />
      {errors.length !== 0 && (
        <p className="text-sm text-red-400">
          {errors.filter((er) => er.match(label))}
        </p>
      )}
    </Fragment>
  );
};
