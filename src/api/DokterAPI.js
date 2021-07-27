import { _fetch } from "../helpers/_fetch";

const DokterAPI = {
	getList: () => {
		const request = {
			method: "GET",
			body: {},
		};
		return _fetch(`/admin/dokter/list`, request);
	},
	create: (body) => {
		const request = {
			method: "POST",
			body: body,
		};
		return _fetch(`/admin/dokter/create`, request);
	},
	update: (id, body) => {
		const request = {
			method: "PUT",
			body: body,
		};
		return _fetch(`/admin/dokter/update/${id}`, request);
	},
	delete: (id) => {
		const request = {
			method: "DELETE",
			body: {},
		};
		return _fetch(`/admin/dokter/delete/${id}`, request);
	},
};

export default DokterAPI;
