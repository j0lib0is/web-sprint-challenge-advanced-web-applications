import React from "react";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute(props) {
  const { component:Component, ...rest } = props;

  return (<Route {...props} render={() => {
    if(localStorage.getItem('token')) {
      return <Component />;
    } else {
      return <Redirect to='/'/>;
    };
  }}/>)
}

export default PrivateRoute;

//Task List:
//1. ✅ Complete PrivateRoute