import React, { Fragment, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import querystring from 'query-string';
import cn from 'classnames';
import dayjs from 'dayjs';
import { makeStyles } from '@material-ui/styles';
import {
	Backdrop,
	Box,
	Button,
	CircularProgress,
	TextField,
} from '@material-ui/core';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { DateTimePicker } from '@mui/lab';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		margin: '50px auto',
		width: '650px',
		alignItems: 'center',
		flexDirection: 'column',
	},
	block: {
		width: '100%',
		padding: '20px',
		backgroundColor: '#ddd',
		borderRadius: '6px',
		'&:not(&:last-child)': {
			marginBottom: '20px',
		},
	},
	header: {
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		'&> *': {
			width: '100%',
			'&:not(:last-child)': {
				marginBottom: '20px',
			},
		},
	},
	list: {
		display: 'flex',
		alignItems: 'center',
		flexDirection: 'column',
	},
	todo: {
		display: 'flex',
		backgroundColor: '#eee',
		width: '100%',
		padding: '10px',
		fontSize: 20,
		borderRadius: '6px',
		justifyContent: 'space-between',
		transition: 'all 0.2s',
		'&:hover': {
			transform: 'scale(1.02)',
		},
		'&:not(&:last-child)': {
			marginBottom: '20px',
		},
	},
}));

const DATE_FORMAT = 'YYYY-MM-DD HH:mm';

const MainPage = (props) => {
	const classes = useStyles();
	const history = useHistory();
	const isLogin = useSelector((state) => state.auth.isLogin);
	const user = useSelector((state) => state.auth.user);
	const { isWaiting, handleSignOut, list, createTodo } = props;

	// form
	const [whatToDo, setWhatToDo] = useState('');
	const [whenToDo, setWhenToDo] = useState(new Date());

	const handleSubmit = async (e) => {
		e.preventDefault();
		const params = {
			value: whatToDo,
			date: whenToDo,
		};
		try {
			await createTodo(params);
			setWhatToDo('');
		} catch (error) {
			console.error(error);
		}
	};

	useEffect(() => {
		if (!isLogin) history.push('/login');
	}, [isLogin]);

	return (
		<Fragment>
			<Box className={classes.container}>
				<Box className={cn(classes.block, classes.header)}>
					<Button variant="contained" color="secondary" onClick={handleSignOut}>
						登出
					</Button>
					<Button style={{ textTransform: 'none' }}>
						{user && user.email}
					</Button>
				</Box>
				<Box
					className={cn(classes.block, classes.form)}
					component="form"
					onSubmit={handleSubmit}
				>
					<TextField
						required
						fullWidth
						label="事項"
						variant="outlined"
						className={classes.input}
						value={whatToDo}
						onChange={(e) => {
							setWhatToDo(e.target.value);
						}}
					/>
					<LocalizationProvider dateAdapter={DateAdapter}>
						<DateTimePicker
							label="日期"
							inputFormat="YYYY-MM-DD HH:mm"
							value={whenToDo}
							onChange={setWhenToDo}
							renderInput={(params) => (
								<TextField {...params} variant="outlined" />
							)}
						/>
					</LocalizationProvider>
					<Button fullWidth variant="contained" color="primary" type="submit">
						CREATE TODO
					</Button>
				</Box>
				{Array.isArray(list) && (
					<Box className={cn(classes.block, classes.list)}>
						{list.map((todo) => {
							const todoObj = querystring.parse(todo);
							return (
								<Box className={classes.todo} key={todoObj.createdAt}>
									<Box>{todoObj.value}</Box>
									<Box>{dayjs(todoObj.date).format(DATE_FORMAT)}</Box>
								</Box>
							);
						})}
					</Box>
				)}
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
