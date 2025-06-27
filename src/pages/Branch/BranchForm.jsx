import React, { useState } from "react";
import { Button, Box } from "@mui/material";
import TextInputComponent from "../../components/common/TextInput";
import { postData, putData } from "../../api/Api";

const BranchForm = (props) => {
  const [formValues, setFormValues] = useState(props.initialValues);
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  const validateField = (name, data) => {
    console.log("12", name, data);
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
      const response = await putData(`/branch/update`, {
        id: formValues.id,
        branchName: formValues.branchName,
        location: formValues.location,
        contactInfo: formValues.contactInfo,
      });
      props.onClose();
    } else {
      console.log("Hemang123", formValues);
      const response = await postData("/branch", {
        branchName: formValues.branchName,
        location: formValues.location,
        contactInfo: formValues.contactInfo,
        branchStatus: "ACTIVE",
      });
      props.onClose();
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <TextInputComponent
        label="Name"
        name="branchName"
        value={formValues.branchName}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!formErrors.branchName}
        helperText={formErrors.branchName}
        required
      />

      <TextInputComponent
        label="Location"
        name="location"
        value={formValues.location}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!formErrors.location}
        helperText={formErrors.location}
        required
      />

      <TextInputComponent
        label="Contact"
        name="contactInfo"
        value={formValues.contactInfo}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!formErrors.contactInfo}
        helperText={formErrors.contactInfo}
        required
      />

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default BranchForm;
