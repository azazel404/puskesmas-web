import React from "react";
import { TextField, SelectField } from "../../components/Form";
import Container from "../../components/container";
import Toolbar from "../../components/Toolbar";
import { Button, Modal, Form, Input, Table, Space } from "antd";
import AntrianAPI from "../../api/AntrianAPI";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from "sweetalert";
import moment from "moment";
import ModalExport from "./modalExport";

const ListAntrian = (props) => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const [isOpenModalExport, setIsOpenModalExport] = React.useState(false);
	const [dataSource, setDataSource] = React.useState([]);
	const [detailId, setDetailId] = React.useState(null);
	const [initialValues, setInitialValues] = React.useState({
		status_antrian: "",
	});

	const { register, handleSubmit, control, errors, reset } = useForm({
		defaultValues: initialValues,
	});

	const toggleModalExport = () => {
		setIsOpenModalExport(!isOpenModalExport);
	};

	const handleActionSubmit = (values) => {
		const payload = {
			status_antrian: values.status_antrian,
		};
		let fetch;
		if (detailId !== null) {
			fetch = AntrianAPI.update(detailId, payload);
		}
		fetch
			.then((res) => {
				setIsModalVisible(false);
				swal("Selamat !", "Data sukses di proses", "success");
				reset({});
				retrieveDataAntrian();
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const handleSubmitExport = (values) => {
		let start = moment(values.startDate).format("YYYY-MM-DD");
		let end = moment(values.endDate).format("YYYY-MM-DD");
		AntrianAPI.exportAntrian(start, end)
			.then((response) => {
				var reader = new FileReader();
				reader.readAsDataURL(response.data);
				reader.onload = function () {
					window.open(reader.result, "_blank");
				};
				reader.onerror = function (error) {
					console.log("Error: ", error);
				};
			})
			.catch((err) => {
				swal("Error!", "data laporan transaksi  tidak ditemukan", "error");
			});
	};

	const retrieveDataAntrian = () => {
		AntrianAPI.getList()
			.then((res) => {
				setDataSource(res.data.data);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	React.useEffect(() => {
		retrieveDataAntrian();
	}, []);

	const handleCancel = () => {
		setIsModalVisible(false);
		reset({});
	};

	const columns = [
		{
			title: "Nama Pasien",
			dataIndex: "users",
			key: "users",
			render: (text, record) => <span>{record.users.nama}</span>,
		},
		{
			title: "Poli",
			dataIndex: "Poli",
			key: "Poli",
			render: (text, record) => <span>{record.praktiks.nama_praktik}</span>,
		},
		{
			title: "Antrian",
			dataIndex: "antrian",
			key: "antrian",
			render: (text, record) => <span>{record.nomor_antrian}</span>,
		},
		{
			title: "Tanggal Kunjungan",
			dataIndex: "tanggal_kunjungan",
			key: "tanggal_kunjungan",
			render: (text, record) => (
				<span>{moment(record.tanggal_kunjungan).format("dddd MMMM YYYY HH:mm")}</span>
			),
		},
		{
			title: "Status Antrian",
			dataIndex: "status",
			key: "status",
			render: (text, record) => <span>{record.status_antrian}</span>,
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
						Proses Antrian
					</a>
				</Space>
			),
		},
	];

	const customActionsButton = () => {
		return (
			<Button htmlType="submit" key="submit" type="primary" onClick={toggleModalExport}>
				Export
			</Button>
		);
	};

	const statusAntrianOptions = [
		{ label: "Antri", value: "antri" },
		{ label: "Proses", value: "proses" },
		{ label: "Selesai", value: "selesai" },
	];

	return (
		<>
			<Container>
				{" "}
				<Toolbar title={"Daftar Antrian"} customActions={customActionsButton} />
				<Table columns={columns} dataSource={dataSource} />
				{isOpenModalExport && (
					<ModalExport
						isOpen={isOpenModalExport}
						handleCancel={toggleModalExport}
						onSubmit={handleSubmitExport}
					/>
				)}
				{isModalVisible && (
					<Modal
						title="Puskesmas"
						visible={isModalVisible}
						footer={null}
						onCancel={handleCancel}
					>
						<form onSubmit={handleSubmit(handleActionSubmit)}>
							<div style={{ marginBottom: "14px" }}>
								<SelectField
									name="status_antrian"
									control={control}
									label="Status Antrian"
									options={statusAntrianOptions}
									errormessage={errors.status_antrian?.message}
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

export default ListAntrian;
