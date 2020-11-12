import { makeStyles, TextField } from "@material-ui/core";
import React from "react";

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
  error,
  required,
}) => {
  const classes = useStyles();
  return (
    <div>
      <TextField
        required={required}
        error={error}
        helperText={error && `please provide valid ${label}`}
        fullWidth
        variant="outlined"
        name={`${label.toLowerCase()}`}
        type={type}
        className={classes.inputBox}
        value={value}
        onChange={onChange}
        label={label}
        color="secondary"
      />
    </div>
  );
};
