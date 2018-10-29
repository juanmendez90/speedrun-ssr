import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderWithRedux from '../../../helpers/renderWithRedux';
import Router from '../../../components/Router';

it('renders App without crashing', () => {
  const { getByText } = renderWithRedux(<MemoryRouter><Router /></MemoryRouter>);
  const header = getByText('Go to games');
  expect(header.innerHTML).toBe('Go to games');
});
