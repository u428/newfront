import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const RouterLanding = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem("token");
  
  const {loading, userData} = useSelector(state=>state.authReducer);

  return (

    <Route
      {...rest}
      render={(props) =>
        {
              return(
                <Component {...props} />
              )
        }
      }
    />
  );
};
