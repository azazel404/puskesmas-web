import React from "react";
import { Form, Input, Button } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import swal from "sweetalert";
import "./style.css";
import AuthAPI from "../../../api/AuthAPI";
import { withRouter } from "react-router-dom";

const Register = (props) => {
	const onFinish = (values) => {
		let body = {
			email: values.email,
			nama: values.nama,
			nik: values.nik,
			nomor_hp: values.nomor_hp,
			alamat: values.alamat,
			password: values.password,
		};
		AuthAPI.Register(body)
			.then((res) => {
				props.history.push("/login");
			})
			.catch((err) => {
				swal("Message !", "Email Atau username sudah terdaftar", "error");
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
					<h1>Daftar</h1>
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
								message: "Field ini wajib diisi !",
							},
						]}
					>
						<Input placeholder="Email" />
					</Form.Item>
					<Form.Item
						name="nama"
						rules={[
							{
								required: true,
								message: "Field ini wajib diisi !",
							},
						]}
					>
						<Input placeholder="Nama" />
					</Form.Item>
					<Form.Item
						name="nik"
						rules={[
							{
								required: true,
								message: "Field ini wajib diisi !",
							},
						]}
					>
						<Input placeholder="Nik" />
					</Form.Item>
					<Form.Item
						name="nomor_hp"
						rules={[
							{
								required: true,
								message: "Field ini wajib diisi !",
							},
						]}
					>
						<Input placeholder="Nomor Handphone" />
					</Form.Item>
					<Form.Item
						name="alamat"
						rules={[
							{
								required: true,
								message: "Field ini wajib diisi !",
							},
						]}
					>
						<Input placeholder="Alamat" />
					</Form.Item>
					<Form.Item
						name="password"
						rules={[
							{
								required: true,
								message: "Field ini wajib diisi !",
							},
						]}
					>
						<Input type="password" placeholder="Password" />
					</Form.Item>
					<Form.Item>
						<Button type="primary" htmlType="submit" className="login-form-button">
							Daftar
						</Button>
					</Form.Item>
				</Form>
				<div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
					<a href="/login">Atau Masuk</a>
				</div>
			</div>
		</div>
	);
};

export default withRouter(Register);
