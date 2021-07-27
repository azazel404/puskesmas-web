import React from "react";
import { TextField, SelectField } from "../../components/Form";
import Container from "../../components/container";
import Toolbar from "../../components/Toolbar";
import { Button, Modal, Form, Input, Table, Space } from "antd";
import DokterAPI from "../../api/DokterAPI";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from "sweetalert";

const schema = yup.object().shape({
	nama_dokter: yup.string().required("Field ini wajib di isi !"),
	spesialis: yup.string().required("Field ini wajib di isi !"),
	email: yup.string().required("Field ini wajib di isi !"),
	no_hp: yup.string().required("Field ini wajib di isi !"),
	alamat: yup.string().required("Field ini wajib di isi !"),
});

const ListDokter = (props) => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const [dataSource, setDataSource] = React.useState([]);
	const [detailId, setDetailId] = React.useState(null);
	const [initialValues, setInitialValues] = React.useState({
		nama_dokter: "",
		spesialis: "",
		email: "",
		no_hp: "",
		alamat: "",
	});

	const { register, handleSubmit, control, errors, reset } = useForm({
		resolver: yupResolver(schema),
		defaultValues: initialValues,
	});

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleActionSubmit = (values) => {
		console.log("values", values);
		const payload = {
			nama_dokter: values.nama_dokter,
			spesialis: values.spesialis,
			email: values.email,
			no_hp: values.no_hp,
			alamat: values.alamat,
		};
		let fetch;
		if (detailId !== null) {
			fetch = DokterAPI.update(detailId, payload);
		} else {
			fetch = DokterAPI.create(payload);
		}
		fetch
			.then((res) => {
				setIsModalVisible(false);
				swal("Selamat !", "Data sukses di proses", "success");
				reset({});
				retrieveDataDokter();
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const onDelete = (id) => {
		DokterAPI.delete(id)
			.then((res) => {
				retrieveDataDokter();
				swal("Selamat !", "Data sukses di hapus", "success");
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const retrieveDataDokter = () => {
		DokterAPI.getList()
			.then((res) => {
				setDataSource(res.data.data);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	React.useEffect(() => {
		retrieveDataDokter();
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
					Tambah Dokter
				</Button>
			</>
		);
	};

	const columns = [
		{
			title: "Name Dokter",
			dataIndex: "nama_dokter",
			key: "nama_dokter",
		},
		{
			title: "Spesialis",
			dataIndex: "spesialis",
			key: "spesialis",
		},
		{
			title: "Email",
			dataIndex: "email",
			key: "email",
		},
		{
			title: "Nomor Handphone",
			dataIndex: "no_hp",
			key: "no_hp",
		},
		{
			title: "Alamat",
			dataIndex: "alamat",
			key: "alamat",
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
				<Toolbar title={"Daftar Dokter"} customActions={toolbarActions} />
				<Table columns={columns} dataSource={dataSource} />
				{isModalVisible && (
					<Modal
						title="Dokter"
						visible={isModalVisible}
						footer={null}
						onCancel={handleCancel}
					>
						<form onSubmit={handleSubmit(handleActionSubmit)}>
							<div style={{ marginBottom: "14px" }}>
								<TextField
									name="nama_dokter"
									control={control}
									label="Nama Dokter"
									errormessage={errors.nama_dokter?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<TextField
									name="spesialis"
									control={control}
									label="Spesialis"
									errormessage={errors.spesialis?.message}
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
									name="no_hp"
									control={control}
									label="No Handphone"
									errormessage={errors.no_hp?.message}
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

export default ListDokter;
