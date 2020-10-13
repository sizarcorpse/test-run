import React from "react";

import { AuthProvider } from "../contexts/AuthContext";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import PrivateRoute from "./PrivateRoute";

import Signup from "./Signup";
import Dashboard from "./Dashboard";
import UpdateProfile from "./UpdateProfile";
import Login from "./Login";
import ResetPassword from "./ResetPassword";

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path="/" component={Dashboard} />
          <PrivateRoute path="/updateprofile" component={UpdateProfile} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
          <Route path="/resetpassword" component={ResetPassword} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
