import React from "react";
import {
	HomeFilled,
	ContactsFilled,
	UserOutlined,
	ScheduleOutlined,
	FileOutlined,
	CheckOutlined,
	QuestionOutlined,
	UsergroupAddOutlined,
	CalendarOutlined,
	BankOutlined,
	MessageOutlined,
	WalletOutlined,
} from "@ant-design/icons";

const items = [
	{
		label: "Antrian",
		icon: <ScheduleOutlined />,
		link: "/admin/antrian",
	},
	{
		label: "Jadwal Praktik",
		icon: <ScheduleOutlined />,
		link: "/admin/praktik",
	},
	{
		label: "Puskesmas",
		icon: <ScheduleOutlined />,
		link: "/admin/puskesmas",
	},
	{
		label: "Dokter",
		icon: <ScheduleOutlined />,
		link: "/admin/dokter",
	},
	{
		label: "Pasien",
		icon: <ScheduleOutlined />,
		link: "/admin/pasien",
	},
	{
		label: "Poli",
		icon: <ScheduleOutlined />,
		link: "/admin/poli",
	},
];

export { items };
