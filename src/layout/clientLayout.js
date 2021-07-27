import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Navigation from "../layout/bottomNavigation";
import ListPraktik from "../screens/client/listPraktik";
import ListAntrian from "../screens/client/ListAntrian";
import Profile from "../screens/client/akun";
import "antd/dist/antd.css";

const ClientLayout = (props) => {
	const { history, location } = props;

	const isRoot = location.pathname === "/";
	if (isRoot) return <Redirect to={"/praktik"} />;

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				flexGrow: 1,
			}}
		>
			<div
				style={{
					minHeight: "calc(100vh - 56px)",
					backgroundColor: "#f5f5f5",
				}}
			>
				<Switch>
					<Route path={`/praktik`} component={ListPraktik} />
					<Route path={`/antrian`} component={ListAntrian} />
					<Route path={`/akun`} component={Profile} />
				</Switch>
			</div>
			<div
				style={{
					position: "fixed",
					bottom: 0,
					width: "100%",
				}}
			>
				<Navigation />
			</div>
		</div>
	);
};

export default ClientLayout;
