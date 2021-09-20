import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/styles';
import { Backdrop, Box, CircularProgress } from '@material-ui/core';

import UserInfo from './UserInfo/UserInfo';
import List from './List/List';
import Form from './Form/Form';
import { GUTTER, BORDER_RADIUS } from '../../constants/style';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		width: '1300px',
		margin: '50px auto 0',
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	column: {
		backgroundColor: '#ddd',
		display: 'flex',
		padding: GUTTER,
		alignItems: 'center',
		borderRadius: BORDER_RADIUS,

		'&:not(&:last-child)': {
			marginRight: GUTTER,
		},
	},
}));

const MainPage = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const isLogin = useSelector((state) => state.auth.isLogin);
	const user = useSelector((state) => state.auth.user);
	const createFormOpen = useSelector((state) => state.createForm.open);
	const { isWaiting, handleSignOut, list, createTodo, editTodo } = props;

	useEffect(() => {
		if (!isLogin) history.push('/login');
	}, [isLogin]);

	return (
		<Fragment>
			<Box className={classes.container}>
				<UserInfo
					columnStyle={classes.column}
					user={user}
					handleSignOut={handleSignOut}
				/>
				<List columnStyle={classes.column} list={list} editTodo={editTodo} />
				<Form
					columnStyle={classes.column}
					createTodo={createTodo}
					createFormOpen={createFormOpen}
				/>
			</Box>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				open={isWaiting}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</Fragment>
	);
};

export default MainPage;
