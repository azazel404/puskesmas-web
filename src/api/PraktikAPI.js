import { _fetch } from "../helpers/_fetch";

const PraktikAPI = {
	getList: () => {
		const request = {
			method: "GET",
			body: {},
		};
		return _fetch(`/admin/praktik/list`, request);
	},
	getClientPraktik: () => {
		const request = {
			method: "GET",
			body: {},
		};
		return _fetch(`/praktik/list`, request);
	},

	getPuskesmasClient: () => {
		const request = {
			method: "GET",
			body: {},
		};
		return _fetch(`/puskesmas/list`, request);
	},

	create: (body) => {
		const request = {
			method: "POST",
			body: body,
		};
		return _fetch(`/admin/praktik/create`, request);
	},

	updateStatus: (body) => {
		const request = {
			method: "POST",
			body: body,
		};
		return _fetch(`/admin/praktik/updateStatus`, request);
	},

	update: (id, body) => {
		const request = {
			method: "PUT",
			body: body,
		};
		return _fetch(`/admin/praktik/update/${id}`, request);
	},
	delete: (id) => {
		const request = {
			method: "DELETE",
			body: {},
		};
		return _fetch(`/admin/praktik/delete/${id}`, request);
	},
};

export default PraktikAPI;
