import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	onAuthStateChanged,
	signInWithPopup,
	GoogleAuthProvider,
} from 'firebase/auth';
import { auth } from '../../config/firebase';
import Layout from '../../components/Landing/Landing';
import { LOGIN, LOGOUT } from '../../constants/action';

const Landing = () => {
	const dispatch = useDispatch();
	const [isWaiting, setIsWaiting] = useState(false);
	const googleProvider = new GoogleAuthProvider();

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
		} catch (error) {
			console.error(error);
			alert(error);
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

	const handleGoogleLogin = async () => {
		setIsWaiting(true);
		try {
			await signInWithPopup(
				auth,
				googleProvider.setCustomParameters({ prompt: 'select_account' })
			);
		} catch (error) {
			console.error(error);
		} finally {
			setIsWaiting(false);
		}
	};

	return (
		<Layout
			isWaiting={isWaiting}
			handleRegister={handleRegister}
			handleLogin={handleLogin}
			handleGoogleLogin={handleGoogleLogin}
		/>
	);
};

export default Landing;
