import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import renderWithRedux from '../../helpers/renderWithRedux';
import GameDetails from '../../components/GameDetails';

it('renders GameDetails without crashing', () => {
  const game = {
    id: 'test',
    name: 'test game',
    video: 'https://www.youtube.com/watch?v=99DnUAjHTuQ',
    logo: 'https://www.speedrun.com/themes/fishy/cover-128.png',
    player: {
      name: 'JD',
    },
    time: '1 hour',
  };
  const { getByText } = renderWithRedux(<GameDetails game={game} />);
  const nameNode = getByText('test game');
  const description = `Record by ${game.player.name} done in ${game.time}`;
  const descriptionNode = getByText(description);
  expect(nameNode.innerHTML).toBe(game.name);
  expect(descriptionNode.innerHTML).toBe(description);
});
