import React from 'react';
import querystring from 'query-string';
import cn from 'classnames';
import dayjs from 'dayjs';
import { makeStyles } from '@material-ui/styles';
import { Box } from '@material-ui/core';

import { DATE_FORMAT } from '../../../constants/date';
import { GUTTER } from '../../../constants/style';

const useStyles = makeStyles((theme) => ({
	list: {
		display: 'flex',
		width: '600px',
		flexDirection: 'column',
	},
	todo: {
		backgroundColor: '#eee',
		display: 'flex',
		width: '100%',
		padding: '15px',
		fontSize: 20,
		borderRadius: '6px',
		'&:not(&:last-child)': {
			marginBottom: GUTTER,
		},
	},
	value: {
		marginRight: 'auto',
	},
}));

const MainPage = (props) => {
	const classes = useStyles();
	const { columnStyle, list } = props;

	return (
		Array.isArray(list) && (
			<Box className={cn(columnStyle, classes.list)}>
				{list.map((todo) => {
					const todoObj = querystring.parse(todo);
					return (
						<Box className={classes.todo} key={todoObj.createdAt}>
							<Box className={classes.value}>{todoObj.value}</Box>
							<Box>{dayjs(todoObj.date).format(DATE_FORMAT)}</Box>
						</Box>
					);
				})}
			</Box>
		)
	);
};

export default MainPage;
