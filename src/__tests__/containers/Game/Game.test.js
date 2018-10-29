import React from 'react';
import renderWithRedux from '../../../helpers/renderWithRedux';
import Game from '../../../containers/Game';

it('renders Game without crashing', () => {
  const match = { params: { id: 'test' } };
  const { getByText } = renderWithRedux(<Game match={match} />);
  const header = getByText('Game Details');
  expect(header.innerHTML).toBe('Game Details');
});
