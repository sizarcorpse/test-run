import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { useAuth } from "../contexts/AuthContext";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Alert from "@material-ui/lab/Alert";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import InputAdornment from "@material-ui/core/InputAdornment";

import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import FaceIcon from "@material-ui/icons/Face";

import Fade from "@material-ui/core/Fade";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  root: {
    maxWidth: 444,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(3),
  },
  alert: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },

  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignUp() {
  const classes = useStyles();
  const { signup } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [signupError, setSignupError] = useState("");
  const [signupSuccess, setSignupSuccess] = useState("");

  const initialValues = {
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    fristName: Yup.string()
      .matches(/^[a-zA-Z]+$/, "Enter a Valid Username")
      .trim()
      .min(3, "Username is Too Short")
      .max(30, "Username is Too Long"),
    lastName: Yup.string()
      .matches(/^[a-zA-Z]+$/, "Enter a Valid Username")
      .trim()
      .min(3, "Username is Too Short")
      .max(30, "Username is Too Long"),
    username: Yup.string()
      .matches(/^[a-z0-9_.]+$/, "Enter a Valid Username")
      .trim()
      .min(4, "Username is Too Short")
      .max(30, "Username is Too Long")
      .lowercase(),
    email: Yup.string()
      .email("Please Enter A Valid Email")
      .min(8, "Please Enter A Valid Email")
      .max(30, "Eamil is Too Large")
      .lowercase()
      .required("Email Can Not Be Empty"),
    password: Yup.string().min(8),
  });

  const onSubmit = async (values, { resetForm }) => {
    const { firstName, lastName, username, email, password } = values;

    try {
      setSignupError("");
      setLoading(true);
      await signup(email, password);
      setSignupSuccess(
        "Account has been successfully🥳 created✨🎆. Redirected🚀 to home🏰 page"
      );
      history.push("/");
    } catch {
      setSignupError("Something went wrong🤪❌❌❗. Please try again😇👻.");
    }
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Card className={classes.root}>
          <CardHeader
            style={{ paddingBottom: 0 }}
            avatar={
              <Avatar className={classes.avatar}>
                <LockOutlinedIcon />
              </Avatar>
            }
            title={
              <Typography component="h1" variant="h5">
                Sign up
              </Typography>
            }
          />
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            validateOnChange={false}
            validateOnBlur={false}
          >
            {(props) => {
              const {
                values,
                touched,
                errors,
                handleChange,
                handleBlur,
              } = props;
              return (
                <CardContent style={{ paddingTop: 0 }}>
                  <Form className={classes.form}>
                    {signupError && (
                      <div
                        className={classes.alert}
                        style={{ paddingBottom: "5px" }}
                      >
                        <Fade in={signupError}>
                          <Alert severity="error">{signupError}</Alert>
                        </Fade>
                      </div>
                    )}

                    {signupSuccess && (
                      <div
                        className={classes.alert}
                        style={{ paddingBottom: "5px" }}
                      >
                        <Fade in={signupSuccess}>
                          <Alert severity="success">{signupSuccess}</Alert>
                        </Fade>
                      </div>
                    )}

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <FormControl
                          error={touched.firstName && Boolean(errors.firstName)}
                          fullWidth
                        >
                          <TextField
                            InputProps={{
                              startAdornment: touched.username ? (
                                <InputAdornment position="start">
                                  <FaceIcon />
                                </InputAdornment>
                              ) : (
                                <InputAdornment position="start">
                                  <FaceIcon />
                                </InputAdornment>
                              ),
                            }}
                            autoComplete="firstName"
                            name="firstName"
                            variant="outlined"
                            fullWidth
                            id="firstName"
                            label="First Name"
                            value={values.firstName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <FormHelperText
                            id="component-error-text"
                            style={{ margin: 0, padding: 0 }}
                          >
                            {touched.firstName ? errors.firstName : ""}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <FormControl
                          error={touched.lastName && Boolean(errors.lastName)}
                          fullWidth
                        >
                          <TextField
                            InputProps={{
                              startAdornment: touched.username ? (
                                <InputAdornment position="start">
                                  <FaceIcon />
                                </InputAdornment>
                              ) : (
                                <InputAdornment position="start">
                                  <FaceIcon />
                                </InputAdornment>
                              ),
                            }}
                            autoComplete="lastName"
                            name="lastName"
                            variant="outlined"
                            fullWidth
                            id="lastName"
                            label="Last Name"
                            value={values.lastName}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <FormHelperText
                            id="component-error-text"
                            style={{ margin: 0, padding: 0 }}
                          >
                            {touched.lastName ? errors.lastName : ""}
                          </FormHelperText>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl
                          error={touched.username && Boolean(errors.username)}
                          fullWidth
                        >
                          <TextField
                            InputProps={{
                              startAdornment:
                                touched.username && Boolean(errors.username) ? (
                                  <InputAdornment position="start">
                                    <PersonIcon style={{ color: "red" }} />
                                  </InputAdornment>
                                ) : (
                                  <InputAdornment position="start">
                                    <PersonIcon />
                                  </InputAdornment>
                                ),
                            }}
                            autoComplete="username"
                            name="username"
                            variant="outlined"
                            fullWidth
                            id="username"
                            label="Username"
                            value={values.username}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {/* <FormHelperText
                            id="component-error-text"
                            style={{ margin: 0, padding: 0 }}
                          >
                            {touched.username ? errors.username : ""}
                          </FormHelperText> */}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl
                          error={touched.email && Boolean(errors.email)}
                          fullWidth
                        >
                          <TextField
                            InputProps={{
                              startAdornment:
                                touched.email && Boolean(errors.email) ? (
                                  <InputAdornment position="start">
                                    <EmailIcon style={{ color: "red" }} />
                                  </InputAdornment>
                                ) : (
                                  <InputAdornment position="start">
                                    <EmailIcon />
                                  </InputAdornment>
                                ),
                            }}
                            required
                            autoComplete="email"
                            name="email"
                            variant="outlined"
                            fullWidth
                            id="email"
                            label="Email Address"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {/* <FormHelperText
                            id="component-error-text"
                            style={{ margin: 0, padding: 0 }}
                          >
                            {touched.email ? errors.email : ""}
                          </FormHelperText> */}
                        </FormControl>
                      </Grid>
                      <Grid item xs={12}>
                        <FormControl
                          error={touched.password && Boolean(errors.password)}
                          fullWidth
                        >
                          <TextField
                            InputProps={{
                              startAdornment:
                                touched.password && Boolean(errors.password) ? (
                                  <InputAdornment position="start">
                                    <VpnKeyIcon style={{ color: "red" }} />
                                  </InputAdornment>
                                ) : (
                                  <InputAdornment position="start">
                                    <VpnKeyIcon />
                                  </InputAdornment>
                                ),
                            }}
                            variant="outlined"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          {/* <FormHelperText
                            id="component-error-text"
                            style={{ margin: 0, padding: 0 }}
                          >
                            {touched.password ? errors.password : ""}
                          </FormHelperText> */}
                        </FormControl>
                      </Grid>
                    </Grid>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      disabled={loading}
                    >
                      Sign Up
                    </Button>
                    <Grid container justify="flex-end">
                      <Grid item>
                        <Link
                          to={"/login"}
                          variant="body2"
                          style={{ textDecoration: "none" }}
                        >
                          Already have an account? Sign in
                        </Link>
                      </Grid>
                    </Grid>
                  </Form>
                </CardContent>
              );
            }}
          </Formik>
        </Card>
      </div>
    </Container>
  );
}
