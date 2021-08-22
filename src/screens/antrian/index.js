import React from "react";
import { TextField, SelectField } from "../../components/Form";
import Container from "../../components/container";
import Toolbar from "../../components/Toolbar";
import { Button, Modal, Form, Input, Table, Space } from "antd";
import AntrianAPI from "../../api/AntrianAPI";
import PraktikAPI from "../../api/PraktikAPI";
import { Select } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import XLSX from "xlsx";
import swal from "sweetalert";
import moment from "moment";

import CircularProgress from "@material-ui/core/CircularProgress";

const { Option } = Select;

const ListAntrian = (props) => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [dataExport, setDataExport] = React.useState([]);
	const [dataSource, setDataSource] = React.useState([]);
	const [praktikOptions, setPraktikOptions] = React.useState([]);
	const [detailId, setDetailId] = React.useState(null);
	const [praktikId, setPraktikId] = React.useState("");
	const [initialValues, setInitialValues] = React.useState({
		status_antrian: "",
	});

	const { register, handleSubmit, control, errors, reset } = useForm({
		defaultValues: initialValues,
	});

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

	const handleChange = (data) => {
		setPraktikId(data);
	};

	const retrieveDataAntrian = () => {
		setIsLoading(true);
		const body = {
			praktikId: praktikId,
		};
		AntrianAPI.getList(body)
			.then((res) => {
				setDataSource(res.data.data);
				let x = res.data.data.map((item) => {
					return {
						nama: item.users.nama,
						poli: item.praktiks.nama_praktik,
						antrian: item.nomor_antrian,
						tanggal_kunjungan: moment(item.tanggal_kunjungan).format(
							"dddd, DD-MMMM-YYYY HH:mm"
						),
						status_antrian: item.status_antrian,
					};
				});
				console.log("x", x);
				setDataExport(x);
			})
			.catch((err) => {
				console.log("err", err);
			})
			.finally((err) => {
				setIsLoading(false);
			});
	};

	const retrievePraktik = () => {
		PraktikAPI.getList()
			.then((res) => {
				setPraktikOptions(res.data.data);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const handleSubmitExport = () => {
		const newData = dataExport.map((row) => {
			delete row.tableData;
			return row;
		});
		const workSheet = XLSX.utils.json_to_sheet(newData);
		const workBook = XLSX.utils.book_new();
		XLSX.utils.book_append_sheet(workBook, workSheet, "antrians");
		//Buffer
		let buf = XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
		//Binary string
		XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
		//Download
		XLSX.writeFile(workBook, "exportData.xlsx");
	};

	React.useEffect(() => {
		retrievePraktik();
	}, []);

	React.useEffect(() => {
		retrieveDataAntrian();
	}, [praktikId]);

	const toggleRefresh = () => {
		retrieveDataAntrian();
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		reset({});
	};

	const columns = [
		{
			title: "Nama Pasien",
			dataIndex: "users",
			key: "users",
			render: (text, record) => <span>{record.users && record.users.nama}</span>,
		},
		{
			title: "Poli",
			dataIndex: "Poli",
			key: "Poli",
			render: (text, record) => (
				<span>{record.praktiks && record.praktiks.nama_praktik}</span>
			),
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
				<span>{moment(record.tanggal_kunjungan).format("dddd, DD-MMMM-YYYY HH:mm")}</span>
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
			<>
				<div style={{ display: "flex" }}>
					<div style={{ paddingRight: "24px" }}>
						<Select
							placeholder="Pilih Poli"
							style={{ width: 300 }}
							onChange={handleChange}
						>
							{praktikOptions.map((item) => {
								return <Option value={item.id}>{item.nama_praktik}</Option>;
							})}
						</Select>
					</div>
					<div style={{ paddingRight: "24px" }}>
						<Button htmlType="submit" key="submit" onClick={toggleRefresh}>
							Muat Ulang Antrian
						</Button>
					</div>
					<div>
						<Button
							htmlType="submit"
							key="submit"
							type="primary"
							onClick={handleSubmitExport}
						>
							Export
						</Button>
					</div>
				</div>
			</>
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
				{isLoading ? (
					<div
						style={{
							display: "flex",
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
						}}
					>
						<CircularProgress />
					</div>
				) : (
					<Table columns={columns} dataSource={dataSource} />
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
