import moment from 'moment';
import humanizeDuration from 'humanize-duration';
import {
  LOAD_GAMES,
  LOAD_GAMES_RECEIVED,
  LOAD_GAMES_FAILED,
  LOAD_GAME,
  LOAD_GAME_RECEIVED,
  LOAD_GAME_FAILED,
} from '../constants/games';
import {
  getGames, getGameById, getGameRecords, getRunById, getUserById,
} from '../../api';

const loadGamesReceived = data => ({
  type: LOAD_GAMES_RECEIVED, data,
});

const loadGamesFailed = data => ({
  type: LOAD_GAMES_FAILED, data,
});

export const loadGames = () => (dispatch) => {
  dispatch({ type: LOAD_GAMES });
  return getGames()
    .then(response => dispatch(loadGamesReceived(response)))
    .catch(error => dispatch(loadGamesFailed(error)));
};

const loadGameReceived = data => ({
  type: LOAD_GAME_RECEIVED, data,
});

const loadGameFailed = data => ({
  type: LOAD_GAME_FAILED, data,
});

export const loadGame = id => (dispatch) => {
  dispatch({ type: LOAD_GAME });
  return Promise.all([getGameById(id), getGameRecords(id)])
    .then(([gameResponse, recordsResponse]) => {
      const name = gameResponse.names.international;
      const logo = gameResponse.assets['cover-medium'].uri;
      const run = recordsResponse && recordsResponse[0].runs && recordsResponse[0].runs[0].run;
      const player = run && run.players[0];
      const video = run && run.videos.links[0].uri;
      return Promise.all([getRunById(run.id), getUserById(player.id)])
        .then(([runResponse, userResponse]) => {
          const time = runResponse.times
            && humanizeDuration(moment.duration(runResponse.times.primary).asMilliseconds());
          const game = {
            name,
            id,
            logo,
            video,
            time,
            player: {
              name: userResponse.names.international,
            },
          };
          return dispatch(loadGameReceived(game));
        });
    })
    .catch(error => dispatch(loadGameFailed(error)));
};
