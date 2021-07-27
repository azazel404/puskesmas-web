import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRouteClient({ user, component: Component, ...rest }) {
	function validateRoute() {
		let checkAccessToken = localStorage.getItem("token_login");

		if (checkAccessToken !== null) {
			return true;
		} else {
			return false;
		}
	}
	return (
		<Route
			{...rest}
			render={(props) =>
				validateRoute() ? <Component {...props} /> : <Redirect to={"/login"} />
			}
		/>
	);
}

export default ProtectedRouteClient;
