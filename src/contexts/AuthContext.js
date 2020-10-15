import React, { useContext, createContext, useState, useEffect } from "react";
import Login from "../components/Login";

import app, { auth, provider } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentuser] = useState();
  const [loading, setLoading] = useState(true);
  const db = app.firestore();

  function signInWithGoogle() {
    let userID;

    return app
      .auth()
      .signInWithPopup(provider)
      .then((data) => {
        userID = data.user.uid;

        const userCredentials = {
          fname: data.user.displayName.split(" ")[0],
          lname: data.user.displayName.split(" ")[1],
          username:
            data.user.displayName.split(" ")[0] +
            data.user.displayName.split(" ")[1],
          email: data.user.email,
          userID,
        };
        db.doc(`users/${userID}`).set(userCredentials);
      });
  }

  function signup(firstName, lastName, username, email, password) {
    let userID;
    return auth.createUserWithEmailAndPassword(email, password).then((data) => {
      data.user
        .updateProfile({
          displayName: username,
        })
        .then(() => {
          userID = data.user.uid;
          const userCredentials = {
            fname: firstName,
            lname: lastName,
            username: username,
            email: email,
            userID,
          };
          db.doc(`users/${userID}`).set(userCredentials);
        });
    });
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentuser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  //
  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function updateDisplayName(username) {
    return currentUser.updateProfile({ displayName: username });
  }

  function logout() {
    return auth.signOut();
  }

  const value = {
    currentUser,
    signup,
    login,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
    signInWithGoogle,
    updateDisplayName,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
