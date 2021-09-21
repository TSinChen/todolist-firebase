import { combineReducers } from 'redux';
import auth from './auth';
import createForm from './createForm';
import editForm from './editForm';

const reducer = combineReducers({
	auth,
	createForm,
	editForm,
});

export default reducer;
