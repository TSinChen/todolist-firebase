import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createTheme, ThemeProvider, CssBaseline } from '@material-ui/core';
import { StyledEngineProvider } from '@mui/material/styles';
import reducer from './reducer/index';
import routes from './constants/routes';

const store = createStore(reducer);
const theme = createTheme({
	typography: {
		fontSize: 16,
	},
	overrides: {
		MuiBackdrop: {
			root: { color: '#fff', zIndex: 99999 },
		},
	},
});

const App = (props) => {
	return (
		<Provider store={store}>
			<CssBaseline />
			<ThemeProvider theme={theme}>
				<StyledEngineProvider injectFirst>
					<Switch>
						{routes.map((route) => {
							return (
								<Route
									exact
									key={route.name}
									path={route.path}
									name={route.name}
									component={route.component}
								/>
							);
						})}
					</Switch>
				</StyledEngineProvider>
			</ThemeProvider>
		</Provider>
	);
};

export default App;
