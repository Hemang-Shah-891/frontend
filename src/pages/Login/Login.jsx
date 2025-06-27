import { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
// import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import TextInputComponent from "../../components/common/TextInput";
import "./Login.css";
import { postData } from "../../api/Api";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    emailError: "",
    password: "",
    passwordError: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateField = (name, value) => {
    let error = "";
    if (value) {
      error = "";
    } else {
      error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required`;
    }
    setFormData((prev) => ({
      ...prev,
      [`${name}Error`]: error,
    }));
    return !error;
  };

  const validateForm = () => {
    let emailValidate = validateField("email", formData.email);
    let passwordValidate = validateField("password", formData.password);
    return emailValidate && passwordValidate;
  };

  //   const handleSubmit = async (e) => {
  //     if (!validateForm()) return;
  //     e.preventDefault();
  //     setErrorMessage("");
  //     setIsLoading(true);

  //     try {
  //       //   const response = await fetch(
  //       //     "https://biology-headquarters-muscle-experiments.trycloudflare.com/api/v1/login",
  //       //     {
  //       //       method: "POST",
  //       //       headers: {
  //       //         "Content-Type": "application/json",
  //       //         Accept: "application/json",
  //       //       },
  //       //       credentials: "include",
  //       //       body: JSON.stringify(formData),
  //       //     }
  //       //   );

  //       const response = await postData("/api/v1/login", formData);
  //       // Check if response is OK (status 200-299)
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log("Login successful:", data);
  //         // navigate("/");
  //       } else {
  //         // Handle different error statuses
  //         if (response.status === 403) {
  //           setErrorMessage("Access denied. Please check your credentials.");
  //         } else if (response.status === 401) {
  //           setErrorMessage("Invalid email or password");
  //         } else {
  //           // Try to parse error message from response
  //           try {
  //             const errorData = await response.json();
  //             setErrorMessage(errorData.message || "Login failed");
  //           } catch {
  //             setErrorMessage(`Login failed with status ${response.status}`);
  //           }
  //         }
  //       }
  //     } catch (error) {
  //       console.error("Network error:", error);
  //       setErrorMessage("Network error. Please check your connection.");
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await postData("/api/v1/login", {
        email: formData.email,
        password: formData.password,
      });

      console.log("Login successful:", response);
      navigate("/");
    } catch (error) {
      console.error("Network error:", error);

      if (error.response) {
        // Server responded with a status outside 2xx
        if (error.response.status === 403) {
          setErrorMessage("Access denied. Please check your credentials.");
        } else if (error.response.status === 401) {
          setErrorMessage("Invalid email or password");
        } else {
          setErrorMessage(error.response.data.message || "Login failed");
        }
      } else {
        // No response from server or other network issue
        setErrorMessage("Network error. Please check your connection.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box className="login-container">
      <Box className="login-wrapper">
        <Paper elevation={3} className="login-paper">
          <Typography component="h3" variant="h5" className="login-title">
            Login
          </Typography>

          <div>
            <TextInputComponent
              label="Email"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
              required
              error={!!formData.emailError}
              helperText={formData.emailError}
            />

            <TextInputComponent
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              onBlur={(e) => validateField(e.target.name, e.target.value)}
              required
              error={!!formData.passwordError}
              helperText={formData.passwordError}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleTogglePassword}
                      edge="end"
                      aria-label="toggle password visibility"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />

            <Typography className="forgot-password">
              Forgot Password?
            </Typography>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={isLoading}
              className="login-button"
              onClick={handleSubmit}
            >
              {isLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Log In"
              )}
            </Button>

            {errorMessage && (
              <Typography className="error-message">{errorMessage}</Typography>
            )}
          </div>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;
