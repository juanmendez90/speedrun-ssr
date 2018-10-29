import axios from 'axios';
import queryString from 'query-string';

const processConfig = config => ({
  ...config,
  paramsSerializer: params => `${queryString.stringify(params)}`,
});

class Api {
  static instance = new Api();

  static getInstance() {
    return Api.instance;
  }

  constructor() {
    if (Api.instance) {
      throw new Error('Instantiation failed: use Api.getInstance() instead of new.');
    }
  }

  get(url, config) {
    return new Promise((resolve, reject) => {
      axios.get(this.getUrl(url), processConfig(config))
        .then(({ data }) => resolve(data))
        .catch(error => reject(error));
    });
  }

  getUrl = url => process.env.APP_API_URL + url;
}

export default Api.getInstance();
