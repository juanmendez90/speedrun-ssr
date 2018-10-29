import React from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loading from '../../components/Loading';
import Spinner from '../../components/Spinner';
import gameModel from '../../models/gameModel';

import { loadGame } from '../../redux/actions/games';

const GameDetails = Loadable({
  loader: () => import('../../components/GameDetails'),
  loading: Loading,
});

class Game extends React.Component {
  static loadData({ dispatch, path }) {
    return dispatch(loadGame(path.split('/')[2]));
  }

  componentDidMount() {
    this.props.loadGame(this.props.match.params.id);
  }

  render() {
    const { isLoading, game } = this.props;
    return (
      <div>
        <h1>Game Details</h1>
        { isLoading ? <Spinner /> : <GameDetails game={game} />}
      </div>
    );
  }
}

Game.defaultProps = {
  game: null,
};

Game.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  loadGame: PropTypes.func.isRequired,
  game: gameModel,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

const mapStateToProps = state => ({
  game: state.gamesReducer.game,
  isLoading: state.gamesReducer.isLoadingGame,
});

const mapActionsToProps = dispatch => ({
  loadGame: id => dispatch(loadGame(id)),
});

export default connect(mapStateToProps, mapActionsToProps)(Game);
