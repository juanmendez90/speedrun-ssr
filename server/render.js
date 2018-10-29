import React from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
import { renderRoutes } from 'react-router-config';
import { Provider } from 'react-redux';

import stats from '../dist/speedrun-stats.json';
import routesConfig from '../src/components/Router/routesConfig';

export default (pathname, store = null, context) => {
  const modules = [];
  const html = renderToString(
    <Loadable.Capture report={moduleName => modules.push(moduleName)}>
      <Provider store={store}>
        <StaticRouter location={pathname} context={context}>
          {renderRoutes(routesConfig)}
        </StaticRouter>
      </Provider>
    </Loadable.Capture>
    ,
  );

  const bundles = getBundles(stats, modules);
  const styles = bundles.filter(bundle => bundle.file.endsWith('.css'));
  const scripts = bundles.filter(bundle => bundle.file.endsWith('.js'));

  return `
    <!doctype html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>My App</title>
        ${styles.map(style => {
          return `<link href="/dist/${style.file}" rel="stylesheet"/>`;
        }).join('\n')}
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          window.INITIAL_STATE = ${JSON.stringify(store.getState())}
        </script>
        <script src="/dist/vendor.bundle.js"></script>
        ${scripts.map(script => {
          return `<script src="/dist/${script.file}"></script>`
        }).join('\n')}
        <script src="/dist/main.js"></script>
        <script>window.main();</script>
      </body>
    </html>
    `;
  };
