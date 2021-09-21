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
		default:
			return state;
	}
};

export default createForm;
