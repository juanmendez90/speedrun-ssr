import React from 'react';
import { render } from 'react-testing-library';
import { Provider } from 'react-redux';
import appStore from '../redux/store';

export default ui => ({
  ...render(<Provider store={appStore}>{ui}</Provider>),
  appStore,
});
