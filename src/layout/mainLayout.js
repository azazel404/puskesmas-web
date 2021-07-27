import React, { Suspense, useState } from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";
import NavigationOptions from "./navigation";
import Content from "./content";
import Separator from "../components/separator";
import { Layout, Button } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { items } from "./constant";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

import ListPuskesmas from "../screens/puskesmas";
import ListDokter from "../screens/dokter";
import ListPasien from "../screens/pasien";
import ListPoli from "../screens/poli";
import ListPraktik from "../screens/praktik";
import ListAntrian from "../screens/antrian";

import "antd/dist/antd.css";

const MainLayout = (props) => {
	const { history, location } = props;
	const [collapsed, setCollapsed] = useState(false);

	const toggleSidebar = () => {
		setCollapsed(!collapsed);
	};

	const renderActions = () => {
		return (
			<>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "center",
					}}
				>
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<Avatar icon={<UserOutlined />} />
						<Separator variant="horizontal" size="6" />
						user
					</div>
					<Separator variant="horizontal" size="24" />
					<Button
						type="primary"
						icon={<LogoutOutlined />}
						style={{ borderRadius: "6px" }}
						onClick={() => {
							localStorage.removeItem("token_login");
							window.location.reload();
						}}
					>
						Logout
					</Button>
				</div>
			</>
		);
	};

	const isRoot = location.pathname === "/admin";
	if (isRoot) return <Redirect to={"/admin/puskesmas"} />;

	return (
		<Layout style={{ minHeight: "100vh" }}>
			<Sidebar collapsed={collapsed}>
				<NavigationOptions items={items} />
			</Sidebar>
			<Layout className="site-layout">
				<Header
					toggle={toggleSidebar}
					collapsed={collapsed}
					renderActions={renderActions}
				/>
				<Content>
					<Switch>
						<Route path={`/admin/puskesmas`} exact component={ListPuskesmas} />
						<Route path={`/admin/dokter`} exact component={ListDokter} />
						<Route path={`/admin/pasien`} exact component={ListPasien} />
						<Route path={`/admin/poli`} exact component={ListPoli} />
						<Route path={`/admin/praktik`} exact component={ListPraktik} />
						<Route path={`/admin/antrian`} exact component={ListAntrian} />
					</Switch>
				</Content>
			</Layout>
		</Layout>
	);
};

export default MainLayout;
