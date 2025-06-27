import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import TextInputComponent from "../../components/common/TextInput";
import { postData, putData } from "../../api/Api";

const TransactionsForm = (props) => {
  const [formValues, setFormValues] = useState(props.initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  const validateField = (name, data) => {
    const value = String(data || "");
    let error = "";

    if (name === "name") {
      if (!value.trim()) error = "Name is required";
    }

    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!value.trim()) error = "Email is required";
      else if (!emailRegex.test(value)) error = "Invalid email";
    }

    if (name === "contact") {
      const phoneRegex = /^[6-9]\d{9}$/;
      if (!value?.trim()) error = "Contact is required";
      else if (!phoneRegex.test(value)) error = "Invalid contact number";
    }

    setFormErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateAll = () => {
    const errors = {};
    Object.keys(formValues).forEach((field) => {
      validateField(field, formValues[field]);
      if (!formValues[field]) errors[field] = `${field} is required`;
    });
    return Object.values(errors).every((val) => !val);
  };

  const handleSubmit = async (e) => {
    console.log("Hemang Shah");
    e.preventDefault();
    const isValid = validateAll();
    if (!isValid) return;
    if (formValues.id > 0) {
      const response = await putData(`/api/v1/admins/${formValues.id}`, {
        name: formValues.name,
        email: formValues.email,
        contactNo: formValues.contact,
        password: "Test@3456",
      });
      props.onClose();
    } else {
      const response = await postData("/api/v1/admins", {
        name: formValues.name,
        email: formValues.email,
        contactNo: formValues.contact,
        password: "Test@3456",
      });
      props.onClose();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextInputComponent
        label="Name"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!formErrors.name}
        helperText={formErrors.name}
        required
      />

      <TextInputComponent
        label="Email"
        name="email"
        value={formValues.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!formErrors.email}
        helperText={formErrors.email}
        required
      />

      <TextInputComponent
        label="Contact"
        name="contact"
        value={formValues.contact}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!formErrors.contact}
        helperText={formErrors.contact}
        required
      />

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default TransactionsForm;
