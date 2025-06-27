import React from "react";
import { TextField } from "@mui/material";

const TextInputComponent = ({
  label,
  name,
  value,
  onChange,
  onBlur,
  error = false,
  helperText = "",
  type = "text",
  required = false,
  fullWidth = true,
  ...rest
}) => {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      type={type}
      required={required}
      fullWidth={fullWidth}
      variant="outlined"
      margin="normal"
      sx={{
        "& .MuiOutlinedInput-root": {
          height: 50,
        },
      }}
      {...rest}
    />
  );
};

export default TextInputComponent;
