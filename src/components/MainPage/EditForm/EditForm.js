import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/styles';
import { Box, Button, TextField } from '@material-ui/core';
import { LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDayjs';
import { DateTimePicker } from '@mui/lab';

import { CLOSE_EDIT_FORM } from '../../../constants/action';
import { DATE_FORMAT } from '../../../constants/date';
import { GUTTER } from '../../../constants/style';

const useStyles = makeStyles((theme) => ({
	form: {
		display: 'flex',
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

const EditForm = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { editTodo, editingIndex, formData } = props;

	// form
	const [whatToDo, setWhatToDo] = useState('');
	const [whenToDo, setWhenToDo] = useState(new Date());

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await editTodo(editingIndex, {
				value: whatToDo,
				date: whenToDo,
			});
			handleCloseEditForm();
		} catch (error) {
			console.error(error);
			alert(error);
		}
	};

	const handleCloseEditForm = () => {
		dispatch({
			type: CLOSE_EDIT_FORM,
		});
	};

	useEffect(() => {
		setWhatToDo(formData.value);
		setWhenToDo(formData.date);
	}, [formData]);

	return (
		<Box className={classes.form} component="form" onSubmit={handleSubmit}>
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
			<Box className={classes.buttonGroup}>
				<Button
					fullWidth
					variant="contained"
					color="secondary"
					onClick={handleCloseEditForm}
				>
					取消
				</Button>
				<Button fullWidth variant="contained" color="primary" type="submit">
					修改
				</Button>
			</Box>
		</Box>
	);
};

export default EditForm;
