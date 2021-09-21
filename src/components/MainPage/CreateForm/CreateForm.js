import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import { makeStyles } from '@material-ui/styles';
import { Box, Button, TextField } from '@material-ui/core';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { DateTimePicker } from '@mui/lab';

import { CLOSE_CREATE_FORM } from '../../../constants/action';
import { DATE_FORMAT } from '../../../constants/date';
import { GUTTER } from '../../../constants/style';

const useStyles = makeStyles((theme) => ({
	form: {
		display: 'flex',
		width: `${350 + GUTTER * 2}px`,
		flexDirection: 'column',
		'& > *': {
			width: '100%',
			'&:not(&:last-child)': {
				marginBottom: `${GUTTER}px`,
			},
		},
	},
	buttonGroup: {
		display: 'flex',
		'& > *:not(:last-child)': {
			marginRight: '10px',
		},
	},
}));

const CreateForm = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { createTodo, isCreating } = props;

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
			handleCloseCreateForm();
		} catch (error) {
			console.error(error);
		}
	};

	const handleCloseCreateForm = () => {
		dispatch({
			type: CLOSE_CREATE_FORM,
		});
	};

	return (
		<Box
			className={classes.form}
			component="form"
			onSubmit={handleSubmit}
			style={{ visibility: !isCreating && 'hidden' }}
		>
			<TextField
				required
				fullWidth
				label="新事項"
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
			<Box className={classes.buttonGroup}>
				<Button
					fullWidth
					variant="contained"
					color="secondary"
					onClick={handleCloseCreateForm}
				>
					關閉
				</Button>
				<Button fullWidth variant="contained" color="primary" type="submit">
					新增
				</Button>
			</Box>
		</Box>
	);
};

export default CreateForm;
