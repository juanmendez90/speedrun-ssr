import React from 'react';
import { hydrate } from 'react-dom';
import Loadable from 'react-loadable';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { renderRoutes } from 'react-router-config';
import routesConfig from './components/Router/routesConfig';
import store from './redux/store';

window.main = () => {
  Loadable.preloadReady().then(() => {
    hydrate(
      <Provider store={store}>
        <BrowserRouter>
          {renderRoutes(routesConfig)}
        </BrowserRouter>
      </Provider>,
      document.getElementById('app'),
    );
  });
};
