    
import React from 'react';
import { Route } from "react-router-dom";
import Login from './Login'

const LoggedRoute = ({component: Component, isAuthenticated, ...rest}) => (
  <Route {...rest} render={props => (
    isAuthenticated 
      ? 
      (<Component {...props}/>)
      :
      (<Login isPage={true} />)
  )}/>
);

export default LoggedRoute;