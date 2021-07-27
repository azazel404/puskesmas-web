import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";

import "./style.css";
import AuthAPI from "../../../api/AuthAPI";
import { withRouter } from "react-router-dom";

const Login = (props) => {
	const onFinish = (values) => {
		let body = {
			email: values.email,
			password: values.password,
		};
		AuthAPI.Login(body)
			.then((res) => {
				localStorage.setItem("token_login", res.data.data.token);
				props.history.push("/praktik");
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	return (
		<div
			style={{
				padding: "24px",
				display: "flex",
				flexDirection: "row",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
			}}
		>
			<div style={{ width: "300px" }}>
				<div>
					<h1>Masuk</h1>
				</div>
				<Form
					name="normal_login"
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
				>
					<Form.Item
						name="email"
						rules={[
							{
								required: true,
								message: "Please input your Email!",
							},
						]}
					>
						<Input
							prefix={<UserOutlined className="site-form-item-icon" />}
							placeholder="Email"
						/>
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your Password!",
							},
						]}
					>
						<Input
							prefix={<LockOutlined className="site-form-item-icon" />}
							type="password"
							placeholder="Password"
						/>
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button">
							Masuk
						</Button>
					</Form.Item>
				</Form>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
					<a href="/register">Atau Daftar</a>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Login);
