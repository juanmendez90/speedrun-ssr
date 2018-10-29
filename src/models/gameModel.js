import PropTypes from 'prop-types';

export default PropTypes.shape({
  id: PropTypes.string,
  name: PropTypes.string,
  video: PropTypes.string,
  logo: PropTypes.string,
  player: PropTypes.shape({
    name: PropTypes.string,
  }),
  time: PropTypes.string,
});
