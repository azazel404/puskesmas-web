import { _fetch } from "../helpers/_fetch";

const AntrianAPI = {
	getList: (paramBody) => {
		const request = {
			method: "POST",
			body: paramBody,
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
	exportAntrian: () => {
		const request = {
			method: "GET",
			body: {},
		};
		return _fetch(`/admin/antrian/export`, request);
	},
};

export default AntrianAPI;
