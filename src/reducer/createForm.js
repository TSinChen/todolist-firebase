import * as constants from '../constants/action';

const defaultState = {
	open: false,
};

const createForm = (state = defaultState, action) => {
	switch (action.type) {
		case constants.OPEN_CREATE_FORM:
			return {
				...state,
				open: true,
			};
		case constants.CLOSE_CREATE_FORM:
			return {
				...state,
				open: false,
			};
		default:
			return state;
	}
};

export default createForm;
