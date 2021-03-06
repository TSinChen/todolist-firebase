import * as constants from '../constants/action';

const defaultState = {
	isCreating: false,
};

const createForm = (state = defaultState, action) => {
	switch (action.type) {
		case constants.OPEN_CREATE_FORM:
			return {
				...state,
				isCreating: true,
			};
		case constants.CLOSE_CREATE_FORM:
			return {
				...state,
				isCreating: false,
			};
		default:
			return state;
	}
};

export default createForm;
