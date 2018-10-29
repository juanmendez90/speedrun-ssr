import moxios from 'moxios';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../../redux/actions/games';
import * as consts from '../../../../redux/constants/games';
import getGamesMock from '../../../../mocks/getGames';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Games Actions', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  it('Should create an action to get games', () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { data: getGamesMock },
      });
    });
    const store = mockStore({
      gamesReducer: {
        isLoading: false,
        isLoadingGame: false,
        games: [],
        game: null,
        error: '',
      },
    });
    const expectedActions = [
      { type: consts.LOAD_GAMES },
      { type: consts.LOAD_GAMES_RECEIVED, data: getGamesMock },
    ];

    return store.dispatch(actions.loadGames()).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
