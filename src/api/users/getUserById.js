import api from '../api';

export const getUserById = id => api.get(`users/${id}`)
  .then(response => response.data);

export default getUserById;
