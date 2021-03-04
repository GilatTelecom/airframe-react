
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAuth } from "./auth";
import { getParsedJwt } from "./provider"

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = useAuth();

  function checkAuth() {
    if(isAuthenticated !== undefined) {
      if(isAuthenticated.authTokens !== undefined && isAuthenticated.authTokens !== null && getParsedJwt()) {
        return true;
      }
      return false;
    }
    else {
      return false;
    }
  }
  return (
    <Route
      {...rest}
      render={props =>
        checkAuth() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/pages/login" />
        )
      }
    />
  );
}

export default PrivateRoute;