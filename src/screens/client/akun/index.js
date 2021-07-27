import React, { useEffect, useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Paper } from "@material-ui/core";
import AuthAPI from "../../../api/AuthAPI";
import Header from "./header";
import { LogoutOutlined } from "@ant-design/icons";
import { Button } from "antd";

const Akun = (props) => {
	const [profile, setProfile] = React.useState({});
	const retrieveUser = () => {
		AuthAPI.Profile()
			.then((res) => {
				setProfile(res.data.data);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	React.useEffect(() => {
		retrieveUser();
	}, []);

	return (
		<div>
			<Header />
			<div
				style={{ height: "83vh", overflow: "auto", padding: "12px", marginTop: "38px" }}
			>
				<div
					style={{
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						marginBottom: "12px",
					}}
				>
					<Avatar alt="Avatar" style={{ width: "100px", height: "100px" }} />
				</div>
				<Paper style={{ marginBottom: "12px" }}>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							padding: "12px",
						}}
					>
						<span style={{ fontSize: "16px" }}>Nama : {profile && profile.nama}</span>
						<span style={{ fontSize: "16px" }}>Email : {profile && profile.email}</span>
						<span style={{ fontSize: "16px", paddingRight: "12px" }}>
							Nik : {profile && profile.nik}
						</span>
						<span style={{ fontSize: "16px", paddingRight: "12px" }}>
							Nomor Handphone : {profile && profile.nomor_hp}
						</span>
						<span style={{ fontSize: "16px", paddingRight: "12px" }}>
							Alamat : {profile && profile.alamat}
						</span>
					</div>
				</Paper>
				<Button
					type="primary"
					icon={<LogoutOutlined />}
					style={{ borderRadius: "6px", width: "100%" }}
					onClick={() => {
						localStorage.removeItem("token_login");
						window.location.reload();
					}}
				>
					Logout
				</Button>
			</div>
		</div>
	);
};

export default Akun;
