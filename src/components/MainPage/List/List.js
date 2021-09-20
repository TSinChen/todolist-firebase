import React, { useState, useEffect } from 'react';
import querystring from 'query-string';
import cn from 'classnames';
import dayjs from 'dayjs';
import { makeStyles } from '@material-ui/styles';
import { Box, Tabs, Tab } from '@material-ui/core';

import { DATE_FORMAT } from '../../../constants/date';
import { GUTTER, BORDER_RADIUS } from '../../../constants/style';

const useStyles = makeStyles((theme) => ({
	list: {
		display: 'flex',
		maxHeight: '90vh',
		width: '600px',
		flexDirection: 'column',
		overflow: 'scroll',
	},
	todo: {
		backgroundColor: '#eee',
		display: 'flex',
		width: '100%',
		padding: '10px',
		fontSize: 16,
		borderRadius: BORDER_RADIUS,
		alignItems: 'center',
		cursor: 'pointer',
		transition: 'all 0.2s',
		'&:not(&:last-child)': {
			marginBottom: GUTTER,
		},
		'&:hover': {
			transform: 'scale(1.03)',
		},
	},
	value: {
		marginRight: 'auto',
	},
	finished: {
		position: 'relative',
		'&::after': {
			backgroundColor: '#000',
			position: 'absolute',
			content: '""',
			top: '50%',
			left: '50%',
			width: '95%',
			height: '1px',
			transform: 'translate(-50%, -50%)',
		},
	},
	tabs: {
		backgroundColor: '#eee',
		width: '100%',
		borderRadius: BORDER_RADIUS,
	},
	tab: {
		padding: '10px 0',
	},
}));

const STATUS_FILTER_TABS_VALUE = {
	all: { value: 'all', label: '全部' },
	inProcess: { value: 'inProcess', label: '進行中' },
	checked: { value: 'checked', label: '完成' },
};

const MainPage = (props) => {
	const classes = useStyles();
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

	useEffect(() => {
		if (!Array.isArray(list)) return;
		switch (statusFilter) {
			case STATUS_FILTER_TABS_VALUE.all.value:
				setShowList(list);
				break;
			case STATUS_FILTER_TABS_VALUE.inProcess.value:
				setShowList(list.filter((todo) => todo.finished === 'false'));
				break;
			case STATUS_FILTER_TABS_VALUE.checked.value:
				setShowList(list.filter((todo) => todo.finished === 'true'));
				break;
			default:
				setShowList(list);
				return;
		}
	}, [list, statusFilter]);

	return (
		<Box className={cn(columnStyle, classes.list)}>
			{Array.isArray(showList) &&
				showList.map((todo, index) => {
					return (
						<Box
							key={index}
							className={cn(
								classes.todo,
								todo.finished === 'true' && classes.finished
							)}
							onClick={() => handleCheck(index)}
						>
							<Box className={classes.value}>{todo.value}</Box>
							<Box>{dayjs(todo.date).format(DATE_FORMAT)}</Box>
						</Box>
					);
				})}
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
	);
};

export default MainPage;
