import React from 'react';
import renderWithRedux from '../../../helpers/renderWithRedux';
import Games from '../../../containers/Games';

it('renders Games without crashing', () => {
  const { getByText } = renderWithRedux(<Games />);
  const header = getByText('All Games');
  expect(header.innerHTML).toBe('All Games');
});
