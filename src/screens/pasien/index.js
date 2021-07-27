import React from "react";
import { TextField, SelectField } from "../../components/Form";
import Container from "../../components/container";
import Toolbar from "../../components/Toolbar";
import { Button, Modal, Form, Input, Table, Space } from "antd";
import PasienAPI from "../../api/PasienAPI";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from "sweetalert";

const schema = yup.object().shape({
	nama: yup.string().required("Field ini wajib di isi !"),
	nik: yup.string().required("Field ini wajib di isi !"),
	password: yup.string().required("Field ini wajib di isi !"),
	alamat: yup.string().required("Field ini wajib di isi !"),
	email: yup.string().required("Field ini wajib di isi !"),
	nomor_hp: yup.string().required("Field ini wajib di isi !"),
});

const ListPasien = (props) => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const [dataSource, setDataSource] = React.useState([]);
	const [detailId, setDetailId] = React.useState(null);
	const [initialValues, setInitialValues] = React.useState({
		nama: "",
		nik: "",
		password: "",
		alamat: "",
		email: "",
		nomor_hp: "",
	});

	const { register, handleSubmit, control, errors, reset } = useForm({
		resolver: yupResolver(schema),
		defaultValues: initialValues,
	});

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleActionSubmit = (values) => {
		const payload = {
			nama: values.nama,
			nik: values.nik,
			password: values.password,
			alamat: values.alamat,
			email: values.email,
			nomor_hp: values.nomor_hp,
		};
		let fetch;
		if (detailId !== null) {
			fetch = PasienAPI.update(detailId, payload);
		} else {
			fetch = PasienAPI.create(payload);
		}
		fetch
			.then((res) => {
				setIsModalVisible(false);
				swal("Selamat !", "Data sukses di proses", "success");
				reset({});
				retrieveDataPasien();
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const onDelete = (id) => {
		PasienAPI.delete(id)
			.then((res) => {
				retrieveDataPasien();
				swal("Selamat !", "Data sukses di hapus", "success");
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const retrieveDataPasien = () => {
		PasienAPI.getList()
			.then((res) => {
				let result = res.data.data.filter((item) => item.isAdmin !== true);
				setDataSource(result);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	React.useEffect(() => {
		retrieveDataPasien();
	}, []);

	const handleCancel = () => {
		setIsModalVisible(false);
		reset({});
	};

	const toolbarActions = () => {
		return (
			<>
				<Button
					type="primary"
					onClick={() => {
						setDetailId(null);
						showModal();
					}}
				>
					Tambah Pasien
				</Button>
			</>
		);
	};

	const columns = [
		{
			title: "Nama",
			dataIndex: "nama",
			key: "nama",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "NIK",
			dataIndex: "nik",
			key: "nik",
		},
		{
			title: "Alamat",
			dataIndex: "alamat",
			key: "alamat",
		},
		{
			title: "Nomor Handphone",
			dataIndex: "nomor_hp",
			key: "nomor_hp",
		},
		{
			title: "Action",
			key: "action",
			render: (text, record) => (
				<Space size="middle">
					<a
						onClick={() => {
							setDetailId(record.id);
							setInitialValues(record);
							reset(record);
							setIsModalVisible(true);
						}}
					>
						Edit
					</a>
					<a onClick={() => onDelete(record.id)}>Delete</a>
				</Space>
			),
		},
	];
	return (
		<>
			<Container>
				{" "}
				<Toolbar title={"Daftar Pasien"} customActions={toolbarActions} />
				<Table columns={columns} dataSource={dataSource} />
				{isModalVisible && (
					<Modal
						title="Pasien"
						visible={isModalVisible}
						footer={null}
						onCancel={handleCancel}
					>
						<form onSubmit={handleSubmit(handleActionSubmit)}>
							<div style={{ marginBottom: "14px" }}>
								<TextField
									name="nama"
									control={control}
									label="Nama"
									errormessage={errors.nama?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<TextField
									name="nik"
									control={control}
									label="Nik"
									errormessage={errors.nik?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<TextField
									name="email"
									control={control}
									label="Email"
									errormessage={errors.email?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<TextField
									name="nomor_hp"
									control={control}
									label="No Handphone"
									errormessage={errors.nomor_hp?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<TextField
									name="alamat"
									control={control}
									label="Alamat"
									errormessage={errors.alamat?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<TextField
									name="password"
									control={control}
									label="Password"
									type="password"
									errormessage={errors.password?.message}
								/>
							</div>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									justifyContent: "space-between",
									paddingTop: "24px",
								}}
							>
								<Button key="back" onClick={handleCancel}>
									Cancel
								</Button>
								<Button htmlType="submit" key="submit" type="primary">
									Submit
								</Button>
							</div>
						</form>
					</Modal>
				)}
			</Container>
		</>
	);
};

export default ListPasien;
