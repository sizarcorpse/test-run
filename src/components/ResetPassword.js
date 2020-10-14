import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { useAuth } from "../contexts/AuthContext";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import FormControl from "@material-ui/core/FormControl";

import Alert from "@material-ui/lab/Alert";

import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";

import InputAdornment from "@material-ui/core/InputAdornment";

import EmailIcon from "@material-ui/icons/Email";
import PhoneAndroidIcon from "@material-ui/icons/PhoneAndroid";
import Fade from "@material-ui/core/Fade";

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

  alert: {
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

export default function ResetPassword() {
  const classes = useStyles();
  const { resetPassword } = useAuth();

  const [loading, setLoading] = useState(false);
  const [resetError, setResetError] = useState("");
  const [resetSuccess, setResetSuccess] = useState("");

  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please Enter A Valid Email")
      .min(8, "Please Enter A Valid Email")
      .max(30, "Eamil is Too Large")
      .lowercase()
      .required("Email Can Not Be Empty"),
  });

  const onSubmit = async (values, { resetForm }) => {
    const { email, password } = values;

    try {
      setResetError("");
      setLoading(true);

      await resetPassword(email);
      setResetSuccess(
        "A reset email has been successfully🥳 sent🚀 to your email address✨🎆."
      );
    } catch {
      setResetError("Something went wrong🤪❌❌❗. Please try again😇👻.");
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
                Reset Password
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
                    {resetError && (
                      <div
                        className={classes.alert}
                        style={{ paddingBottom: "10px" }}
                      >
                        <Fade in={resetError}>
                          <Alert severity="error">{resetError}</Alert>
                        </Fade>
                      </div>
                    )}

                    {resetSuccess && (
                      <div
                        className={classes.alert}
                        style={{ paddingBottom: "15px" }}
                      >
                        <Fade in={resetSuccess}>
                          <Alert severity="success">{resetSuccess}</Alert>
                        </Fade>
                      </div>
                    )}

                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <FormControl
                          error={touched.email && Boolean(errors.email)}
                          fullWidth
                        >
                          <TextField
                            InputProps={{
                              style: { backgroundColor: "none" },
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
                        <TextField
                          InputProps={{
                            style: { backgroundColor: "none" },
                            startAdornment:
                              touched.email && Boolean(errors.email) ? (
                                <InputAdornment position="start">
                                  <PhoneAndroidIcon style={{ color: "red" }} />
                                </InputAdornment>
                              ) : (
                                <InputAdornment position="start">
                                  <PhoneAndroidIcon />
                                </InputAdornment>
                              ),
                          }}
                          required
                          autoComplete="email"
                          name="email"
                          variant="outlined"
                          fullWidth
                          id="email"
                          label="Phone Number"
                          disabled
                        />
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
                      Reset Password
                    </Button>
                    <Grid container>
                      <Grid item xs>
                        <Link
                          to="/login"
                          variant="body2"
                          style={{ textDecoration: "none" }}
                        >
                          Login
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link
                          to={"/signup"}
                          variant="body2"
                          style={{ textDecoration: "none" }}
                        >
                          Don't have an account? Sign Up
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
