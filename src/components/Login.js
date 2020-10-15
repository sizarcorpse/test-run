import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import app, { auth } from "../firebase";
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
import VpnKeyIcon from "@material-ui/icons/VpnKey";
import Fade from "@material-ui/core/Fade";

import AlternateEmailIcon from "@material-ui/icons/AlternateEmail";
import FacebookIcon from "@material-ui/icons/Facebook";
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 444,
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

export default function Login() {
  const classes = useStyles();
  const { login, signInWithGoogle } = useAuth();
  const history = useHistory();
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loginSuccess, setLoginSuccess] = useState("");

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Please Enter A Valid Email")
      .min(8, "Please Enter A Valid Email")
      .max(30, "Eamil is Too Large")
      .lowercase()
      .required("Email Can Not Be Empty"),
    password: Yup.string().required("Password Can Not Be Empty"),
  });

  const onSubmit = async (values, { resetForm }) => {
    const { email, password } = values;

    try {
      setLoginError("");
      setLoading(true);

      await login(email, password);
      setLoginSuccess(
        "Account has been successfully🥳 created✨🎆. Redirected🚀 to home🏰 page"
      );

      history.push("/");
    } catch {
      setLoginError("Something went wrong🤪❌❌❗. Please try again😇👻.");
    }
    setLoading(false);
  };

  const google = async () => {
    await signInWithGoogle();
    history.push("/");
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
                Sign In
              </Typography>
            }
          />
          <CardContent
            style={{
              paddingTop: 0,
              paddingBottom: 0,
              margin: 0,
            }}
          >
            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.submit}
              disabled={loading}
              onClick={google}
              startIcon={<AlternateEmailIcon />}
              size="small"
              style={{
                padding: "3px",

                marginTop: "5px",
                marginBottom: "10px",
              }}
            >
              Google Signin
            </Button>

            <Button
              type="submit"
              fullWidth
              variant="outlined"
              color="primary"
              className={classes.submit}
              disabled
              size="small"
              style={{
                padding: "3px",
                marginTop: 0,
              }}
              startIcon={<FacebookIcon />}
            >
              Facebook Signin
            </Button>
          </CardContent>

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
                    {loginError && (
                      <div
                        className={classes.alert}
                        style={{ paddingBottom: "10px" }}
                      >
                        <Fade in={loginError}>
                          <Alert severity="error">{loginError}</Alert>
                        </Fade>
                      </div>
                    )}

                    {loginSuccess && (
                      <div
                        className={classes.alert}
                        style={{ paddingBottom: "5px" }}
                      >
                        <Fade in={loginSuccess}>
                          <Alert severity="success">{loginSuccess}</Alert>
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
                      Sign In
                    </Button>

                    <Grid container>
                      <Grid item xs>
                        <Link
                          to="/resetpassword"
                          variant="body2"
                          style={{ textDecoration: "none" }}
                        >
                          Forgot password?
                        </Link>
                      </Grid>
                      <Grid item>
                        <Link
                          to={"/signup"}
                          variant="body2"
                          style={{ textDecoration: "none" }}
                        >
                          {"Don't have an account? Sign Up"}
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
