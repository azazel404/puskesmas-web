import { GET_PROFILE } from "./actionTypes";

export const getProfile = (profile) => {
	return {
		type: actionTypes.GET_PROFILE,
		profile,
	};
};
