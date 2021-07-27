import React from "react";
import { TextField, SelectField } from "../../components/Form";
import Container from "../../components/container";
import Toolbar from "../../components/Toolbar";
import { Button, Modal, Form, Input, Table, Space } from "antd";
import PuskesmasAPI from "../../api/PuskesmasAPI";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from "sweetalert";

const schema = yup.object().shape({
	nama_puskesmas: yup.string().required("Field ini wajib di isi !"),
	lokasi: yup.string().required("Field ini wajib di isi !"),
	no_telp: yup.string().required("Field ini wajib di isi !"),
});

const ListPuskesmas = (props) => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const [dataSource, setDataSource] = React.useState([]);
	const [detailId, setDetailId] = React.useState(null);
	const [initialValues, setInitialValues] = React.useState({
		nama_puskesmas: "",
		lokasi: "",
		no_telp: "",
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
			nama_puskesmas: values.nama_puskesmas,
			lokasi: values.lokasi,
			no_telp: values.no_telp,
		};
		let fetch;
		if (detailId !== null) {
			fetch = PuskesmasAPI.update(detailId, payload);
		} else {
			fetch = PuskesmasAPI.create(payload);
		}
		fetch
			.then((res) => {
				setIsModalVisible(false);
				swal("Selamat !", "Data sukses di proses", "success");
				reset({});
				retrieveDataPuskesmas();
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const onDelete = (id) => {
		PuskesmasAPI.delete(id)
			.then((res) => {
				retrieveDataPuskesmas();
				swal("Selamat !", "Data sukses di hapus", "success");
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const retrieveDataPuskesmas = () => {
		PuskesmasAPI.getList()
			.then((res) => {
				
				setDataSource(res.data.data);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	React.useEffect(() => {
		retrieveDataPuskesmas();
	}, []);

	const handleCancel = () => {
		setIsModalVisible(false);
		reset({});
	};

	const toolbarActions = () => {
		return (
			<>
				{dataSource && dataSource.length !== 1 ? (
					<Button
						type="primary"
						onClick={() => {
							setDetailId(null);
							showModal();
						}}
					>
						Tambah Puskesmas
					</Button>
				) : null}
			</>
		);
	};

	const columns = [
		{
			title: "Nama Puskesmas",
			dataIndex: "nama_puskesmas",
			key: "nama_puskesmas",
		},
		{
			title: "No Telephone",
			dataIndex: "no_telp",
			key: "no_telp",
		},
		{
			title: "Lokasi",
			dataIndex: "lokasi",
			key: "lokasi",
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
				<Toolbar title={"Puskesmas"} customActions={toolbarActions} />
				<Table columns={columns} dataSource={dataSource} />
				{isModalVisible && (
					<Modal
						title="Puskesmas"
						visible={isModalVisible}
						footer={null}
						onCancel={handleCancel}
					>
						<form onSubmit={handleSubmit(handleActionSubmit)}>
							<div style={{ marginBottom: "14px" }}>
								<TextField
									name="nama_puskesmas"
									control={control}
									label="Nama Puskesmas"
									errormessage={errors.nama_puskesmas?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<TextField
									name="lokasi"
									control={control}
									label="Lokasi"
									errormessage={errors.lokasi?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<TextField
									name="no_telp"
									control={control}
									label="No Telephone"
									errormessage={errors.no_telp?.message}
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

export default ListPuskesmas;
