import React from "react";
import { TimeInputPicker, SelectField, InputPicker } from "../../components/Form";
import Container from "../../components/container";
import Toolbar from "../../components/Toolbar";
import { Button, Modal, Form, Input, Table, Space } from "antd";
import PraktikAPI from "../../api/PraktikAPI";
import PolisAPI from "../../api/PolisAPI";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from "sweetalert";
import moment from "moment";

const schema = yup.object().shape({
	nama_dokter: yup.string().required("Field ini wajib di isi !"),
	spesialis: yup.string().required("Field ini wajib di isi !"),
	email: yup.string().required("Field ini wajib di isi !"),
	no_hp: yup.string().required("Field ini wajib di isi !"),
	alamat: yup.string().required("Field ini wajib di isi !"),
});

const ListPraktik = (props) => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const [dataSource, setDataSource] = React.useState([]);
	const [dataSourcePolis, setDataSourcePolis] = React.useState([]);
	const [dataPolis, setDataPolis] = React.useState([]);
	const [detailId, setDetailId] = React.useState(null);
	const [initialValues, setInitialValues] = React.useState({
		jam_mulai: "",
		jam_tutup: "",
		start_praktik: "",
		end_praktik: "",
		polis_id: "",
		status: "",
	});

	const { register, handleSubmit, control, errors, reset } = useForm({
		// resolver: yupResolver(schema),
		defaultValues: initialValues,
	});

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleActionSubmit = (values) => {
		let nama = dataSourcePolis.filter((item) => item.value === values.polis_id);
		let dataValue = dataPolis.filter((item) => item.id === values.polis_id);

		const payload = {
			nama_praktik: nama[0].label,
			dokter_id: dataValue[0].dokter_id,
			puskesmas_id: dataValue[0].puskesmas_id,
			jam_mulai: values.jam_mulai,
			jam_tutup: values.jam_tutup,
			start_praktik: values.start_praktik,
			end_praktik: values.end_praktik,
			polis_id: values.polis_id,
			status: values.status,
		};
		let fetch;
		if (detailId !== null) {
			fetch = PraktikAPI.update(detailId, payload);
		} else {
			fetch = PraktikAPI.create(payload);
		}
		fetch
			.then((res) => {
				setIsModalVisible(false);
				swal("Selamat !", "Data sukses di proses", "success");
				reset({});
				retrieveDataPraktik();
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const onDelete = (id) => {
		PraktikAPI.delete(id)
			.then((res) => {
				retrieveDataPraktik();
				swal("Selamat !", "Data sukses di hapus", "success");
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const retrieveDataPraktik = () => {
		PraktikAPI.getList()
			.then((res) => {
				setDataSource(res.data.data);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const retrieveDataPolis = () => {
		PolisAPI.getList()
			.then((res) => {
				let data = res.data.data.map((item) => {
					return { label: item.nama_poli, value: item.id };
				});
				setDataPolis(res.data.data);
				setDataSourcePolis(data);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	React.useEffect(() => {
		retrieveDataPraktik();
		retrieveDataPolis();
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
					Tambah Praktik
				</Button>
			</>
		);
	};

	const statusOptions = [
		{ label: "Aktif", value: "aktif" },
		{ label: "Tidak Aktif", value: "tidakAktif" },
	];

	const columns = [
		{
			title: "Nama Polis",
			dataIndex: "polis_id",
			key: "polis_id",
			render: (text, record) => <span>{record.polis && record.polis.nama_poli}</span>,
		},
		{
			title: "Jam Mulai",
			dataIndex: "jam_mulai",
			key: "jam_mulai",
			render: (text, record) => <span>{moment(record.jam_mulai).format("HH:mm")}</span>,
		},
		{
			title: "Jam Tutup",
			dataIndex: "jam_tutup",
			key: "jam_tutup",
			render: (text, record) => <span>{moment(record.tutup).format("HH:mm")}</span>,
		},
		{
			title: "Mulai Praktik",
			dataIndex: "start_praktik",
			key: "start_praktik",
			render: (text, record) => (
				<span>{moment(record.start_pratik).format("dddd MMMM YYYY")}</span>
			),
		},
		{
			title: "Tutup Praktik",
			dataIndex: "end_praktik",
			key: "end_praktik",
			render: (text, record) => (
				<span>{moment(record.end_praktik).format("dddd MMMM YYYY")}</span>
			),
		},

		{
			title: "Status",
			dataIndex: "status",
			key: "status",
		},

		{
			title: "Action",
			key: "action",
			render: (text, record) => (
				<Space size="middle">
					{/* <a
					// onClick={() => {
					// 	setDetailId(record.id);
					// 	setInitialValues(record);
					// 	reset(record);
					// 	setIsModalVisible(true);
					// }}
					>
						Ubah Tidak Aktif
					</a> */}
					<a
						onClick={() => {
							setDetailId(record.id);
							let initial = {
								...record,
								jam_mulai: moment(record.jam_mulai, "HH:mm"),
								jam_tutup: moment(record.jam_tutup, "HH:mm"),
								start_praktik: moment(record.start_praktik),
								end_praktik: moment(record.end_praktik),
							};
							setInitialValues(initial);
							reset(initial);
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
				<Toolbar title={"Praktik"} customActions={toolbarActions} />
				<Table columns={columns} dataSource={dataSource} />
				{isModalVisible && (
					<Modal
						title="Praktik"
						visible={isModalVisible}
						footer={null}
						onCancel={handleCancel}
					>
						<form onSubmit={handleSubmit(handleActionSubmit)}>
							<div style={{ marginBottom: "14px" }}>
								<TimeInputPicker
									name="jam_mulai"
									control={control}
									label="Jam Mulai"
									errormessage={errors.jam_mulai?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<TimeInputPicker
									name="jam_tutup"
									control={control}
									label="Jam Tutup"
									errormessage={errors.jam_tutup?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<InputPicker
									name="start_praktik"
									control={control}
									label="Mulai Praktik"
									errormessage={errors.start_praktik?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<InputPicker
									name="end_praktik"
									control={control}
									label="Tutup Praktik"
									errormessage={errors.end_praktik?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<SelectField
									name="polis_id"
									control={control}
									label="Polis"
									options={dataSourcePolis}
									errormessage={errors.polis_id?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<SelectField
									name="status"
									control={control}
									label="Status"
									options={statusOptions}
									errormessage={errors.status?.message}
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

export default ListPraktik;
