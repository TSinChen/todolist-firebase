import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	container: {
		display: 'flex',
		margin: '50px auto',
		justifyContent: 'center',
	},
	column: {
		backgroundColor: '#ddd',
		display: 'flex',
		maxWidth: '600px',
		padding: '20px',
		alignItems: 'center',
		flexDirection: 'column',
		borderRadius: '6px',

		'&:not(&:last-child)': {
			marginBottom: '20px',
		},
	},
}));

export default useStyles