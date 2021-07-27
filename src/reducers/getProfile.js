import { GET_PROFILE } from "../actions/actionTypes";

const initialState = {
	profile: {},
};

const getProfile = (state = initialState, action) => {
	switch (action.type) {
		case GET_PROFILE:
			return Object.assign({}, state, {
				profile: action.profile,
			});
		default:
			return state;
	}
};

export default getProfile;
