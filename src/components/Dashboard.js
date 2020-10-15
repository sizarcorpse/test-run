import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

import app from "../firebase";

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
import { auth } from "firebase";
import { CodeSharp } from "@material-ui/icons";
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
    minWidth: 396,
  },
  media: {
    height: 240,
  },
}));

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
  const [profile, setProfile] = useState({});
  const history = useHistory();
  const classes = useStyles();

  const [error, setError] = useState("");

  async function handleLogout() {
    setError("");
    try {
      await logout();
      history.push("/login");
    } catch {
      setError("Something went worng");
    }
  }

  useEffect(() => {
    me();
    console.log(currentUser);
  }, []);

  const me = async () => {
    const db = app.firestore();

    await db
      .collection("users")
      .where("userID", "==", currentUser.uid)
      .limit(1)
      .get()
      .then((data) => {
        let medata = {};
        data.forEach((doc) => {
          medata.fname = doc.data().fname;
          medata.lname = doc.data().lname;
        });
        setProfile(medata);
      });
  };

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
                Profile
              </Typography>
              {error && (
                <Typography variant="body2" color="textSecondary" component="p">
                  {error}
                </Typography>
              )}
            </CardContent>
            <CardMedia
              className={classes.media}
              image={currentUser.photoURL}
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {currentUser.email}
              </Typography>
              <Typography gutterBottom variant="h5" component="h2">
                {currentUser.displayName}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {profile.fname}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                {profile.lname}
              </Typography>
            </CardContent>
          </CardActionArea>
          <CardActions>
            <Link
              to="/updateprofile"
              style={{ textTransform: "none", textDecoration: "none" }}
            >
              <Button
                size="small"
                color="primary"
                style={{ textTransform: "none" }}
              >
                Update Profile
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
