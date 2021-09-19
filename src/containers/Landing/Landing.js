import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
} from 'firebase/auth';
import { auth } from '../../config/firebase';
import Layout from '../../components/Landing/Landing';
import { LOGIN, LOGOUT } from '../../constants/action';

const Landing = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const [isWaiting, setIsWaiting] = useState(false);

	const handleRegister = async (params) => {
		setIsWaiting(true);
		try {
			const result = await createUserWithEmailAndPassword(
				auth,
				params.email,
				params.password
			);
			return result;
		} catch (error) {
			console.error(error);
			alert(error);
		} finally {
			setIsWaiting(false);
		}
	};

	const handleLogin = async (params) => {
		setIsWaiting(true);
		try {
			await signInWithEmailAndPassword(auth, params.email, params.password);
			dispatch({
				type: LOGIN,
			});
			history.push('/');
		} catch (error) {
			console.error(error);
		} finally {
			setIsWaiting(false);
		}
	};

	onAuthStateChanged(auth, (user) => {
		if (user) {
			dispatch({
				type: LOGIN,
				payload: user,
			});
		} else {
			dispatch({
				type: LOGOUT,
			});
		}
	});

	return (
		<Layout
			isWaiting={isWaiting}
			handleRegister={handleRegister}
			handleLogin={handleLogin}
		/>
	);
};

export default Landing;
