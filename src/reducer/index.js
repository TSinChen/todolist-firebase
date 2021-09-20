import { combineReducers } from 'redux';
import auth from './auth';
import createForm from './createForm';

const reducer = combineReducers({
	auth,
	createForm,
});

export default reducer;
