import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Header from "./header";
import PraktikAPI from "../../../api/PraktikAPI";
import AntrianAPI from "../../../api/AntrianAPI";
import AuthAPI from "../../../api/AuthAPI";
import { TimeInputPicker, SelectField, InputPicker } from "../../../components/Form";
import moment from "moment";
import { Button, Modal, Form, Input, Table, Space } from "antd";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import CardLoading from "../../../components/cardLoading";

import swal from "sweetalert";

const ListPraktik = (props) => {
	const [dataSource, setDataSource] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [isModalVisible, setIsModalVisible] = React.useState(false);
	const [detail, setDetail] = React.useState({});
	const [profile, setProfile] = React.useState({});
	const [currentAntrian, setCurrentAntrian] = React.useState(null);
	const [puskesmas, setPuskesmas] = React.useState([]);

	const { register, handleSubmit, control, errors, reset } = useForm({
		// resolver: yupResolver(schema),
		// defaultValues: initialValues,
	});

	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleActionSubmit = (values) => {
		let current =
			currentAntrian !== null ? currentAntrian[currentAntrian.length - 1] : [];
		let payload = {
			users_id: profile.id,
			praktik_id: detail.id,
			dokter_id: detail.dokter_id,
			puskemas_id: detail.puskesmas_id,
			tanggal_kunjungan: moment(),
			status_antrian: "antri",
		};
		let praktikId = current && current.praktik_id !== undefined ? current.praktik_id : "";

		if (praktikId === detail.id) {
			payload.nomor_antrian = current.nomor_antrian + 1;
		} else {
			payload.nomor_antrian = 1;
		}

		let userId = current && current.users_id !== undefined ? current.users_id : "";
		// let antrian =
		// 	current && current.status_antrian !== undefined ? current.status_antrian : "";

		if (userId !== profile.id) {
			AntrianAPI.create(payload)
				.then((res) => {
					setIsModalVisible(false);
					swal("Selamat !", "Data sukses di proses", "success");
					reset({});
					retrievePraktik();
				})
				.catch((err) => {
					console.log("err", err);
				});
		} else {
			swal("Error !", "Anda sudah ambil antrian sebelumnnya", "error");
		}
	};

	const retrievePraktik = () => {
		setIsLoading(true);
		PraktikAPI.getClientPraktik()
			.then((res) => {
				setDataSource(res.data.data);
			})
			.catch((err) => {
				console.log("err", err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const retrievePuskesmas = () => {
		setIsLoading(true);
		PraktikAPI.getPuskesmasClient()
			.then((res) => {
				setPuskesmas(res.data.data);
			})
			.catch((err) => {
				console.log("err", err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const retrieveUser = () => {
		AuthAPI.Profile()
			.then((res) => {
				setProfile(res.data.data);
				AntrianAPI.listAntrianUser()
					.then((res) => {
						setCurrentAntrian(res.data.data);
					})
					.catch((err) => {
						console.log("err", err);
					});
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const handleCancel = () => {
		setIsModalVisible(false);
		reset({});
	};

	React.useEffect(() => {
		retrievePraktik();
		retrieveUser();
		retrievePuskesmas();
	}, []);

	return (
		<div>
			<Header name={puskesmas ? puskesmas[0].nama_puskesmas : null} />

			<div
				style={{
					padding: "12px",

					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
				}}
			>
				<div style={{ fontSize: "16px", fontWeight: "bold" }}>
					Selamat datang di {puskesmas ? puskesmas[0].nama_puskesmas : null}
				</div>
			</div>

			<div style={{ padding: "12px" }}>
				<div style={{ fontSize: "16px" }}>List Praktik :</div>
			</div>

			<div style={{ height: "74vh", overflow: "auto", padding: "12px" }}>
				{!isLoading ? (
					dataSource ? (
						dataSource.map((item) => {
							return (
								<>
									<Paper style={{ marginBottom: "12px", borderRadius: "12px" }}>
										<div
											style={{
												display: "flex",
												flexDirection: "column",
												padding: "12px",
												borderRadius: "12px",
												borderLeft: "4px solid #3C76D2",
											}}
										>
											<div
												style={{
													display: "flex",
													flexDirection: "row",
													justifyContent: "space-between",
												}}
											>
												<div style={{ fontSize: "18px", fontWeight: "bold" }}>
													{item.nama_praktik}
												</div>
												<Button
													onClick={() => {
														setDetail(item);
														showModal();
													}}
													type="primary"
												>
													Daftar
												</Button>
											</div>
											<div style={{ display: "flex", flexDirection: "row" }}>
												<span style={{ fontSize: "14px", paddingRight: "12px" }}>
													Jam Mulai: {moment(item.jam_mulai).format("HH:mm")}
												</span>
												<span style={{ fontSize: "14px" }}>
													Hingga: {moment(item.jam_tutup).format("HH:mm")}
												</span>
											</div>
											<div style={{ display: "flex", flexDirection: "column" }}>
												<span style={{ fontSize: "14px", paddingRight: "12px" }}>
													Start:{" "}
													{moment(item.start_pratik)
														.locale("id")
														.format("dddd MMMM YYYY")}
												</span>
												<span style={{ fontSize: "14px" }}>
													End:{" "}
													{moment(item.end_praktik).locale("id").format("dddd MMMM YYYY")}
												</span>
											</div>
										</div>
									</Paper>
								</>
							);
						})
					) : null
				) : (
					<>
						<CardLoading />
						<CardLoading />
						<CardLoading />
						<CardLoading />
					</>
				)}
			</div>
			{isModalVisible && (
				<Modal
					title="Daftar Praktik Dokter"
					visible={isModalVisible}
					footer={null}
					onCancel={handleCancel}
				>
					<div style={{ display: "flex", flexDirection: "column" }}>
						<div
							style={{ display: "flex", flexDirection: "column", paddingBottom: "12px" }}
						>
							<span style={{ fontSize: "16px", paddingRight: "12px" }}>
								Nama Praktik:
							</span>
							<span style={{ fontSize: "14px", paddingRight: "12px" }}>
								{detail.nama_praktik}
							</span>
						</div>
						<div
							style={{ display: "flex", flexDirection: "column", paddingBottom: "12px" }}
						>
							<span style={{ fontSize: "16px", paddingRight: "12px" }}>Nama Dokter:</span>
							<span style={{ fontSize: "14px", paddingRight: "12px" }}>
								{detail.dokters.nama_dokter}
							</span>
						</div>
						<div
							style={{ display: "flex", flexDirection: "column", paddingBottom: "12px" }}
						>
							<span style={{ fontSize: "16px", paddingRight: "12px" }}>Spesialis:</span>
							<span style={{ fontSize: "14px", paddingRight: "12px" }}>
								{detail.dokters.spesialis}
							</span>
						</div>
						<div
							style={{ display: "flex", flexDirection: "column", paddingBottom: "12px" }}
						>
							<span style={{ fontSize: "16px", paddingRight: "12px" }}>Jam Mulai:</span>
							<span style={{ fontSize: "14px", paddingRight: "12px" }}>
								{moment(detail.jam_mulai).format("HH:mm")}
							</span>
						</div>
						<div
							style={{ display: "flex", flexDirection: "column", paddingBottom: "12px" }}
						>
							<span style={{ fontSize: "16px", paddingRight: "12px" }}>Hingga:</span>
							<span style={{ fontSize: "14px", paddingRight: "12px" }}>
								{moment(detail.jam_tutup).format("HH:mm")}
							</span>
						</div>
						<div
							style={{ display: "flex", flexDirection: "column", paddingBottom: "12px" }}
						>
							<span style={{ fontSize: "16px", paddingRight: "12px" }}>
								Start Praktik:
							</span>
							<span style={{ fontSize: "14px", paddingRight: "12px" }}>
								{moment(detail.start_pratik).locale("ID").format("dddd MMMM YYYY")}
							</span>
						</div>
						<div
							style={{ display: "flex", flexDirection: "column", paddingBottom: "12px" }}
						>
							<span style={{ fontSize: "16px", paddingRight: "12px" }}>End Praktik:</span>
							<span style={{ fontSize: "14px", paddingRight: "12px" }}>
								{moment(detail.end_praktik).locale("ID").format("dddd MMMM YYYY")}
							</span>
						</div>
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
							Batal
						</Button>
						<Button
							onClick={handleActionSubmit}
							htmlType="submit"
							key="submit"
							type="primary"
						>
							Daftar
						</Button>
					</div>
				</Modal>
			)}
		</div>
	);
};

export default withRouter(ListPraktik);
