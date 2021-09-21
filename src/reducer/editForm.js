import * as constants from '../constants/action';

const defaultState = {
	editingIndex: false, // false: not editing
};

const createForm = (state = defaultState, action) => {
	switch (action.type) {
		case constants.SET_EDITING_INDEX:
			return {
				...state,
				editingIndex: action.payload,
			};
		case constants.CLOSE_EDIT_FORM:
			return {
				...state,
				editingIndex: false,
			};
		default:
			return state;
	}
};

export default createForm;
