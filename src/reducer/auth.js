import * as constants from '../constants/action';

const defaultState = {
	isLogin: false,
	user: null,
};

const auth = (state = defaultState, action) => {
	switch (action.type) {
		case constants.LOGIN:
			return {
				...state,
				isLogin: true,
				user: action.payload,
			};
		case constants.LOGOUT:
			return {
				...state,
				isLogin: false,
				user: null,
			};
		default:
			return state;
	}
};

export default auth;
