import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import * as cn from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { Backdrop, Box, CircularProgress } from '@material-ui/core';

import UserInfo from './UserInfo/UserInfo';
import List from './List/List';
import CreateForm from './CreateForm/CreateForm';
import EditForm from './EditForm/EditForm';
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
		padding: `${GUTTER}px`,
		flexDirection: 'column',
		borderRadius: `${BORDER_RADIUS}px`,
		'&:not(&:last-child)': {
			marginRight: `${GUTTER}px`,
		},
	},
	formColumn: {
		display: 'flex',
		flexDirection: 'column',
		'& > *': {
			backgroundColor: '#ddd',
			display: 'flex',
			padding: `${GUTTER}px`,
			flexDirection: 'column',
			borderRadius: `${BORDER_RADIUS}px`,
		},
		'& > *:not(&:last-child)': {
			marginBottom: `${GUTTER}px`,
		},
	},
}));

const MainPage = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const { isWaiting, handleSignOut, list, createTodo, editTodo } = props;
	const isLogin = useSelector((state) => state.auth.isLogin);
	const user = useSelector((state) => state.auth.user);
	const isCreating = useSelector((state) => state.createForm.isCreating);
	const editingIndex = useSelector((state) => state.editForm.editingIndex);
	const [isEditing, setIsEditing] = useState(false);

	useEffect(() => {
		if (!isLogin) history.push('/login');
	}, [isLogin]);

	useEffect(() => {
		setIsEditing(Number.isInteger(editingIndex));
	}, [editingIndex]);

	return (
		<Fragment>
			<Box className={classes.container}>
				<UserInfo
					columnStyle={classes.column}
					user={user}
					handleSignOut={handleSignOut}
				/>
				<List columnStyle={classes.column} list={list} editTodo={editTodo} />
				<Box
					className={classes.formColumn}
					style={{ visibility: !isCreating && !isEditing && 'hidden' }}
				>
					{isEditing && (
						<EditForm
							editTodo={editTodo}
							formData={Number.isInteger(editingIndex) && list[editingIndex]}
						/>
					)}
					{isCreating && (
						<CreateForm createTodo={createTodo} isCreating={isCreating} />
					)}
				</Box>
			</Box>
			<Backdrop
				sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
				isCreating={isWaiting}
			>
				<CircularProgress color="inherit" />
			</Backdrop>
		</Fragment>
	);
};

export default MainPage;
