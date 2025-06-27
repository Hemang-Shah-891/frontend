// import React, { useState } from "react";
// import { Button, Box } from "@mui/material";
// import TextInputComponent from "../../components/common/TextInput";
// import { postData, putData } from "../../api/Api";

// const InventoriesForm = (props) => {
//   const [formValues, setFormValues] = useState(props.initialValues);
//   const [formErrors, setFormErrors] = useState({});

//   const handleChange = (e) => {
//     setFormValues({ ...formValues, [e.target.name]: e.target.value });
//   };

//   const handleBlur = (e) => {
//     validateField(e.target.name, e.target.value);
//   };

//   const validateField = (name, data) => {
//     console.log("12", name, data);
//     const value = String(data || "");
//     let error = "";

//     if (name === "name") {
//       if (!value.trim()) error = "Name is required";
//     }

//     if (name === "email") {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!value.trim()) error = "Email is required";
//       else if (!emailRegex.test(value)) error = "Invalid email";
//     }

//     if (name === "contact") {
//       const phoneRegex = /^[6-9]\d{9}$/;
//       if (!value?.trim()) error = "Contact is required";
//       else if (!phoneRegex.test(value)) error = "Invalid contact number";
//     }

//     setFormErrors((prev) => ({ ...prev, [name]: error }));
//   };

//   const validateAll = () => {
//     const errors = {};
//     Object.keys(formValues).forEach((field) => {
//       validateField(field, formValues[field]);
//       if (!formValues[field]) errors[field] = `${field} is required`;
//     });
//     return Object.values(errors).every((val) => !val);
//   };

//   const handleSubmit = async (e) => {
//     console.log("Hemang Shah");
//     e.preventDefault();
//     const isValid = validateAll();
//     if (!isValid) return;
//     if (formValues.id > 0) {
//       const response = await putData(`/inventory-byid`, {
//         id: formValues.id,
//         name: formValues.name,
//         email: formValues.email,
//         contactNo: formValues.contact,
//         password: "Test@3456",
//       });
//       props.onClose();
//     } else {
//       console.log("Hemang123", formValues);
//       const response = await postData("/inventory", {
//         name: formValues.name,
//         email: formValues.email,
//         contactNo: formValues.contact,
//         password: "Test@3456",
//       });
//       props.onClose();
//     }
//   };

//   return (
//     <Box component="form" onSubmit={handleSubmit} noValidate>
//       <TextInputComponent
//         label="Name"
//         name="name"
//         value={formValues.name}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         error={!!formErrors.name}
//         helperText={formErrors.name}
//         required
//       />

//       <TextInputComponent
//         label="Email"
//         name="email"
//         value={formValues.email}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         error={!!formErrors.email}
//         helperText={formErrors.email}
//         required
//       />

//       <TextInputComponent
//         label="Contact"
//         name="contact"
//         value={formValues.contact}
//         onChange={handleChange}
//         onBlur={handleBlur}
//         error={!!formErrors.contact}
//         helperText={formErrors.contact}
//         required
//       />

//       <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
//         Submit
//       </Button>
//     </Box>
//   );
// };

// export default InventoriesForm;

import { useState } from "react";
import { Button, Box, MenuItem } from "@mui/material";
import TextInputComponent from "../../components/common/TextInput";
import { postData, putData } from "../../api/Api";

const taxOptions = [
  { label: "CGST", value: "cgst" },
  { label: "IGST", value: "igst" },
  { label: "SGST", value: "sgst" },
];

const InventoriesForm = (props) => {
  const [formValues, setFormValues] = useState(props.initialValues || {});
  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  const handleBlur = (e) => {
    validateField(e.target.name, e.target.value);
  };

  const validateField = (name, data) => {
    const value = String(data || "").trim();
    let error = "";

    if (!value) {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    } else {
      if (name === "quantity" && isNaN(value)) {
        error = "Quantity must be a number";
      }
      if (name === "cost" && isNaN(value)) {
        error = "Cost must be a number";
      }
    }

    setFormErrors((prev) => ({ ...prev, [name]: error }));
    return error; // return error for global validation
  };

  const validateAll = () => {
    const errors = {};

    Object.entries(formValues).forEach(([field, value]) => {
      const val = String(value || "").trim();
      let error = "";

      if (!val) {
        error = `${field.charAt(0).toUpperCase() + field.slice(1)} is required`;
      } else {
        if (field === "itemQuantity" && isNaN(val)) {
          error = "Quantity must be a number";
        }
        if (field === "itemCost" && isNaN(val)) {
          error = "Cost must be a number";
        }
      }

      if (error) {
        errors[field] = error;
      }
    });

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // const isValid = validateAll();
    // if (!isValid) return;

    const payload = {
      // id: formValues.id,
      name: formValues.itemName,
      quantity: parseInt(formValues.itemQuantity),
      cost: parseFloat(formValues.itemCost),
      description: formValues.itemDescription,
      categories: formValues.categories,
      applicableTaxNames: formValues.applicableTaxNames,
    };
    console.log("Submitting:", payload);

    try {
      if (formValues.id > 0) {
        await putData(`/inventory-update`, payload);
      } else {
        await postData("/inventory", payload);
      }
      props.onClose();
    } catch (err) {
      console.error("Submit failed:", err);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} noValidate>
      {/* Optional ID field (readonly) */}
      {formValues.id > 0 && (
        <TextInputComponent
          label="ID"
          name="id"
          value={formValues.id}
          disabled
        />
      )}

      <TextInputComponent
        label="Name"
        name="itemName"
        value={formValues.itemName || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!formErrors.itemName}
        helperText={formErrors.itemName}
        required
      />

      <TextInputComponent
        label="Quantity"
        name="itemQuantity"
        value={formValues.itemQuantity || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!formErrors.itemQuantity}
        helperText={formErrors.itemQuantity}
        required
      />

      <TextInputComponent
        label="Cost"
        name="itemCost"
        value={formValues.itemCost || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!formErrors.itemCost}
        helperText={formErrors.itemCost}
        required
      />

      <TextInputComponent
        label="Description"
        name="itemDescription"
        value={formValues.itemDescription || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!formErrors.itemDescription}
        helperText={formErrors.itemDescription}
        // multiline
        required
        // rows={3}
      />

      <TextInputComponent
        label="Category"
        name="categories"
        value={formValues.categories || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!formErrors.categories}
        helperText={formErrors.categories}
        required
      />

      <TextInputComponent
        select
        label="Applicable Tax"
        name="applicableTaxNames"
        value={formValues.applicableTaxNames || ""}
        onChange={handleChange}
        onBlur={handleBlur}
        error={!!formErrors.applicableTaxNames}
        helperText={formErrors.applicableTaxNames}
        required
      >
        {taxOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextInputComponent>

      <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
        Submit
      </Button>
    </Box>
  );
};

export default InventoriesForm;
