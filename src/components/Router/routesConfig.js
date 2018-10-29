import Loadable from 'react-loadable';

import App from '../../containers/App';
import Loading from '../Loading';

const LoadableGames = Loadable({
  loader: () => import('../../containers/Games'),
  loading: Loading,
});

const LoadableGame = Loadable({
  loader: () => import('../../containers/Game'),
  loading: Loading,
});


const routesConfig = [
  {
    component: App,
    path: '/',
    routes: [
      {
        path: '/',
        exact: true,
        component: LoadableGames,
      },
      {
        path: '/game/:id',
        component: LoadableGame,
      },
    ],
  },
];

export default routesConfig;
