import axios from 'axios';

const getQueryParamsAsString = (query) => Object.entries(query)
  .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
  .join('&');

class Client {
  axiosClient;

  constructor() {
    this.axiosClient = axios.create();
  }

  async get(url, headers, queryParams) {
    const fullUrl = `${url}${queryParams ? `?${getQueryParamsAsString(queryParams)}` : ''}`
    try {
      const {data} = await this.axiosClient.get(fullUrl, {headers: headers});
      return data;
    } catch (e) {
      const msgError = `failed to fetch, error is: ${e.message}, url was: ${fullUrl}`;
      throw new Error(msgError)
    }
  }

}

export default Client;
