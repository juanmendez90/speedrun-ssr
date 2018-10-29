import express from 'express';
import path from 'path';
import Loadable from 'react-loadable';
import { matchRoutes } from 'react-router-config';

import store from '../src/redux/store';
import render from './render';
import routesConfig from '../src/components/Router/routesConfig';

require('dotenv').config();

const app = express();

var aux = 0;

app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.use((req, res, next) => {
  if(!/\.js|\.css|\.ico/.test(req.path)) {
    next();
  } else {
    res.end();
  }
});

app.use(/\.js$/, express.static('dist'));

app.get('*', async (req, res) => {
  const context = {};
  const matches = matchRoutes(routesConfig, req.path);
  const components = await Promise.all(matches.map((match) => {
      const { component } = match.route;
      if (component && component.preload) {
        return component.preload();
      }
      return component;
    }));
  const test = await Promise.all(components.map( async component => {
    if (component.default && component.default.loadData) {
      return component.default.loadData({...store, path: req.path });
    } else {
      return null;
    }
  }));
  const content = render(req.path, store, context);
  res.send(content);
  res.end();
});

Loadable.preloadAll().then(() => {
  app.listen(3000, () => {
    console.log('Running on http://localhost:3000/');
  });
}).catch(err => {
  console.log(err);
});
