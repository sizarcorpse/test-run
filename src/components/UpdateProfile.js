import React, { useState, useRef } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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

import { auth } from "firebase";

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
  const { currentUser, logout, updateEmail, updatePassword } = useAuth();
  const history = useHistory();
  const classes = useStyles();

  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      setError("Password does not match");
    }

    const promises = [];
    setLoading(true);
    setError("");

    if (emailRef.current.value !== currentUser.email) {
      promises.push(updateEmail(emailRef.current.value));
    }

    if (passwordRef.current.value) {
      promises.push(updatePassword(passwordRef.current.value));
    }

    Promise.all(promises)
      .then(() => {
        history.push("/");
      })
      .catch(() => {
        setError("Something went worng");
      })
      .finally(() => {
        setLoading(true);
      });
  }

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
          <CardActionArea>
            <CardContent>
              <Typography
                gutterBottom
                variant="h4"
                component="h5"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                Update Profile
              </Typography>
              {error && (
                <Typography variant="body2" color="textSecondary" component="p">
                  {error}
                </Typography>
              )}
            </CardContent>
            <CardMedia
              className={classes.media}
              image="https://source.unsplash.com/WLUHO9A_xik/1600x900"
              title="Contemplative Reptile"
            />
          </CardActionArea>
          <CardActions>
            <CardContent>
              <form className={classes.form} noValidate onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      autoComplete="fname"
                      name="firstName"
                      variant="outlined"
                      fullWidth
                      id="firstName"
                      label="First Name"
                      autoFocus
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="lastName"
                      label="Last Name"
                      name="lastName"
                      autoComplete="lname"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      inputRef={emailRef}
                      defaultValue={currentUser.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                      inputRef={passwordRef}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      fullWidth
                      name="password-confirm"
                      label="Password confirm"
                      type="password"
                      id="password-confirm"
                      autoComplete="current-password"
                      inputRef={passwordConfirmRef}
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
                  Update
                </Button>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link to={"/"} variant="body2">
                      Cancel
                    </Link>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </CardActions>

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
        </Card>
      </div>
    </Container>
  );
}
