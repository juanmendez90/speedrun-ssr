import React from 'react';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import Spinner from '../../components/Spinner';

import { loadGames } from '../../redux/actions/games';

const Table = Loadable({
  loader: () => import('../../components/Table'),
  loading: Loading,
});

class Games extends React.PureComponent {
  static loadData ({ dispatch }) {
    return dispatch(loadGames());
  }

  componentDidMount() {
    const { games } = this.props;
    if (!games || games.length === 0) {
      this.props.loadGames();
    }
  }

  render() {
    const { games, isLoading } = this.props;
    return (
      <div>
        <h1>All Games</h1>
        {
          isLoading ? <Spinner />
            : <Table dataSource={games} headers={['Logo', 'Name']} />
        }
      </div>
    );
  }
}

const mapStateToProps = state => ({
  games: state.gamesReducer.games,
  isLoading: state.gamesReducer.isLoading,
});

const mapActionsToProps = dispatch => ({
  loadGames: () => dispatch(loadGames()),
});

export default connect(mapStateToProps, mapActionsToProps)(Games);
