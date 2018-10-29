import api from '../api';

export const getGameById = id => api.get(`games/${id}`)
  .then(response => response.data);

export default getGameById;
