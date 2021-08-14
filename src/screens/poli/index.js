import React from "react";
import { TextField, SelectField } from "../../components/Form";
import Container from "../../components/container";
import Toolbar from "../../components/Toolbar";
import { Button, Modal, Form, Input, Table, Space } from "antd";
import PolisAPI from "../../api/PolisAPI";
import PuskesmasAPI from "../../api/PuskesmasAPI";
import DokterAPI from "../../api/DokterAPI";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import swal from "sweetalert";

const schema = yup.object().shape({
	nama_poli: yup.string().required("Field ini wajib di isi !"),
	puskesmas_id: yup.string().required("Field ini wajib di isi !"),
	dokter_id: yup.string().required("Field ini wajib di isi !"),
});

const ListPolis = (props) => {
	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const [dataSource, setDataSource] = React.useState([]);
	const [dataSourcePuskesmas, setDataSourcePuskesmas] = React.useState([]);
	const [dataSourceDokter, setDataSourceDokter] = React.useState([]);
	const [detailId, setDetailId] = React.useState(null);
	const [initialValues, setInitialValues] = React.useState({
		nama_poli: "",
		puskesmas_id: "",
		dokter_id: "",
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
			nama_poli: values.nama_poli,
			puskesmas_id: values.puskesmas_id,
			dokter_id: values.dokter_id,
		};
		let fetch;
		if (detailId !== null) {
			fetch = PolisAPI.update(detailId, payload);
		} else {
			fetch = PolisAPI.create(payload);
		}
		fetch
			.then((res) => {
				setIsModalVisible(false);
				swal("Selamat !", "Data sukses di proses", "success");
				reset({});
				retrieveDataPoli();
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const onDelete = (id) => {
		PolisAPI.delete(id)
			.then((res) => {
				retrieveDataPoli();
				swal("Selamat !", "Data sukses di hapus", "success");
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const retrieveDataPoli = () => {
		PolisAPI.getList()
			.then((res) => {
				setDataSource(res.data.data);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const retrieveDataDokter = () => {
		DokterAPI.getList()
			.then((res) => {
				let data = res.data.data.map((item) => {
					return { label: item.nama_dokter, value: item.id };
				});
				setDataSourceDokter(data);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const retrieveDataPuskesmas = () => {
		PuskesmasAPI.getList()
			.then((res) => {
				let data = res.data.data.map((item) => {
					return { label: item.nama_puskesmas, value: item.id };
				});
				setDataSourcePuskesmas(data);
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	React.useEffect(() => {
		retrieveDataPoli();
		retrieveDataDokter();
		retrieveDataPuskesmas();
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
					Tambah Poli
				</Button>
			</>
		);
	};

	const columns = [
		{
			title: "Nama Poli",
			dataIndex: "nama_poli",
			key: "nama_poli",
		},
		{
			title: "Nama Dokter",
			key: "nama_dokter",
			render: (text, record) => (
				<span>{record.dokters && record.dokters.nama_dokter}</span>
			),
		},
		{
			title: "Spesialis Dokter",
			key: "spesialis",
			render: (text, record) => <span>{record.dokters && record.dokters.spesialis}</span>,
		},
		{
			title: "Puskesmas",
			key: "puskesmas",
			render: (text, record) => (
				<span>{record.puskesmas && record.puskesmas.nama_puskesmas}</span>
			),
		},
		{
			title: "Lokasi Puskesmas",
			key: "lokasi",
			render: (text, record) => (
				<span>{record.puskesmas && record.puskesmas.lokasi}</span>
			),
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
				<Toolbar title={"Daftar Poli"} customActions={toolbarActions} />
				<Table columns={columns} dataSource={dataSource} />
				{isModalVisible && (
					<Modal
						title="Poli"
						visible={isModalVisible}
						footer={null}
						onCancel={handleCancel}
					>
						<form onSubmit={handleSubmit(handleActionSubmit)}>
							<div style={{ marginBottom: "14px" }}>
								<TextField
									name="nama_poli"
									control={control}
									label="Nama Poli"
									errormessage={errors.nama_poli?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<SelectField
									name="dokter_id"
									control={control}
									label="Dokter"
									options={dataSourceDokter}
									errormessage={errors.dokter_id?.message}
								/>
							</div>
							<div style={{ marginBottom: "14px" }}>
								<SelectField
									name="puskesmas_id"
									control={control}
									label="Puskesmas"
									options={dataSourcePuskesmas}
									errormessage={errors.puskesmas_id?.message}
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

export default ListPolis;
