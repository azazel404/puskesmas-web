import React from "react";
import { Route, Redirect } from "react-router-dom";

function ProtectedRoutes({ user, component: Component, ...rest }) {
	function validateRoute() {
		let checkAccessToken = localStorage.getItem("token_login");
		let roleAccess = localStorage.getItem("role_puskesmas");
		if (checkAccessToken !== null && roleAccess) {
			return true;
		} else {
			return false;
		}
	}
	return (
		<Route
			{...rest}
			render={(props) =>
				validateRoute() ? <Component {...props} /> : <Redirect to={"/admin/login"} />
			}
		/>
	);
}

export default ProtectedRoutes;
