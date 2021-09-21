import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Box, Button } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
	userInfo: {
		display: 'flex',
		width: '350px',
		justifyContent: 'space-between',
	},
}));

const UserInfo = (props) => {
	const classes = useStyles();
	const { columnStyle, user, handleSignOut } = props;

	return (
		<Box className={columnStyle}>
			<Box className={classes.userInfo}>
				<Button variant="contained" color="secondary" onClick={handleSignOut}>
					登出
				</Button>
				<Button style={{ textTransform: 'none' }}>{user && user.email}</Button>
			</Box>
		</Box>
	);
};

export default UserInfo;
