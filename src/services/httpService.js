/* eslint-disable no-undef */
import axios from 'axios';

const client = axios.create({ baseURL: 'http://54.227.64.79/api' });

export default {
  get: client.get,
  post: client.post,
  put: client.put,
  delete: client.delete,
};
