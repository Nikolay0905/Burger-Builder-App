import React from 'react' ;
import { NavLink } from "react-router-dom";
const notFound = props => (
    <div>   
        <h1>The page you have searched for <b>ISN'T AVAILABLE</b> or the URL is <b>WRONG</b>! Return to main page:  </h1>
        <NavLink to="/burger">Home</NavLink>
    </div>
)

export default notFound;