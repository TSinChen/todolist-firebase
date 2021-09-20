import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { ref, child, get, set, push, update } from 'firebase/database';
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
				setList(
					Array.isArray(snapshot.val().todos) &&
						snapshot.val().todos.map((todo) => querystring.parse(todo))
				);
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
					querystring.stringify({
						value,
						date,
						finished: false,
						deleted: false,
						createdAt: new Date(),
						updatedAt: new Date(),
						finishedAt: null,
						deletedAt: null,
					}),
					...(Array.isArray(list)
						? list.map((todo) => querystring.stringify(todo))
						: []),
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

	const editTodo = async (index, params) => {
		setIsWaiting(true);
		try {
			const snapshot = await get(
				child(dbRef, `users/${user.uid}/todos/${index}`)
			);
			const currentValue = querystring.parse(snapshot.val());
			const updates = {};
			updates[`/users/${user.uid}/todos/${index}`] = querystring.stringify({
				...currentValue,
				...params,
			});
			await update(ref(db), updates);
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
			editTodo={editTodo}
		/>
	);
};

export default MainPage;
