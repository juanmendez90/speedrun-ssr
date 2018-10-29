import api from '../api';

export const getGameRecords = id => api.get(`games/${id}/records?miscellaneous=no&scope=full-game`)
  .then(response => response.data);

export default getGameRecords;
