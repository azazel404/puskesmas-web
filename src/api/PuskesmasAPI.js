import { _fetch } from "../helpers/_fetch";

const PuskesmasAPI = {
	getList: () => {
		const request = {
			method: "GET",
			body: {},
		};
		return _fetch(`/admin/puskesmas/list`, request);
	},
	create: (body) => {
		const request = {
			method: "POST",
			body: body,
		};
		return _fetch(`/admin/puskesmas/create`, request);
	},
	update: (id, body) => {
		const request = {
			method: "PUT",
			body: body,
		};
		return _fetch(`/admin/puskesmas/update/${id}`, request);
	},
	delete: (id) => {
		const request = {
			method: "DELETE",
			body: {},
		};
		return _fetch(`/admin/puskesmas/delete/${id}`, request);
	},
};

export default PuskesmasAPI;
