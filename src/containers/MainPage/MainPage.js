import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { ref, child, get, set } from 'firebase/database';
import querystring from 'query-string';
import { auth, db, dbRef } from '../../config/firebase';
import Layout from '../../components/MainPage/MainPage';
import { LOGIN, LOGOUT } from '../../constants/action';

const MainPage = () => {
	const history = useHistory();
	const dispatch = useDispatch();
	const user = useSelector((state) => state.auth.user);
	const [isWaiting, setIsWaiting] = useState(false);
	const [list, setList] = useState(null);

	const handleSignOut = async () => {
		setIsWaiting(true);
		try {
			await signOut(auth);
			dispatch({
				type: LOGOUT,
			});
			history.push('/login');
		} catch (error) {
			console.error(error);
			alert(error);
		} finally {
			setIsWaiting(false);
		}
	};

	const getTodos = async () => {
		setIsWaiting(true);
		try {
			const snapshot = await get(child(dbRef, `users/${user.uid}`));
			if (snapshot.exists()) {
				setList(snapshot.val().todos);
				console.log(snapshot.val().todos);
			}
		} catch (error) {
			console.error(error);
			alert(error);
		} finally {
			setIsWaiting(false);
		}
	};

	const createTodo = async (params) => {
		setIsWaiting(true);
		const { value, date } = params;
		try {
			await set(ref(db, `users/${user.uid}`), {
				todos: [
					querystring.stringify({ value, date, createdAt: new Date() }),
					...(Array.isArray(list) ? list : []),
				],
			});
			await getTodos();
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

	useEffect(() => {
		if (user) {
			getTodos();
		}
	}, [user]);

	return (
		<Layout
			isWaiting={isWaiting}
			handleSignOut={handleSignOut}
			list={list}
			createTodo={createTodo}
		/>
	);
};

export default MainPage;
