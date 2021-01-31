import { makeStyles, TextField } from "@material-ui/core";
import React, { Fragment } from "react";

const useStyles = makeStyles({
  inputBox: {
    marginBottom: 10,
  },
});

export const FormGroup = ({
  type,
  label,
  value,
  onChange,
  errors,
  placeholder,
  required,
}) => {
  const classes = useStyles();
  return (
    <Fragment>
      <input
        type={type}
        name={label.toLowerCase()}
        onChange={onChange}
        className="px-2 w-full text-2xl py-5 border-b-2"
        placeholder={placeholder}
        required
      />
      {errors.length != 0 && (
        <p className="text-sm text-red-500 opacity-80">
          {errors.filter((er) => er.match(label))}{" "}
        </p>
      )}
    </Fragment>
  );
};
