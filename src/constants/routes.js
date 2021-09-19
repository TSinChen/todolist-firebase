import MainPage from '../containers/MainPage/MainPage';
import Landing from '../containers/Landing/Landing';

const routes = [
	{ path: '/', name: 'MainPage', component: MainPage },
	{ path: '/login', name: 'Login', component: Landing },
];

export default routes;
