import api from '../api';

export const getGames = () => api.get('games')
  .then(response => response.data);

export default getGames;
