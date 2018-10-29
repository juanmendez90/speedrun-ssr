import {
  LOAD_GAMES,
  LOAD_GAMES_RECEIVED,
  LOAD_GAMES_FAILED,
  LOAD_GAME,
  LOAD_GAME_RECEIVED,
  LOAD_GAME_FAILED,
} from '../constants/games';

const initialState = {
  isLoading: false,
  isLoadingGame: false,
  games: [],
  game: null,
  error: '',
};

export default (state = initialState, action) => {
  const { type, data } = action;

  switch (type) {
    case LOAD_GAMES: {
      return {
        ...state,
        isLoading: true,
        error: '',
      };
    }
    case LOAD_GAMES_RECEIVED: {
      return {
        ...state,
        isLoading: false,
        games: data,
      };
    }
    case LOAD_GAMES_FAILED: {
      return {
        ...state,
        isLoading: false,
        error: data,
      };
    }
    case LOAD_GAME: {
      return {
        ...state,
        isLoadingGame: true,
        error: '',
      };
    }
    case LOAD_GAME_RECEIVED: {
      return {
        ...state,
        isLoadingGame: false,
        game: data,
      };
    }
    case LOAD_GAME_FAILED: {
      return {
        ...state,
        isLoadingGame: false,
        error: data,
      };
    }
    default:
      return state;
  }
};
