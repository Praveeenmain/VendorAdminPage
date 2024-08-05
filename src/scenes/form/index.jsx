import { Box, Button, TextField, CircularProgress } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Form = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for signup
  const [isOtpLoading, setIsOtpLoading] = useState(false); // Loading state for OTP verification

  const navigate = useNavigate(); // Initialize useNavigate

  const handleSignupSubmit = async (values) => {
    setIsLoading(true); // Set loading to true
    try {
      const { name, businessName, username, email, contact } = values;

      // Call the signup endpoint
      const response = await axios.post('https://evovendors.onrender.com/signup', { 
        phoneNumber: contact, 
        username: username, 
        name: name,
        businessName: businessName,
        email: email
      });

      if (response.data.status === 'OTP sent for signup' || response.data.status === 'OTP sent again for signup') {
        setIsOtpSent(true);
        setPhoneNumber(contact);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    } finally {
      setIsLoading(false); // Set loading to false
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setIsOtpLoading(true); // Set OTP loading to true
    try {
      const response = await axios.post('https://evovendors.onrender.com/verify-signup', { phoneNumber, otpCode });

      if (response.data.status === 'Signup successful') {
        // Handle successful signup
        console.log('Signup successful');
        // Redirect to the Vendors page
        navigate('/vendors'); // Redirect to /vendors
      } else {
        console.error('OTP verification failed');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error);
    } finally {
      setIsOtpLoading(false); // Set OTP loading to false
    }
  };

  return (
    <Box m="20px">
      <Header title="CREATE USER" subtitle="Create a New User Profile" />
      {!isOtpSent ? (
        <Formik
          onSubmit={handleSignupSubmit}
          initialValues={initialValues}
          validationSchema={checkoutSchema}
        >
          {({
            values,
            errors,
            touched,
            handleBlur,
            handleChange,
            handleSubmit,
          }) => (
            <form onSubmit={handleSubmit}>
              <Box
                display="grid"
                gap="30px"
                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                sx={{
                  "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                }}
              >
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.name}
                  name="name"
                  error={!!touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Business Name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.businessName}
                  name="businessName"
                  error={!!touched.businessName && !!errors.businessName}
                  helperText={touched.businessName && errors.businessName}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Username"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  name="username"
                  error={!!touched.username && !!errors.username}
                  helperText={touched.username && errors.username}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  name="email"
                  error={!!touched.email && !!errors.email}
                  helperText={touched.email && errors.email}
                  sx={{ gridColumn: "span 4" }}
                />
                <TextField
                  fullWidth
                  variant="filled"
                  type="text"
                  label="Contact Number"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.contact}
                  name="contact"
                  error={!!touched.contact && !!errors.contact}
                  helperText={touched.contact && errors.contact}
                  sx={{ gridColumn: "span 4" }}
                />
              </Box>
              <Box display="flex" justifyContent="end" mt="20px">
                <Button type="submit" color="secondary" variant="contained" disabled={isLoading}>
                  {isLoading ? <CircularProgress size={24} /> : 'Create New User'}
                </Button>
              </Box>
            </form>
          )}
        </Formik>
      ) : (
        <Box m="20px">
          <form onSubmit={handleOtpSubmit}>
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Enter OTP"
              value={otpCode}
              onChange={(e) => setOtpCode(e.target.value)}
              sx={{ mb: "20px" }}
            />
            <Button type="submit" color="secondary" variant="contained" disabled={isOtpLoading}>
              {isOtpLoading ? <CircularProgress size={24} /> : 'Verify OTP'}
            </Button>
          </form>
        </Box>
      )}
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  businessName: yup.string().required("Business Name is required"),
  username: yup.string().required("Username is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Contact number is required"),
});

const initialValues = {
  name: "",
  businessName: "",
  username: "",
  email: "",
  contact: "",
};

export default Form;
