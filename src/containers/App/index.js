import React from 'react';
import { renderRoutes } from 'react-router-config';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class App extends React.PureComponent {
  render() {
    const { route: { routes } } = this.props;
    return (
      <div>
        <Link to="/">Go to games</Link>
        { renderRoutes(routes) }
      </div>
    );
  }
}

App.propTypes = {
  route: PropTypes.shape({
    routes: PropTypes.arrayOf(PropTypes.shape({
      path: PropTypes.string,
    })),
  }).isRequired,
};
