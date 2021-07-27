import React, { Component, Fragment } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "./screens/login";
import LoginClient from "./screens/client/login";
import RegisterClient from "./screens/client/register";
import MainLayout from "./layout/mainLayout";
import ClientLayout from "./layout/clientLayout";
import ProtectedRoutes from "./helpers/protectedRoutes";
import ProtectedRouteClient from "./helpers/protectedRouteClient";

class App extends Component {
	render() {
		return (
			<Fragment>
				<Switch>
					<Route path={"/admin/login"} component={Login} />
					<Route path={"/register"} component={RegisterClient} />
					<Route path={"/login"} component={LoginClient} />
					<ProtectedRoutes path={"/admin"} component={MainLayout} />
					<ProtectedRouteClient path={"/"} component={ClientLayout} />
				</Switch>
			</Fragment>
		);
	}
}

export default App;
