import { combineReducers } from "redux";

import getProfileReducer from "./getProfile.js";

const reducers = {
	getProfile: getProfileReducer,
};

export default combineReducers(reducers);
