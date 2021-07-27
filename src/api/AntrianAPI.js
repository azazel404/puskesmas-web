import { _fetch } from "../helpers/_fetch";

const AntrianAPI = {
	getList: () => {
		const request = {
			method: "GET",
			body: {},
		};
		return _fetch(`/admin/antrian/list`, request);
	},

	listAntrianUser: () => {
		const request = {
			method: "GET",
			body: {},
		};
		return _fetch(`/antrian/list`, request);
	},

	create: (body) => {
		const request = {
			method: "POST",
			body: body,
		};
		return _fetch(`/antrian/create`, request);
	},

	update: (id, body) => {
		const request = {
			method: "PUT",
			body: body,
		};
		return _fetch(`/admin/antrian/update/${id}`, request);
	},
	exportAntrian: (from, to) => {
		const request = {
			method: "GET",
			body: {},
		};
		return _fetch(`/admin/antrian/export?startDate=${from}&endDate=${to}`, request);
	},
};

export default AntrianAPI;
