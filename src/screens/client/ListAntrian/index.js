import React, { useEffect, useState } from "react";
import { Paper } from "@material-ui/core";
import { withRouter } from "react-router-dom";
import Header from "./header";
import EmptyImage from "../../../assets/empty_img_1.svg";
import AntrianAPI from "../../../api/AntrianAPI";
import AuthAPI from "../../../api/AuthAPI";
import CircularProgress from "@material-ui/core/CircularProgress";

import CardLoading from "../../../components/cardLoading";

const ListAntrian = (props) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [profile, setProfile] = React.useState({});
	const [currentAntrian, setCurrentAntrian] = React.useState({});
	const [dataAntrian, setDataAntrian] = React.useState([]);
	const [detailAntrian, setDetailAntrian] = React.useState({});

	const retrieveUser = () => {
		AuthAPI.Profile()
			.then((resUser) => {
				setProfile(resUser.data.data);
				setIsLoading(true);
				AntrianAPI.listAntrianUser()
					.then((responseAntrian) => {
						let userdata = resUser.data.data;
						let dataFilter = responseAntrian.data.data.filter(
							(item) => item.users_id === userdata.id
						);
						let dataFilterUser = dataFilter.filter((item) => {
							return item.status_antrian === "antri" || item.status_antrian === "proses";
						});
						setCurrentAntrian(dataFilterUser !== null ? dataFilterUser[0] : {});
					})
					.catch((err) => {
						console.log("err", err);
					})
					.finally(() => {
						setIsLoading(false);
					});
			})
			.catch((err) => {
				console.log("err", err);
			});
	};

	const retrieveAntrian = () => {
		setIsLoading(true);
		AntrianAPI.listAntrianUser()
			.then((responseAntrian) => {
				setDataAntrian(responseAntrian.data.data);
				let antrian = responseAntrian.data.data.filter(
					(item) => item.status_antrian === "proses"
				);
				setDetailAntrian(antrian[0]);
			})
			.catch((err) => {
				console.log("err", err);
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	const refreshAntrian = () => {
		retrieveUser();
		retrieveAntrian();
	};

	React.useEffect(() => {
		retrieveUser();
		retrieveAntrian();
	}, []);

	return (
		<div>
			<Header handleActions={refreshAntrian} />

			<div
				style={{
					display: "flex",
					alignItems: "center",
					justifyContent: "center",
					marginBottom: "12px",
					marginTop: "42px",
				}}
			>
				{currentAntrian && currentAntrian.status_antrian === "selesai" ? null : (
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<span style={{ fontSize: "16px", paddingRight: "12px" }}>
							Nomor tiket saya:
						</span>
						{isLoading ? (
							<div style={{ paddingTop: "12px" }}>
								<CircularProgress />
							</div>
						) : (
							<span
								style={{ fontSize: "32px", paddingRight: "12px", fontWeight: "bold" }}
							>
								{currentAntrian && currentAntrian.nomor_antrian}
							</span>
						)}
					</div>
				)}
			</div>
			<div style={{ padding: "12px" }}>
				<div style={{ fontSize: "16px" }}>
					{detailAntrian !== undefined ? "Antrian Sekarang :" : null}
				</div>
			</div>
			<div style={{ height: "74vh", overflow: "auto", padding: "12px" }}>
				{isLoading ? (
					<CardLoading />
				) : (
					<>
						{detailAntrian !== undefined ? (
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
										<div
											style={{
												display: "flex",
												flexDirection: "column",
												paddingBottom: "12px",
											}}
										>
											<span style={{ fontSize: "16px", paddingRight: "12px" }}>
												Praktik:
											</span>
											<span style={{ fontSize: "14px", paddingRight: "12px" }}>
												{detailAntrian.praktiks !== undefined &&
													detailAntrian.praktiks.nama_praktik}
											</span>
										</div>
										<div
											style={{
												display: "flex",
												flexDirection: "column",
												paddingBottom: "12px",
												alignItems: "center",
											}}
										>
											<span style={{ fontSize: "16px", paddingRight: "12px" }}>
												Antrian:
											</span>
											<span style={{ fontSize: "14px", paddingRight: "12px" }}>
												{detailAntrian && detailAntrian.nomor_antrian}
											</span>
										</div>
									</div>
								</div>
							</Paper>
						) : (
							<div
								style={{
									display: "flex",
									flexDirection: "column",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<img src={EmptyImage} style={{ width: "150px", height: "150px" }} />
								<div style={{ paddingTop: "12px", fontSize: "14px" }}>
									Antrian Tidak Ditemukan
								</div>
							</div>
						)}
					</>
				)}
			</div>
		</div>
	);
};

export default withRouter(ListAntrian);
