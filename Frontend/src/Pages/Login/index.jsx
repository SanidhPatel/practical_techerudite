import React, { useEffect, useState } from "react";
import { Button, Grid, Typography, Box } from "@mui/material";
import Container from "@mui/material/Container";
import { useFormik } from "formik";
import {
  loginFormInitialValues,
  loginFormValidationSchema,
} from "./Schema";
import { PasswordBox, TextBox } from "../../ui-component/form";
import { loginUser } from "../../api/users";
import { useNavigate, Link } from "react-router-dom";

import { useSnackbar } from "../../context/AlertContext";

export default function LoginAdmin() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const { openSnackbar } = useSnackbar();


  const handleSubmit = async (values) => {

    try {
      let response = await loginUser(values);
      if (response?.status === 200) {
        openSnackbar(response?.data?.message, "success");
        navigate('/dashboard')
      } else {
        openSnackbar(response?.data?.message, "error");
      }
    } catch (error) {
      if (error.response) {
        openSnackbar(error.response?.data?.message, "error");
      }
    }
  };

  const formik = useFormik({
    initialValues: loginFormInitialValues,
    validationSchema: loginFormValidationSchema,
    onSubmit: handleSubmit,
    validateOnBlur: false,
  });

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          padding: '30px',
          marginTop: 8,
          borderRadius: '5px',
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "#ffa07a47"
        }}
      >
        <Typography component="h1" variant="h5">
          {"Login"}
        </Typography>
        <form
          noValidate
          onSubmit={formik.handleSubmit}
          style={{ marginTop: 12 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextBox
                type="email"
                name="email"
                required
                fullWidth
                id="email"
                label="Email"
                value={formik?.values?.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={Boolean(formik?.touched?.email && formik?.errors?.email)}
                touched={
                  formik?.touched?.email &&
                  formik?.errors?.email &&
                  formik?.errors?.email
                }
                errorMessage={formik?.errors?.email}
                autoFocus
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordBox
                value={formik?.values?.password}
                name="password"
                label="Password"
                onBlur={formik?.handleBlur}
                onChange={formik.handleChange}
                showPassword={showPassword}
                handleClickShowPassword={() => {
                  setShowPassword(!showPassword);
                }}
                error={Boolean(
                  formik?.touched?.password && formik?.errors?.password
                )}
                touched={
                  formik?.touched?.password &&
                  formik?.errors?.password &&
                  formik?.errors?.password
                }
                errorMessage={formik?.errors?.password}
                showStrength={true}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Login
          </Button>
          <Grid item sx={{ display: "flex" }}>
            <Typography sx={{ marginRight: '5px' }}> Don't have an account? </Typography>
            <Link to="/" variant="body2">
              <Typography> Register </Typography>
            </Link>
          </Grid>
        </form>
      </Box>
    </Container>
  );
}
