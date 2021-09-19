import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	Tab,
	Tabs,
	TextField,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const TABS_VALUE = {
	login: { value: 'login', label: '登入' },
	register: { value: 'register', label: '註冊' },
};

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		margin: '100px auto 0',
		width: '450px',
		alignItems: 'center',
		flexDirection: 'column',
	},
	tabs: {
		display: 'flex',
		width: '100%',
	},
	tab: {
		fontSize: 22,
		flexGrow: 1,
	},
	form: {
		width: '100%',
		padding: '20px 0',
	},
	input: {
		margin: '15px 0',
	},
}));

const Landing = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const isLogin = useSelector((state) => state.auth.isLogin);
	const { isWaiting, handleRegister, handleLogin } = props;
	const [loginOrRegister, setLoginOrRegister] = useState(
		TABS_VALUE.login.value
	);
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [passwordCheck, setPasswordCheck] = useState('');
	const [passwordError, setPasswordError] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (
			loginOrRegister === TABS_VALUE.register.value &&
			password !== passwordCheck
		) {
			setPasswordError(true);
			return;
		}
		const params = {
			email,
			password,
		};
		switch (loginOrRegister) {
			case TABS_VALUE.login.value:
				await handleLogin(params);
				break;
			case TABS_VALUE.register.value:
				const result = await handleRegister(params);
				if (result) setLoginOrRegister(TABS_VALUE.login.value);
				break;
			default:
				return;
		}
	};

	useEffect(() => {
		if (isLogin) history.push('/');
	}, [isLogin]);

	return (
		<Fragment>
			<Box className={classes.container}>
				<Tabs
					className={classes.tabs}
					value={loginOrRegister}
					onChange={(_, value) => setLoginOrRegister(value)}
				>
					{Object.keys(TABS_VALUE).map((action) => {
						return (
							<Tab
								key={action}
								value={TABS_VALUE[action].value}
								label={TABS_VALUE[action].label}
								className={classes.tab}
							/>
						);
					})}
				</Tabs>
				<Box component="form" onSubmit={handleSubmit} className={classes.form}>
					<TextField
						required
						fullWidth
						label="電子郵件"
						variant="outlined"
						className={classes.input}
						type="email"
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
					/>
					<TextField
						required
						fullWidth
						label="密碼"
						variant="outlined"
						className={classes.input}
						type="password"
						value={password}
						onChange={(e) => {
							setPassword(e.target.value);
						}}
						error={passwordError}
					/>
					{loginOrRegister === TABS_VALUE.register.value && (
						<TextField
							required
							fullWidth
							label="確認密碼"
							variant="outlined"
							className={classes.input}
							type="password"
							value={passwordCheck}
							onChange={(e) => {
								setPasswordCheck(e.target.value);
							}}
							error={passwordError}
							helperText={passwordError && '兩次密碼輸入不一致！'}
						/>
					)}
					<Button type="submit" fullWidth variant="contained" color="primary">
						{TABS_VALUE[loginOrRegister].label}
					</Button>
				</Box>
			</Box>
			<Backdrop open={isWaiting}>
				<CircularProgress color="inherit" />
			</Backdrop>
		</Fragment>
	);
};

export default Landing;
