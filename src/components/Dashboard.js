import React, { useState } from "react";
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
    maxWidth: 345,
  },
  media: {
    height: 240,
  },
}));

export default function Dashboard() {
  const { currentUser, logout } = useAuth();
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
              image="https://source.unsplash.com/WLUHO9A_xik/1600x900"
              title="Contemplative Reptile"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                {currentUser.email}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
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
