import { _fetch } from "../helpers/_fetch";

const Polis = {
	getList: () => {
		const request = {
			method: "GET",
			body: {},
		};
		return _fetch(`/admin/polis/list`, request);
	},
	create: (body) => {
		const request = {
			method: "POST",
			body: body,
		};
		return _fetch(`/admin/polis/create`, request);
	},
	update: (id, body) => {
		const request = {
			method: "PUT",
			body: body,
		};
		return _fetch(`/admin/polis/update/${id}`, request);
	},
	delete: (id) => {
		const request = {
			method: "DELETE",
			body: {},
		};
		return _fetch(`/admin/polis/delete/${id}`, request);
	},
};

export default Polis;
