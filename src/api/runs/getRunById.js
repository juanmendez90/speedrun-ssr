import api from '../api';

export const getRunById = id => api.get(`runs/${id}`)
  .then(response => response.data);

export default getRunById;
