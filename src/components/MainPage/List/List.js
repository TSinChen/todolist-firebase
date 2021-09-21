import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import cn from 'classnames';
import dayjs from 'dayjs';
import { makeStyles } from '@material-ui/styles';
import {
	Box,
	Tabs,
	Tab,
	Typography,
	Button,
	Checkbox,
} from '@material-ui/core';
import { Edit } from '@material-ui/icons';

import { OPEN_CREATE_FORM, SET_EDITING_INDEX } from '../../../constants/action';
import { DATE_FORMAT, DATE_FORMAT_YMD } from '../../../constants/date';
import { GUTTER, BORDER_RADIUS } from '../../../constants/style';

const useStyles = makeStyles((theme) => ({
	main: {
		display: 'flex',
		width: '600px',
		maxHeight: '90vh',
		flexDirection: 'column',
		overflowY: 'scroll',
		'&::-webkit-scrollbar': {
			width: '0',
		},
	},
	header: {
		backgroundColor: '#ddd',
		position: 'sticky',
		top: 0,
		width: '100%',
		paddingTop: `${GUTTER}px`,
		zIndex: 99,
	},
	toolbar: {
		display: 'flex',
		paddingBottom: `${GUTTER}px`,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	tabs: {
		backgroundColor: '#eee',
		width: '100%',
		marginBottom: `${GUTTER}px`,
		borderRadius: `${BORDER_RADIUS}px`,
	},
	tab: {
		padding: '10px 0',
	},
	list: {
		display: 'flex',
		width: '100%',
		flexDirection: 'column',
	},
	todo: {
		backgroundColor: '#eee',
		display: 'flex',
		width: '100%',
		padding: '10px',
		fontSize: 16,
		fontWeight: 'bold',
		borderRadius: `${BORDER_RADIUS}px`,
		alignItems: 'center',
		transition: 'all 0.2s',
		'&:not(&:last-child)': {
			marginBottom: `${GUTTER}px`,
		},
		'&:hover': {
			transform: 'scale(1.03)',
		},
	},
	value: {
		marginRight: `${GUTTER}px`,
		flex: '1',
		whiteSpace: 'nowrap',
		textOverflow: 'ellipsis',
		overflow: 'hidden',
	},
	date: {
		marginRight: `${GUTTER}px`,
		whiteSpace: 'nowrap',
	},
	edit: {
		cursor: 'pointer',
		transition: 'all 0.2s',
		'&:hover': {
			transform: 'scale(1.5)',
		},
	},
	// finished: {
	// 	position: 'relative',
	// 	'&::after': {
	// 		backgroundColor: '#000',
	// 		position: 'absolute',
	// 		content: '""',
	// 		top: '50%',
	// 		left: '50%',
	// 		width: '95%',
	// 		height: '1px',
	// 		transform: 'translate(-50%, -50%)',
	// 	},
	// },
}));

const STATUS_FILTER_TABS_VALUE = {
	all: { value: 'all', label: '全部' },
	inProcess: { value: 'inProcess', label: '進行中' },
	complete: { value: 'complete', label: '完成' },
};

const List = (props) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const { columnStyle, list, editTodo } = props;
	const [statusFilter, setStatusFilter] = useState(
		STATUS_FILTER_TABS_VALUE.all.value
	);
	const [showList, setShowList] = useState(null);

	const handleCheck = async (index) => {
		await editTodo(index, {
			finished: list[index].finished === 'true' ? false : true,
			finishedAt: new Date(),
		});
	};

	const handleOpenCreateForm = () => {
		dispatch({
			type: OPEN_CREATE_FORM,
		});
	};

	const setEditingIndex = (index) => {
		dispatch({
			type: SET_EDITING_INDEX,
			payload: index,
		});
	};

	useEffect(() => {
		if (!Array.isArray(list)) return;
		switch (statusFilter) {
			case STATUS_FILTER_TABS_VALUE.all.value:
				setShowList(list);
				break;
			case STATUS_FILTER_TABS_VALUE.inProcess.value:
				setShowList(list.filter((todo) => todo.finished === 'false'));
				break;
			case STATUS_FILTER_TABS_VALUE.complete.value:
				setShowList(list.filter((todo) => todo.finished === 'true'));
				break;
			default:
				setShowList(list);
				return;
		}
	}, [list, statusFilter]);

	return (
		<Box className={cn(columnStyle, classes.main)} style={{ paddingTop: 0 }}>
			<Box className={classes.header}>
				<Box className={classes.toolbar}>
					<Typography variant="h6">
						{dayjs(new Date()).format(DATE_FORMAT_YMD)}
					</Typography>
					<Button
						variant="contained"
						color="primary"
						onClick={handleOpenCreateForm}
					>
						新增
					</Button>
				</Box>
				<Tabs
					className={classes.tabs}
					value={statusFilter}
					onChange={(_, value) => setStatusFilter(value)}
					variant="fullWidth"
				>
					{Object.keys(STATUS_FILTER_TABS_VALUE).map((status) => {
						const tab = STATUS_FILTER_TABS_VALUE[status];
						return (
							<Tab
								key={tab.value}
								value={tab.value}
								label={tab.label}
								className={classes.tab}
							/>
						);
					})}
				</Tabs>
			</Box>
			<Box className={classes.list}>
				{Array.isArray(showList) &&
					showList.map((todo, index) => {
						return (
							<Box key={index} className={classes.todo}>
								<Checkbox
									color="primary"
									checked={todo.finished === 'true'}
									onChange={() => handleCheck(index)}
								/>
								<Box className={classes.value}>{todo.value}</Box>
								<Box className={classes.date}>
									{dayjs(todo.date).format(DATE_FORMAT)}
								</Box>
								<Edit
									className={classes.edit}
									color="default"
									onClick={() => setEditingIndex(index)}
								/>
							</Box>
						);
					})}
			</Box>
		</Box>
	);
};

export default List;
