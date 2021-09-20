import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { makeStyles } from '@material-ui/styles';
import { Backdrop, Box, CircularProgress } from '@material-ui/core';

import UserInfo from './UserInfo/UserInfo';
import List from './List/List';
import Form from './Form/Form';
import { GUTTER } from '../../constants/style';

const useStyles = makeStyles((theme) => ({
	container: {
		// backgroundColor: '#faa',
		display: 'flex',
		width: '1400px',
		margin: '50px auto',
		justifyContent: 'center',
		alignItems: 'flex-start',
	},
	column: {
		backgroundColor: '#ddd',
		display: 'flex',
		padding: GUTTER,
		alignItems: 'center',
		borderRadius: '6px',

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
	const { isWaiting, handleSignOut, list } = props;

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
				<List columnStyle={classes.column} list={list} />
				{!false && <Form columnStyle={classes.column} />}
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
