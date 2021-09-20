import React, { useState } from 'react';
import cn from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { Box, Button, TextField } from '@material-ui/core';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { DateTimePicker } from '@mui/lab';

import { DATE_FORMAT } from '../../../constants/date';
import { GUTTER } from '../../../constants/style';

const useStyles = makeStyles((theme) => ({
	form: {
		display: 'flex',
		width: '350px',
		flexDirection: 'column',
		'& > *': {
			width: '100%',
			'&:not(&:last-child)': {
				marginBottom: GUTTER,
			},
		},
	},
}));

const MainPage = (props) => {
	const classes = useStyles();
	const { columnStyle, createTodo } = props;

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

	return (
		<Box
			className={cn(columnStyle, classes.form)}
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
					inputFormat={DATE_FORMAT}
					className={classes.input}
					value={whenToDo}
					onChange={setWhenToDo}
					renderInput={(params) => <TextField {...params} variant="outlined" />}
				/>
			</LocalizationProvider>
			<Button fullWidth variant="contained" color="primary" type="submit">
				新增
			</Button>
		</Box>
	);
};

export default MainPage;
