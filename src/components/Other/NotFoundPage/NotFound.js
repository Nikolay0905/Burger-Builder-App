import React from "react";
import { NavLink } from "react-router-dom";

import { ROUTES } from "../../../routes";

const notFound = (props) => (
	<div style={{ textAlign: "center" }}>
		<h1>
			The page you have searched for <b>ISN'T AVAILABLE</b> or the URL is{" "}
			<b>WRONG</b>! Return to main page:{" "}
		</h1>
		<h2>
			<NavLink
				to={ROUTES.burger}
				style={{ textDecoration: "none", color: "red" }}>
				HOME
			</NavLink>
		</h2>
	</div>
);

export default notFound;
