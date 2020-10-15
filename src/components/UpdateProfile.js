import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import { Formik, Form } from "formik";
import * as Yup from "yup";

import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Alert from "@material-ui/lab/Alert";
import CardHeader from "@material-ui/core/CardHeader";

import InputAdornment from "@material-ui/core/InputAdornment";

import PersonIcon from "@material-ui/icons/Person";
import EmailIcon from "@material-ui/icons/Email";
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import FaceIcon from "@material-ui/icons/Face";

import Fade from "@material-ui/core/Fade";

// import { auth } from "firebase";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },

  root: {
    maxWidth: 444,
  },
  media: {
    height: 240,
  },
}));

export default function UpdateProfile() {
  const {
    currentUser,
    logout,
    updateEmail,
    updatePassword,
    updateDisplayName,
  } = useAuth();
  const history = useHistory();
  const classes = useStyles();

  const [error, setError] = useState("");
  const [updateError, setUpdateError] = useState("");
  const [updateSuccess, setUpdateSuccess] = useState("");
  const [loading, setLoading] = useState(false);

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
      .lowercase(),
    password: Yup.string().min(8),
  });

  const onSubmit = async (values, { resetForm }) => {
    const { firstName, lastName, username, email, password } = values;

    console.log(email);

    const promises = [];
    setLoading(true);
    setError("");
    if (email) {
      promises.push(updateEmail(email));
    }
    if (password) {
      promises.push(updatePassword(password));
    }
    if (username) {
      promises.push(updateDisplayName(username));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Something went worng");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Something went worng");
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Card className={classes.root}>
          <CardHeader
            style={{ paddingBottom: 0 }}
            title={
              <Typography component="h1" variant="h5">
                Update Profile
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
                    {updateError && (
                      <div
                        className={classes.alert}
                        style={{ paddingBottom: "5px" }}
                      >
                        <Fade in={updateError}>
                          <Alert severity="error">{updateError}</Alert>
                        </Fade>
                      </div>
                    )}

                    {/* {signupSuccess && (
                      <div
                        className={classes.alert}
                        style={{ paddingBottom: "5px" }}
                      >
                        <Fade in={signupSuccess}>
                          <Alert severity="success">{signupSuccess}</Alert>
                        </Fade>
                      </div>
                    )} */}

                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <FormControl
                          error={touched.firstName && Boolean(errors.firstName)}
                          fullWidth
                        >
                          <TextField
                            InputProps={{
                              startAdornment: touched.firstName ? (
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
                              startAdornment: touched.lastName ? (
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
                            defaultValue={currentUser.displayName}
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
                            autoComplete="email"
                            name="email"
                            variant="outlined"
                            fullWidth
                            id="email"
                            label="Email Address"
                            defaultValue={currentUser.email}
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
                      Update
                    </Button>
                  </Form>
                  <CardActions>
                    <Link
                      to="/"
                      style={{ textTransform: "none", textDecoration: "none" }}
                    >
                      <Button
                        size="small"
                        color="primary"
                        style={{ textTransform: "none" }}
                      >
                        Dashboard
                      </Button>
                    </Link>
                    <Link
                      to="/"
                      style={{ textTransform: "none", textDecoration: "none" }}
                    >
                      <Button
                        size="small"
                        color="primary"
                        style={{ textTransform: "none" }}
                        onClick={handleLogout}
                      >
                        Log Out
                      </Button>
                    </Link>
                  </CardActions>
                </CardContent>
              );
            }}
          </Formik>
        </Card>
      </div>
    </Container>
  );
}
